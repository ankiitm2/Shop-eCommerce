import { emailVerificationLink } from "@/email/emailVerification";
import { connectDB } from "@/lib/databaseConnection";
import { catchError, response } from "@/lib/helperFunction";
import { sendMail } from "@/lib/sendMail";
import { loginSchema } from "@/lib/zodSchema";
import UserModel from "@/models/User.model";
import { SignJWT } from "jose";

export async function POST(request) {
  try {
    await connectDB();

    // Create a schema for registration (only name, email, password)
    const validationSchema = loginSchema.pick({
      name: true,
      email: true,
      password: true,
    });

    const payload = await request.json();

    // Zod's parse() throws an error if validation fails
    const validatedData = validationSchema.parse(payload);

    // Remove .data - the parsed data is returned directly
    const { name, email, password } = validatedData;

    const checkUser = await UserModel.exists({ email });
    if (checkUser) {
      return response(false, 409, "User already exists with this email.");
    }

    const newRegistration = new UserModel({ name, email, password });
    await newRegistration.save();

    const secret = new TextEncoder().encode(process.env.SECRET_KEY);
    const token = await new SignJWT({ userId: newRegistration._id })
      .setIssuedAt()
      .setExpirationTime("1h")
      .setProtectedHeader({ alg: "HS256" })
      .sign(secret);

    const mailResult = await sendMail(
      "Email Verification",
      email,
      emailVerificationLink(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/verifyEmail/${token}`
      )
    );

    if (!mailResult.success) {
      console.error("Failed to send verification email:", mailResult.error);
    }

    return response(
      true,
      200,
      "Registration successful. Please verify your email."
    );
  } catch (error) {
    return catchError(error);
  }
}
