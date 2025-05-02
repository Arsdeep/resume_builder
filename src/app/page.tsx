"use client";

import logo from "@/assets/logo.png";
import resumePreview from "@/assets/resume-preview.png";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";

export default function Home() {
  // We'll use a simpler approach without client-side hooks
  // for the animation effect

  const features = [
    "AI-powered resume optimization",
    "ATS-friendly templates",
    "Custom formatting options",
    "Expert content suggestions",
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 md:px-12">
        <div className="flex items-center gap-2">
          <Image
            src={logo}
            alt="Logo"
            width={60}
            height={60}
            className="h-15 w-15"
          />
          <span className="text-3xl font-bold">ResumeAI</span>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="mx-auto max-w-screen-2xl px-6 md:px-12 lg:px-24 xl:px-32">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-16">
          {/* Left Column - Content */}
          <div className="space-y-6 md:space-y-8 lg:max-w-xl">
            <div className="mx-2 inline-block rounded-full bg-green-100 px-2 py-1 text-sm font-medium text-green-600">
              Quick
            </div>
            <div className="mx-2 inline-block rounded-full bg-green-100 px-2 py-1 text-sm font-medium text-green-600">
              Efficient
            </div>
            <div className="mx-2 inline-block rounded-full bg-green-100 px-2 py-1 text-sm font-medium text-green-600">
              Reliable
            </div>

            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl">
              Create the{" "}
              <span className="bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
                Perfect Resume
              </span>{" "}
              in Minutes
            </h1>

            <p className="text-lg text-gray-600 md:text-xl">
              Our <span className="font-semibold">AI-powered platform</span>{" "}
              helps you craft a professional, recruiter-approved resume that
              gets more interviews.
            </p>

            <div className="space-y-3">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Button
                size="lg"
                className="group gap-2 bg-green-600 text-white hover:bg-green-700"
                asChild
              >
                <Link href="/resumes">
                  Get started free
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>No credit card required</span>
              <span className="h-1 w-1 rounded-full bg-gray-300"></span>
              <span>Cancel anytime</span>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="relative">
            <div className="absolute -inset-4 rounded-xl bg-gradient-to-r from-green-600/20 to-blue-600/20 opacity-70 blur-xl"></div>
            <div className="relative">
              <Image
                src={resumePreview}
                alt="Resume preview"
                width={550}
                className="rounded-xl shadow-xl transition-all duration-500 hover:scale-[1.02] hover:rotate-0 lg:rotate-[1.5deg]"
              />
              <div className="absolute -top-4 -right-4 rounded-lg bg-white p-3 shadow-lg">
                <div className="flex items-center gap-2">
                  <div className="rounded-full bg-green-500 p-1">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm font-medium">ATS Optimized</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
