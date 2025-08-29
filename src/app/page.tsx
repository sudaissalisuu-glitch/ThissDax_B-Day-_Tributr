
'use client'

import React,
{ Suspense, useEffect, useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import dynamic from 'next/dynamic';
import Image from 'next/image';

import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { sendBirthdayMessage } from '@/app/actions';
import { PlayCircle, Code, Palette, Wind, Bot, Volume2, VolumeX } from 'lucide-react';
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


// HOC Replacement: Section with viewport-triggered animation
function AnimatedSection({ children, id }: { children: React.ReactNode, id: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id={id} ref={ref} className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
      >
        {children}
      </motion.div>
    </section>
  );
}


// Contact Form Component
function ContactForm() {
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const [isPending, setIsPending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsPending(true);

    const formData = new FormData(event.currentTarget);
    const result = await sendBirthdayMessage({
      message: '',
      success: false,
    }, formData);

    setIsPending(false);

    if (result.success) {
      setIsSuccess(true);
      toast({
        title: "Message Sent!",
        description: "Your birthday message has been sent to Thissdax.",
      });
      formRef.current?.reset();
      setTimeout(() => setIsSuccess(false), 4000);
    } else {
      const errorMessages = typeof result.errors === 'string' ? result.errors : result.errors ? Object.values(result.errors).flat().join(', ') : 'An unexpected error occurred.';
      toast({
        variant: "destructive",
        title: "Error",
        description: errorMessages,
      });
    }
  };


  return (
    <form ref={formRef} onSubmit={handleSubmit} className="grid gap-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <input name="from_name" required placeholder="Your name" className="bg-white/5 border border-white/10 rounded-2xl px-4 py-3 outline-none focus:border-purple-400" />
        <input name="reply_to" type="email" required placeholder="Your email" className="bg-white/5 border border-white/10 rounded-2xl px-4 py-3 outline-none focus:border-purple-400" />
      </div>
      <textarea name="message" rows={5} required placeholder="Write a birthday note for Thissdax…" className="bg-white/5 border border-white/10 rounded-2xl px-4 py-3 outline-none focus:border-purple-400" />
      <Button type="submit" disabled={isPending} className="rounded-2xl px-5 py-3 font-medium bg-gradient-to-r from-purple-600 to-fuchsia-500 hover:from-purple-500 hover:to-fuchsia-400 disabled:opacity-60">
        {isPending ? "Sending…" : isSuccess ? "Sent ✓" : "Send Message"}
      </Button>
      {isSuccess && <p className="text-green-400 text-sm text-center">Thanks for the support! ✨</p>}
    </form>
  );
}

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
    <div className="grid lg:grid-cols-2 items-center gap-10">
      <div className="space-y-6">
        <div className="inline-block rounded-full border border-purple-500/30 px-3 py-1 text-xs tracking-widest uppercase text-purple-300">Birthday Drop • Monday</div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight">
          <span ref={shimmerRef} className="bg-[linear-gradient(110deg,rgba(233,213,255,1)_35%,rgba(255,255,255,1)_50%,rgba(233,213,255,1)_65%)] bg-clip-text text-transparent bg-[length:200%_100%]">When focus hits, markets listen.</span>
        </h1>
        <p className="text-white/70 max-w-prose">Dedicated to <span className="text-purple-300 font-semibold">Thissdax</span> — FX mentor, purple vibes ambassador, and Quasimodo strategy wizard. Enjoy this little 3D tribute. 🎂</p>
        <div className="flex gap-3 flex-wrap">
          <a href="#scene" className="rounded-2xl px-5 py-3 font-medium bg-purple-600/80 hover:bg-purple-500/90">Explore 3D</a>
          <a href="#message" className="rounded-2xl px-5 py-3 font-medium border border-white/10 hover:border-purple-400">Leave a note</a>
        </div>
      </div>
      <div id="scene" className="h-[420px]">
        <Suspense fallback={<div className="w-full h-full bg-black/20 animate-pulse rounded-2xl" />}>
            <QuasimodoScene />
        </Suspense>
      </div>
    </div>
  );
}


// Quasimodo (QM) strategy visual cue
function QuasimodoCard(){
  const chartImages = [
    "https://raw.githubusercontent.com/dreadshades-cpu/ssmmsm/main/AUDJPY_2025-07-31_08-38-09.png",
    "https://raw.githubusercontent.com/dreadshades-cpu/ssmmsm/main/GBPJPY_2025-08-01_14-13-14.png"
  ];

  return (
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
        <h2 className="text-3xl sm:text-4xl font-bold">Quasimodo Pattern • Charts</h2>
        <p className="text-white/70">A showcase of the precision and style that defines the QM strategy. These charts reflect the focus and dedication to the craft.</p>
        <div className="flex gap-3">
          <a href="#message" className="rounded-2xl px-5 py-3 font-medium bg-purple-600/80 hover:bg-purple-500/90">Say Happy Birthday</a>
        </div>
      </div>
    </div>
  );
}

// Video tribute section
function VideoTribute() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div id="tribute-video" className="text-center space-y-4">
      <h2 className="text-3xl sm:text-4xl font-bold">A Special Message</h2>
      <p className="text-white/70 max-w-2xl mx-auto">
        A short video tribute for the mentor.
      </p>
      <div className="flex justify-center">
        <Button
          onClick={() => setIsPlaying(true)}
          variant="outline"
          className="rounded-full pl-5 pr-6 py-3 font-medium text-lg border-purple-400/30 hover:border-purple-400/80 hover:text-white"
        >
          <PlayCircle className="w-6 h-6 mr-2" />
          Watch Video
        </Button>
      </div>
      {isPlaying && <TributeVideoPlayer onClose={() => setIsPlaying(false)} />}
    </div>
  );
}

