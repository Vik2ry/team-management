import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Trophy, Users, DollarSign, Shield, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import hero from "@/assets/hero.webp";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b bg-white/80 backdrop-blur-sm fixed w-full z-50">
        <Link className="flex items-center justify-center" href="#">
          <Shield className="h-6 w-6 text-green-600" />
          <span className="ml-2 text-xl font-bold">FantasyPro</span>
        </Link>
        <nav className="ml-auto flex items-center gap-4 sm:gap-6">
          <Link
            href="#feature"
            className="text-sm hidden sm:block font-medium hover:underline underline-offset-4"
          >
            Features
          </Link>
          <Link
            className="text-sm hidden sm:block font-medium hover:underline underline-offset-4"
            href="#"
          >
            How It Works
          </Link>
          <Button variant="default" className="bg-green-600 hover:bg-green-700">
            Get Started
          </Button>
        </nav>
      </header>
      <main className="flex-1">
        <section className="relative min-h-screen flex items-center">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50 z-10" />
            <Image
              src={hero || "/placeholder.svg"}
              alt="Hero"
              className="object-cover"
              fill
              priority
              quality={100}
            />
          </div>
          <div className="container relative z-20 px-4 md:px-6 pt-16">
            <div className="max-w-[800px] space-y-4">
              <div className="space-y-2">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-white">
                  Build Your Dream Football Team
                </h1>
                <p className="max-w-[600px] text-gray-200 md:text-xl">
                  Manage your fantasy football team, trade players, and compete
                  with others. Start with $5M budget and build your perfect
                  squad.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                {/* Green button linking to /signup */}
                <Link href="/signup" passHref>
                  <Button asChild className="bg-green-600 hover:bg-green-700">
                    <span>
                      Start Playing Now
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </span>
                  </Button>
                </Link>

                {/* White button linking to # */}
                <Link href="#" passHref>
                  <Button
                    asChild
                    variant="outline"
                    className="text-green-600 border-white hover:bg-white/10"
                  >
                    <span>Learn More</span>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section
          id="feature"
          className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Key Features
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Everything you need to manage your fantasy football team
                  effectively
                </p>
              </div>
            </div>
            <div className="mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-8 md:mt-12">
              <Card className="relative overflow-hidden">
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <Trophy className="h-12 w-12 text-green-600" />
                  <h3 className="text-xl font-bold">Team Management</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Start with 20 players across all positions and manage your
                    squad effectively
                  </p>
                </CardContent>
              </Card>
              <Card className="relative overflow-hidden">
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <DollarSign className="h-12 w-12 text-green-600" />
                  <h3 className="text-xl font-bold">Transfer Market</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Buy and sell players with a $5M budget. Set your prices and
                    make strategic transfers
                  </p>
                </CardContent>
              </Card>
              <Card className="relative overflow-hidden">
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <Users className="h-12 w-12 text-green-600" />
                  <h3 className="text-xl font-bold">Player Trading</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Trade players with other managers and build your perfect
                    team
                  </p>
                </CardContent>
              </Card>
              <Card className="relative overflow-hidden">
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <Shield className="h-12 w-12 text-green-600" />
                  <h3 className="text-xl font-bold">Smart Filtering</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Find the perfect players with advanced filtering by team,
                    name, and price
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Ready to Start?
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Join thousands of managers and start building your dream team
                  today
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/signup" passHref>
                  <Button asChild className="bg-green-600 hover:bg-green-700" size="lg">
                    <span>
                      Start Playing Now
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </span>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2024 FantasyPro. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
