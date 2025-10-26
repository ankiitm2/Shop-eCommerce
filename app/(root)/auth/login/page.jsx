"use client";
import { Card, CardContent } from "@/components/ui/card";
import React, { useState } from "react";
import Logo from "@/public/assets/images/Logo.png";
import Image from "next/image";
import { loginSchema } from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import z from "zod";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import ButtonLoading from "@/components/Application/ButtonLoading";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import Link from "next/link";
import { WEBSITE_REGISTER } from "@/routes/WebsiteRoute";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const formSchema = loginSchema
    .pick({
      email: true,
    })
    .extend({
      password: z.string().min(3, "Password is required"),
    });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLoginSubmit = async (values) => {
    setLoading(true);
    try {
      console.log(values);
      // Add your login logic here
      // await loginUser(values);
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Card className="w-[450px] mx-auto mt-10">
      <CardContent className="pt-6">
        <div className="flex items-center justify-center mb-10">
          <div>
            <Image
              src={Logo}
              alt="logo"
              width={Logo.width}
              height={Logo.height}
              className="max-w-[70px]"
            />
          </div>
          <div className="text-center ml-4">
            <h1 className="text-3xl font-bold">Login Into Account</h1>
            <p className="text-gray-600">Login to access your account</p>
          </div>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleLoginSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="example@gmail.com"
                      {...field}
                      disabled={loading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        {...field}
                        disabled={loading}
                      />
                    </FormControl>
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      onClick={togglePasswordVisibility}
                      disabled={loading}
                    >
                      {showPassword ? (
                        <FaRegEye size={18} />
                      ) : (
                        <FaRegEyeSlash size={18} />
                      )}
                    </button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <ButtonLoading
              type="submit"
              text="Login"
              className="w-full cursor-pointer"
              loading={loading}
            />

            <div className="text-center space-y-2">
              <div className="flex gap-2 justify-center">
                <p className="text-gray-600">Don't have an Account?</p>
                <Link
                  href={WEBSITE_REGISTER}
                  className="text-primary underline hover:text-primary/80"
                >
                  Register Now!
                </Link>
              </div>
              <div>
                <Link
                  href="/forgot-password"
                  className="text-primary underline hover:text-primary/80 text-sm"
                >
                  Forgot Password?
                </Link>
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default LoginPage;
