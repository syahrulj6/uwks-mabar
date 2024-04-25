import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col  items-center justify-center px-8 text-main md:container md:flex-row  ">
      <div className="flex w-full flex-col gap-2 md:flex-1">
        <div className="text-3xl font-bold md:text-5xl">
          <h2>Selamat datang di</h2>
          <div className=" flex items-center gap-3 text-yellow-500 ">
            UWKS.MABAR
            <img
              src="/icons/console.png"
              className="h-7 w-7 md:h-10 md:w-10"
              alt="icons"
            />
          </div>
        </div>
        <div className="flex flex-col">
          <p className="text-lg leading-tight md:text-2xl">
            <span className="font-bold">UWKS.MABAR {""}</span>
            adalah platform untuk mahasiswa uwks agar dapat berkomunikasi dan
            bermain game bersama
          </p>
        </div>
        <p className=" font-bold">Daftar / Masuk untuk bermain bersama!</p>
        <div className="flex gap-3 md:mt-2">
          <Link
            className="rounded-sm bg-white px-4 py-2 text-black transition-colors hover:bg-white/85 md:px-6"
            href="/auth/signin"
          >
            Masuk
          </Link>
          <Link
            className="rounded-sm border-2 border-white px-4 py-2 transition-colors hover:bg-white hover:text-black md:px-6"
            href="/auth/signup"
          >
            Daftar
          </Link>
        </div>
      </div>
      <div className="relative hidden h-96 w-96 md:block md:h-[700px] md:w-[650px]">
        <Image src="/images/landingpage.svg" alt="image" fill />
      </div>
    </main>
  );
}
