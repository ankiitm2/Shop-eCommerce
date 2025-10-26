"use client";
import { Card, CardContent } from "@/components/ui/card";
import React, { useState } from "react";
import Logo from "@/public/assets/images/Logo.png";
import Image from "next/image";
import { loginSchema } from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import ButtonLoading from "@/components/Application/ButtonLoading";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import Link from "next/link";
import z from "zod";
import { WEBSITE_LOGIN } from "@/routes/WebsiteRoute";
import axios from "axios";

const RegisterPage = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const formSchema = loginSchema
    .pick({
      email: true,
      password: true,
      name: true,
    })
    .extend({
      confirmPassword: z.string().min(1, "Confirm Password is required"),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Password and Confirm Password must be same",
      path: ["confirmPassword"],
    });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleRegisterSubmit = async (values) => {
    try {
      setLoading(true);
      const { data: registerResponse } = await axios.post(
        "/api/auth/register",
        values
      );
      if (!registerResponse.success) {
        throw new Error(registerResponse.message);
      }

      form.reset();
      alert(registerResponse.message);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
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
            <h1 className="text-3xl font-bold">Create Account!</h1>
            <p className="text-gray-600">
              Create new account to access your account.
            </p>
          </div>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleRegisterSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Your full name"
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

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        {...field}
                        disabled={loading}
                      />
                    </FormControl>
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      onClick={toggleConfirmPasswordVisibility}
                      disabled={loading}
                    >
                      {showConfirmPassword ? (
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
              text="Create Account"
              className="w-full cursor-pointer"
              loading={loading}
            />

            <div className="text-center space-y-2">
              <div className="flex gap-2 justify-center">
                <p className="text-gray-600">Already have an Account?</p>
                <Link
                  href={WEBSITE_LOGIN}
                  className="text-primary underline hover:text-primary/80"
                >
                  Login!
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

export default RegisterPage;
