"use client";

import Image from "next/image";
import { Input } from "../atoms/input";
import { Button } from "../atoms/button";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function PageHeader() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/new");
  };

  return (
    <header className="bg-white shadow-md fixed left-0 right-0 top-0 z-10">
      <div className="m-auto px-8 flex items-center h-14 max-w-[1440px]">
        <a href="/" className="relative h-[50px] w-[120px]">
          <Image src="/logo.png" fill objectFit="contain" alt="tech hive" />
        </a>
        <Input className="max-w-2xl mx-4 w" />
        <div className="ml-auto space-x-1 flex justify-center">
          <SignedIn>
            <Button variant="outline" onClick={() => handleClick()}>
              Create Post
            </Button>
            {/* Mount the UserButton component */}
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "h-10 w-10",
                },
              }}
            />
          </SignedIn>
          <SignedOut>
            {/* Signed out users get sign in button */}
            <SignInButton>
              <Button>Login</Button>
            </SignInButton>
            <SignUpButton>
              <Button>Create account</Button>
            </SignUpButton>
          </SignedOut>
        </div>
      </div>
    </header>
  );
}
