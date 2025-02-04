import { type Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SignUpForm } from "@/components/signup-form";
import { Shield } from "lucide-react";
import hero from "@/assets/hero.webp";

export const metadata: Metadata = {
  title: "Sign Up - FantasyPro",
  description: "Create your FantasyPro account",
};

export default function SignUpPage() {
  return (
    <div className="relative min-h-screen w-full">
      <Image
        src={hero || "/placeholder.svg"}
        alt="Background"
        fill
        className="object-cover overflow-hidden -top-[759px] -left-[27px] md:top-0 md:left-0"
        priority
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 md:bg-opacity-0" />
      {/* <div className="absolute inset-0 md:inset-20 opacity-85 flex items-center md:items-start justify-center">
        <div className="relative w-full aspect-[16/9] hidden md:block">
          <Image
            src="/placeholder.svg"
            alt="MacBook Pro"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div> */}
      <div className="relative flex flex-col items-center min-h-screen md:min-h-0 md:block md:-left-[15%] md:pt-20 px-4 md:px-0">
        <div className="w-full max-w-[440px] mx-auto md:ml-auto my-auto md:mt-0 md:mr-0 rounded-lg bg-white p-5 shadow-lg">
          {" "}
          <div className="flex justify-center items-center mb-2">
            <Shield className="h-6 w-6 text-green-600" />
            <div className="flex items-center">
              <span className="text-green-600 font-bold text-md">Fantasy</span>
              <span className="text-gray-500 font-medium text-md">Pro</span>
            </div>
          </div>
          <h2 className="text-lg font-normal mb-3 text-center">Sign up</h2>
          <SignUpForm />
        </div>
        <div className="w-full max-w-[440px] mx-auto md:ml-auto md:mr-0 mt-4 rounded-lg bg-white px-5 py-3 shadow-lg">
          <div className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              href="/signin"
              className="text-green-600 hover:text-green-700 underline"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
