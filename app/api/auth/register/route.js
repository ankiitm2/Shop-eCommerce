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
    const validationSchema = loginSchema.pick({
      name: true,
      email: true,
      password: true,
    });

    const payload = await request.json();

    const validatedData = validationSchema.parse(payload);

    if (!validatedData.success) {
      return response(
        false,
        400,
        "Invalid or missing input field.",
        validatedData.error
      );
    }

    const { name, email, password } = validatedData.data;

    const checkUser = await UserModel.exists({ email });
    if (checkUser) {
      return response(true, 409, "User already exists with this email.");
    }

    const newRegestrtion = new UserModel({ name, email, password });
    await newRegestrtion.save();

    const secret = new TextEncoder().encode(process.env.SECRET_KEY);
    const token = await new SignJWT({ userId: newRegestrtion._id })
      .setIssuedAt()
      .setExpirationTime("1h")
      .setProtectedHeader({ alg: "HS256" })
      .sign(secret);

    await sendMail(
      "Email Verification",
      email,
      emailVerificationLink(
        `${process.env.NEXT_PUBLIC_BASE_URL}/verifyEmail/${token}`
      )
    );

    return response(
      true,
      200,
      "Registration successful. Please verify your email."
    );
  } catch (error) {
    catchError(error);
  }
}
