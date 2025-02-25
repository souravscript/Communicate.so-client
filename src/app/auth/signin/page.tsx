"use client";
import vectorOne from '@/../public/small-vector-one.png'
import bigVectorOne from '@/../public/big-vector-two.png'
import logo from "@/../public/Shape.png";
import Image from 'next/image'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {z} from "zod";
import Cookies from 'js-cookie';
// import { supabase } from '@/lib/supabase';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function Auth(){
  const router=useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);



  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); 

    // Validate form data
    const parsedData = loginSchema.safeParse(formData);
    if (!parsedData.success) {
      setError(parsedData.error.errors[0].message);
      return;
    }

    // Supabase authentication
    // const { data, error } = await supabase.auth.signInWithPassword({
    //   email: formData.email,
    //   password: formData.password,
    // });

    // if (error) {
    //   setError(error.message);
    //   return;
    // }

    try {
      setIsSubmitting(true);
      const response = await fetch("http://localhost:8082/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });
    
      const result = await response.json();
    
      if (!response.ok) {
        throw new Error(result.message || "Failed to sign in");
      }
      console.log("Login Response:", result);
        
      Cookies.set("user", JSON.stringify(result.session.user), { expires: 7, secure: true, sameSite: "Strict" });
      Cookies.set("isLoggedIn", "true", { expires: 7, secure: true, sameSite: "Strict" });

      console.log("Cookies set:", Cookies.get("user"), Cookies.get("isLoggedIn"));
      
      // Handle successful login (store token, redirect, etc.)
      console.log("About to redirect to home");
      router.push('/');
      console.log("Redirected to home");
    } catch (err) {
      setIsSubmitting(false);
      setError(err instanceof Error ? err.message : "An unknown error occurred");
      console.error("Login Error:", err);
    }finally{
      setIsSubmitting(false);
    }
    
  };
    return (
        <>
        

    <div className="flex justify-center overflow-hidden items-center w-[600px] relative top-[10rem] z-50">
      <div className="auth w-full max-w-sm">
      <div className="flex justify-center my-5 items-center gap-2 pl-2">
        <Image src={logo} alt="logo" className="h-8 w-8" />
        <span className="font-inter font-bold text-primaryTextColor text-lg">
          Communicate.so
        </span>
      </div>
        <Card className="mx-auto">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl flex justify-center font-bold">Hey there👋🏻</CardTitle>
            <CardDescription className='flex justify-center text-sm opacity-55'>Add your credentials to get inside</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="Typing..."value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="Typing..." 
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })} 
                  required 
                />
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}

             <Link href="/auth/forgot-password">
                <p className='opacity-55 text-sm my-4 '>Don&quot;t remember password?</p>
             </Link>
              <Button 
                onClick={handleLogin} 
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting?"Logging in":"Login Now →"}
              </Button>
            </div>
          </CardContent>

          <Link href="/auth/signup"><p className='text-[#343B46] text-sm my-3 mx-6 flex justify-center '>Don&quot;t have an account? <span className='text-sm opacity-100 text-[#343B46] font-bold'>Create new</span></p></Link>
        </Card>
        <div className="flex justify-between mt-4 text-sm text-blue-500">
        </div>
      </div>
    </div>
    <div className='fixed top-[-1rem] md:top-[-2rem] lg:top-[-3rem] xl:top-[-4rem] 2xl:top-[-5rem] 
                    right-[16rem] md:right-[24rem] lg:right-[32rem] xl:right-[40rem] 2xl:right-[48rem] z-20'>
        <Image src={vectorOne} alt="logo" className='w-[200px] h-[280px] md:w-[220px] md:h-[300px] lg:w-[240px] lg:h-[320px] xl:w-[260px] xl:h-[340px] 2xl:w-[280px] 2xl:h-[360px] '/>
    </div>

    <div className='fixed bottom-[-1rem] md:bottom-[-2rem] lg:bottom-[-3rem] xl:bottom-[-4rem] 2xl:bottom-[-5rem] 
                    right-10 md:right-16 lg:right-20 xl:right-32 2xl:right-40 z-20'>
        <Image src={bigVectorOne} alt="logo" className='w-[300px] h-[420px] md:w-[340px] md:h-[480px] lg:w-[380px] lg:h-[540px] xl:w-[420px] xl:h-[580px] 2xl:w-[460px] 2xl:h-[620px] '/>
    </div>

            
        </>
    )
}