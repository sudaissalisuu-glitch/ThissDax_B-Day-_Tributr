
'use client'

import React,
{ Suspense, useEffect, useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import dynamic from 'next/dynamic';
import Image from 'next/image';

import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { PlayCircle } from 'lucide-react';
import Autoplay from "embla-carousel-autoplay"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"


const QuasimodoScene = dynamic(() => import('@/components/page/QuasimodoScene'), { ssr: false });
const TributeVideoPlayer = dynamic(() => import('@/components/page/TributeVideoPlayer'), { ssr: false });
const FireworksEffect = dynamic(() => import('@/components/page/FireworksEffect'), { ssr: false });
const ThissdaxLogo = dynamic(() => import('@/components/page/ThissdaxLogo').then(m => m.ThissdaxLogo), { ssr: false });
const TradersToolkit = dynamic(() => import('@/components/page/TradersToolkit'), { ssr: false });

const AnimatedText = ({ children, className, delay = 0.2 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
      transition={{ duration: 0.5, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};


// GSAP accent: shimmer on the main heading
function useShimmer(ref){
  useEffect(()=>{
    if(!ref.current) return;
    const el = ref.current;
    const ctx = gsap.context(()=>{
      gsap.fromTo(el, { backgroundPositionX: '0%' }, { backgroundPositionX: '200%', duration: 1.5, repeat: -1, ease: 'linear' });
    });
    return () => ctx.revert();
  },[ref]);
}

// Hero Section
function Hero(){
  const shimmerRef = useRef(null);
  useShimmer(shimmerRef);

  return (
    <section id="home" className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 overflow-hidden">
      <div className="grid lg:grid-cols-2 items-center gap-10">
        <div className="space-y-6">
          <div className="inline-block rounded-full border border-purple-500/30 px-3 py-1 text-xs tracking-widest uppercase text-purple-300">A Birthday Celebration</div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight">
            <span ref={shimmerRef} className="bg-[linear-gradient(110deg,hsl(var(--primary))_35%,rgba(255,255,255,1)_50%,hsl(var(--primary))_65%)] bg-clip-text text-transparent bg-[length:200%_100%]">Happy Birthday, Thissdax!</span>
          </h1>
          <p className="text-white/70 max-w-prose">This one's for you, mentor! A small token of appreciation for your guidance in the markets and the community you've built. Enjoy the tribute. 🎂</p>
          <div className="flex gap-3 flex-wrap">
            <a href="#scene" className="rounded-2xl px-5 py-3 font-medium bg-purple-600/80 hover:bg-purple-500/90">Join the Celebration</a>
            <a href="#tribute-video" className="rounded-2xl px-5 py-3 font-medium border border-white/10 hover:border-purple-400">Watch Tribute</a>
          </div>
        </div>
        <div className="flex flex-col items-center">
            <div id="scene" className="h-[420px] w-[420px] rounded-full overflow-hidden">
              <Suspense fallback={<div className="w-full h-full bg-black/20 animate-pulse rounded-full" />}>
                  <QuasimodoScene />
              </Suspense>
            </div>
        </div>
      </div>
    </section>
  );
}


// Quasimodo (QM) strategy visual cue
function QuasimodoCard(){
  const chartImages = [
    "https://raw.githubusercontent.com/dreadshades-cpu/ssmmsm/main/AUDJPY_2025-07-31_08-38-09.png",
    "https://raw.githubusercontent.com/dreadshades-cpu/ssmmsm/main/GBPJPY_2025-08-01_14-13-14.png"
  ];

  return (
    <section id="qm" className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 overflow-hidden">
      <div className="grid lg:grid-cols-2 gap-10 items-center">
          <Carousel className="w-full" opts={{ loop: true }} plugins={[
          Autoplay({ delay: 3000 })
        ]}>
              <CarouselContent>
              {chartImages.map((src, index) => (
                  <CarouselItem key={index}>
                      <div className="rounded-3xl p-6 bg-white/5 ring-1 ring-white/10 backdrop-blur aspect-video overflow-hidden">
                          <Image
                              src={src}
                              alt={`Forex Chart ${index + 1}`}
                              width={1200}
                              height={675}
                              className="rounded-xl w-full h-full object-cover"
                              data-ai-hint="forex chart"
                          />
                      </div>
                  </CarouselItem>
              ))}
              </CarouselContent>
              <CarouselPrevious className="left-2" />
              <CarouselNext className="right-2" />
          </Carousel>
        <div className="space-y-4">
          <AnimatedText><h2 className="text-3xl sm:text-4xl font-bold">Quasimodo Pattern • Charts</h2></AnimatedText>
          <AnimatedText delay={0.3}><p className="text-white/70">A showcase of the precision and style that defines the QM strategy. These charts reflect the focus and dedication to the craft.</p></AnimatedText>
          <AnimatedText delay={0.4}>
            <div className="flex gap-3">
              <a href="#tribute-video" className="rounded-2xl px-5 py-3 font-medium bg-purple-600/80 hover:bg-purple-500/90">Watch Tribute</a>
            </div>
          </AnimatedText>
        </div>
      </div>
    </section>
  );
}

// Video tribute section
function VideoTribute({ audioRef }) {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(error => {
        console.error("Audio play failed:", error);
      });
    }
  };

  const handleClose = () => {
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  return (
    <section id="tribute-video" className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 overflow-hidden">
      <div className="text-center space-y-4">
        <AnimatedText><h2 className="text-3xl sm:text-4xl font-bold">A Special Message</h2></AnimatedText>
        <AnimatedText delay={0.3}>
          <p className="text-white/70 max-w-2xl mx-auto">
            A short video tribute for the mentor.
          </p>
        </AnimatedText>
        <AnimatedText delay={0.4}>
        <div className="flex justify-center">
          <Button
            onClick={handlePlay}
            variant="outline"
            className="rounded-full pl-5 pr-6 py-3 font-medium text-lg border-purple-400/30 hover:border-purple-400/80 hover:text-white"
          >
            <PlayCircle className="w-6 h-6 mr-2" />
            Watch Video
          </Button>
        </div>
        </AnimatedText>
        <AnimatePresence>
          {isPlaying && <TributeVideoPlayer onClose={handleClose} audioRef={audioRef} />}
        </AnimatePresence>
      </div>
    </section>
  );
}

// Mentee Wall Component
function MenteeWall() {
  const mentees = [
    { name: 'Sudais Salisu', aka: 'Aka Dreadshades', avatar: 'https://raw.githubusercontent.com/dreadshades-cpu/ssmmsm/main/WhatsApp%20Image%202025-07-03%20at%2017.44.45_bfe486bb.jpg' },
    { name: 'Joshua Ogbeifun', avatar: 'https://raw.githubusercontent.com/dreadshades-cpu/ssmmsm/main/photo_2025-08-30_01-40-01.jpg' },
    { name: 'Ololade Mayowa', avatar: 'https://raw.githubusercontent.com/dreadshades-cpu/ssmmsm/main/photo_2025-08-30_07-47-48.jpg' },
  ];

  return (
    <section id="mentees" className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 overflow-hidden">
      <div className="text-center space-y-8">
        <AnimatedText>
          <h2 className="text-3xl sm:text-4xl font-bold">A Wall of Mentees</h2>
        </AnimatedText>
        <AnimatedText delay={0.3}>
          <p className="text-white/70 max-w-2xl mx-auto">
            A tribute from the community you've built. We appreciate you!
          </p>
        </AnimatedText>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-6 gap-y-8 max-w-6xl mx-auto">
          {mentees.map((mentee, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center gap-2 group"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Image
                src={mentee.avatar}
                alt={mentee.name}
                width={120}
                height={120}
                className="rounded-full ring-2 ring-purple-500/50 object-cover aspect-square"
                data-ai-hint="person portrait"
              />
              <div className="text-center">
                <span className="font-medium text-white/90">{mentee.name}</span>
                {mentee.aka && (
                  <span className="block text-xs text-purple-300/80">{mentee.aka}</span>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <AnimatedText delay={0.4}>
          <p className="text-sm text-white/50">
            Want to be on the wall? Reach out to the developer.
          </p>
        </AnimatedText>
      </div>
    </section>
  );
}

// Main App
export default function ThissdaxBirthdayApp() {
  const [year, setYear] = useState(new Date().getFullYear());
  const audioRef = useRef<HTMLAudioElement>(null);


  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);
  
  const tweetText = "Celebrating my mentor @thissdax's birthday with this awesome 3D tribute! Join in! #Forex #ThissdaxBirthday";
  const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;

  const XIcon = (props: React.SVGProps<HTMLSpanElement>) => (
    <span {...props}>𝕏</span>
  );

  const TelegramIcon = (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M22 2 L11 13 L2 9 L22 2 Z M22 2 L15 22 L11 13 L2 9 L22 2 Z" />
    </svg>
  );

  return (
    <div className="min-h-screen">
      <audio ref={audioRef} loop playsInline>
        <source src="https://raw.githubusercontent.com/dreadshades-cpu/ssmmsm/main/New%20Divide%20(Official%20Music%20Video)%20%5B4K%20Upgrade%5D%20-%20Linkin%20Park.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      
      <FireworksEffect />

      <header className="sticky top-0 z-40 backdrop-blur bg-black/20 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px:6 lg:px-8 h-16 flex items-center justify-between">
          <a href="#home" className="flex items-center gap-2 font-black tracking-wide text-xl">
            <ThissdaxLogo />
          </a>
          <nav className="hidden md:flex items-center gap-6 text-white/80">
            <a href="#qm" className="hover:text-white">Charts</a>
            <a href="#tribute-video" className="hover:text-white">Tribute</a>
            <a href="#mentees" className="hover:text-white">Mentees</a>
            <a href="#toolkit" className="hover:text-white">Toolkit</a>
          </nav>
          <a href={tweetUrl} target="_blank" rel="noopener noreferrer" className="md:hidden rounded-xl px-3 py-2 bg-purple-600/80">Share</a>
        </div>
      </header>

      <main>
        <Hero />
        <QuasimodoCard />
        <VideoTribute audioRef={audioRef} />
        <MenteeWall />
        <TradersToolkit />
      </main>

      <footer className="py-10 border-t border-white/10 mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px:6 lg:px-8 text-sm text-white/60 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <p>Made with 💜 by Dreadshades • © {year}</p>
          <div className="flex items-center gap-4">
            <a href={tweetUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              <XIcon className="w-5 h-5 inline-flex items-center justify-center text-lg" />
            </a>
            <a href="https://t.me/thissdax" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              <TelegramIcon className="w-5 h-5" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
