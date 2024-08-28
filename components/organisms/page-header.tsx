import Image from "next/image";
import { Input } from "../atoms/input";
import { Button } from "../atoms/button";

export default function PageHeader() {
  return (
    <header className="bg-white shadow-md m-auto">
      <div className="m-auto px-8 flex items-center h-14">
        <a href="/" className="relative h-[50px] w-[120px]">
          <Image src="/logo.png" fill objectFit="contain" alt="tech hive" />
        </a>
        <Input className="max-w-2xl mx-4" />
        <div className="ml-auto space-x-6">
          <button>Log In</button>
          <Button>Create account</Button>
        </div>
      </div>
    </header>
  );
}
