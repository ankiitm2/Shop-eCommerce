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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import ButtonLoading from "@/components/Application/ButtonLoading";
import z from "zod";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);

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
    console.log(values);
  };

  return (
    <Card className="w-[450px]">
      <CardContent>
        <div>
          <Image
            src={Logo}
            alt="logo"
            width={Logo.width}
            height={Logo.height}
            className="max-w-[100px]"
          />
        </div>
        <div className="text-center">
          <h1 className="text-3xl font-bold">Login Into Account</h1>
          <p>Login to access your account</p>
        </div>
        <div className="mt-5">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleLoginSubmit)}>
              <div className="mb-5">
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
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mb-5">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="********"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <ButtonLoading
                type="submit"
                text="Login"
                className="w-full cursor-pointer"
                loading={loading}
              />
            </form>
          </Form>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoginPage;
