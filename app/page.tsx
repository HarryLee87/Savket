import Link from "next/link";
import Logo3 from "@/public/logo3.png"
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col gap-10 mx-auto justify-between p-10 min-h-screen max-w-sm">
      <div className="my-auto flex flex-col items-center gap-2 *:font-medium">
        <div>
          <Image
            src={Logo3}
            alt="Savket Logo"
            width={300}
            height={300}
            className="object-contain"
            priority
          />
        </div>
        <h1 className="text-4xl">Savket</h1>
        <h2 className="text-2xl">Welcome to Savket!</h2>
      </div>
      <div className="flex flex-col items-center gap-3 w-full">
        <Link href="/create-account"
          className="primary-btn py-2 text-lg"
        >Start</Link>
        <div className="flex gap-2">
          <span>Do you already have an account?</span>
          <Link href="/login" className="hover:underline">Login</Link>
        </div>
      </div>
    </div>
  );
}
