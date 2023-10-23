import Image from "next/image";
import "@fontsource/roboto"; // Defaults to weight 400
import "@fontsource/roboto/400.css"; // Specify weight
import "@fontsource/roboto/400-italic.css"; // Specify weight and style

export default function Home() {
  return (
    <main className="min-h-screen text-white flex justify-center items-start">
      <div className="bg-primary min-h-screen w-full absolute" />
      <Image
        className="opacity-30 absolute"
        objectFit="cover"
        fill
        alt="starry night"
        src="/images/starry-sky.jpg"
      />
      <div className="sm:mx-32 mx-8 max-w-screen-2xl relative z-1 pt-32 flex flex-col lg:justify-between xl:flex-row xl:items-center grow sm:gap-y-24 gap-y-16">
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
    </main>
  );
}
