import ThreeScene from "./ThreeScene";
import Fireworks from "./Fireworks";

export default function Hero() {
  return (
    <section className="relative w-full h-[80svh] overflow-hidden">
      <ThreeScene />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none bg-black/20">
        <h1 className="text-5xl md:text-7xl font-bold font-headline bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 py-4">
          Happy Birthday, Thissdax!
        </h1>
        <p className="mt-4 text-lg text-neutral-300 max-w-2xl">
          Wishing you a year of profitable trades and successful Quasimodo patterns.
        </p>
      </div>
      <Fireworks />
    </section>
  );
}