// Mentee Wall Component
function MenteeWall() {
  const mentees = [
    { name: 'Dreadshades', avatar: 'https://picsum.photos/seed/dread/200' },
    { name: 'Sarah', avatar: 'https://picsum.photos/seed/sarah/200' },
    { name: 'Mike', avatar: 'https://picsum.photos/seed/mike/200' },
    { name: 'Emily', avatar: 'https://picsum.photos/seed/emily/200' },
    { name: 'Chris', avatar: 'https://picsum.photos/seed/chris/200' },
    { name: 'Jessica', avatar: 'https://picsum.photos/seed/jessica/200' },
    { name: 'David', avatar: 'https://picsum.photos/seed/david/200' },
    { name: 'Linda', avatar: 'https://picsum.photos/seed/linda/200' },
    { name: 'Alex', avatar: 'https://picsum.photos/seed/alex/200' },
    { name: 'Jordan', avatar: 'https://picsum.photos/seed/jordan/200' },
    { name: 'Taylor', avatar: 'https://picsum.photos/seed/taylor/200' },
    { name: 'Casey', avatar: 'https://picsum.photos/seed/casey/200' },
  ];
  
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  )

  return (
    <div id="mentees" className="text-center space-y-8">
      <h2 className="text-3xl sm:text-4xl font-bold">A Wall of Mentees</h2>
      <p className="text-white/70 max-w-2xl mx-auto">
        A tribute from the community you've built. We appreciate you!
      </p>
      <Carousel 
        plugins={[plugin.current]}
        className="w-full max-w-4xl mx-auto"
        onMouseEnter={() => plugin.current.stop()}
        onMouseLeave={() => plugin.current.reset()}
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent className="-ml-4">
          {mentees.map((mentee, index) => (
            <CarouselItem key={index} className="pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5">
              <motion.div 
                className="flex flex-col items-center gap-2"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
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
                <span className="font-medium text-white/90 text-center">{mentee.name}</span>
              </motion.div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <p className="text-sm text-white/50">Want to be on the wall? Reach out to the developer.</p>
    </div>
  );
}


// Contact section
function Contact(){
  return (
    <div id="message" className="max-w-xl mx-auto text-center">
      <div className="space-y-3">
        <h2 className="text-3xl sm:text-4xl font-bold">Send a Birthday Message</h2>
        <p className="text-white/70">Your email goes straight to Thissdax. This is a demo; email sending is not live.</p>
        <ContactForm />
      </div>
    </div>
  );
}

function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  const toggleMute = () => {
    if (audioRef.current) {
      const currentlyMuted = audioRef.current.muted;
      audioRef.current.muted = !currentlyMuted;
      setIsMuted(!currentlyMuted);
    }
  };
  
  useEffect(() => {
    const playAudio = () => {
      if (audioRef.current) {
        audioRef.current.play().catch(error => console.log("Autoplay was prevented.", error));
      }
    };
    // Let's try to play after a very short delay to help with some browser policies
    const timeoutId = setTimeout(playAudio, 100);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div>
       <audio ref={audioRef} loop muted playsInline>
          <source src="https://firebasestorage.googleapis.com/v0/b/genkit-llm-77838.appspot.com/o/lofi-study-112191.mp3?alt=media&token=e33f06c6-4357-4b77-b952-b9b5c33842a5" type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
        <button 
          onClick={toggleMute} 
          className="fixed bottom-4 left-4 z-50 p-2 rounded-full bg-black/50 text-white backdrop-blur-sm"
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </button>
    </div>
  )
}


// Main App
export default function ThissdaxBirthdayApp() {
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    // This check is to prevent hydration errors
    setYear(new Date().getFullYear());
  }, []);
  
  const tweetText = "Celebrating my mentor @thissdax's birthday with this awesome 3D tribute! Join in! #Forex #ThissdaxBirthday";
  const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;

  const XIcon = (props) => (
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
        <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
    </svg>
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
      <FireworksEffect />
      <AudioPlayer />
      <header className="sticky top-0 z-40 backdrop-blur bg-black/20 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px:6 lg:px:8 h-16 flex items-center justify-between">
          <a href="#home" className="font-black tracking-wide text-xl"><span className="text-purple-400">Thiss</span>•<span className="text-fuchsia-400">Dax</span> 🎂</a>
          <nav className="hidden md:flex items-center gap-6 text-white/80">
            <a href="#qm" className="hover:text-white">Charts</a>
            <a href="#tribute-video" className="hover:text-white">Tribute</a>
            <a href="#mentees" className="hover:text-white">Mentees</a>
            <a href="#message" className="hover:text-white">Message</a>
          </nav>
          <a href="#message" className="md:hidden rounded-xl px-3 py-2 bg-purple-600/80">Message</a>
        </div>
      </header>

      <main>
        <AnimatedSection id="home"><Hero /></AnimatedSection>
        <AnimatedSection id="qm"><QuasimodoCard /></AnimatedSection>
        <AnimatedSection id="tribute-video"><VideoTribute /></AnimatedSection>
        <AnimatedSection id="mentees"><MenteeWall /></AnimatedSection>
        <AnimatedSection id="contact"><Contact /></AnimatedSection>
      </main>

      <footer className="py-10 border-t border-white/10 mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px:6 lg:px:8 text-sm text-white/60 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <p>Made with 💜 by Dreadshades • © {year}</p>
          <div className="flex items-center gap-4">
            <a href={tweetUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              <XIcon className="w-5 h-5" />
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
