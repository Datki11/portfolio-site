import Image from "next/image";
import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";
import "@fontsource/roboto"; // Defaults to weight 400
import "@fontsource/roboto/400.css"; // Specify weight
import "@fontsource/roboto/400-italic.css"; // Specify weight and style
import CustomLink from "./CustomLink";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="bg-primary z-[-1] min-h-[100svh] w-full absolute" />
      <Image
        className="opacity-30 absolute z-[-1]"
        objectFit="cover"
        fill
        priority
        alt="starry night"
        src="/images/starry-sky.jpg"
      />
      <main className="min-h-[100svh] text-white flex justify-center items-start overflow-hidden">
        <div className="max-w-screen-2xl sm:mx-32 mx-8 flex flex-col grow min-h-[100svh] justify-start">
          <div className="2xl:pt-40 md:pt-32 pt-24 flex flex-col lg:justify-between xl:flex-row xl:items-center sm:gap-y-24 gap-y-16">
            <div>
              <p className="sm:text-2xl text-xl font-bold">Hi, I&apos;m</p>
              <p className="sm:text-9xl text-7xl font-bold">
                Daniel
                <br />
                Atkinson
              </p>
            </div>
            <p className="sm:text-5xl text-3xl font-bold">Software Engineer</p>
          </div>

          <div className="w-full flex justify-between grow items-end pb-8 text-xl">
            <div className="w-full flex flex-col md:flex-row justify-between gap-y-8">
              <CustomLink href="/Daniel_Atkinson_Resume.pdf">Resume</CustomLink>
              <CustomLink href="mailto:daniel@danielatkinson.dev">
                daniel@danielatkinson.dev
              </CustomLink>
              <div className="flex gap-x-4">
                <Link href="https://github.com/Datki11">
                  <AiFillGithub className size={32} />
                </Link>
                <Link href="https://www.linkedin.com/in/daniel-atkinson-a4650526a/">
                  <AiFillLinkedin size={32} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
