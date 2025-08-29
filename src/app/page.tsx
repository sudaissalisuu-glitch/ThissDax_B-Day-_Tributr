
'use client'

import React,
{ Suspense, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import dynamic from 'next/dynamic';

import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { sendBirthdayMessage } from '@/app/actions';
import { Award, Heart, Twitter } from 'lucide-react';

const HeroScene = dynamic(() => import('@/components/page/HeroScene'), { ssr: false });
const QuasimodoScene = dynamic(() => import('@/components/page/QuasimodoScene'), { ssr: false });


// HOC: Section wrapper
const withSection = (Component, id) => function Wrapped(props) {
  return (
    <section id={id} className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px:8 py-16">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <Component {...props} />
      </motion.div>
    </section>
  );
};


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
      setTimeout(() => setIsSuccess(false), 2000);
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
    </form>
  );
}

// GSAP accent: shimmer on the main heading
function useShimmer(ref){
  useEffect(()=>{
    if(!ref.current) return;
    const el = ref.current;
    const ctx = gsap.context(()=>{
      gsap.fromTo(el, { backgroundPositionX: '0%' }, { backgroundPositionX: '200%', duration: 2.4, repeat: -1, ease: 'linear' });
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
          <span ref={shimmerRef} className="bg-[linear-gradient(110deg,#e9d5ff,45%,#a855f7,55%,#e9d5ff)] bg-clip-text text-transparent bg-[length:200%_100%]">When focus hits, markets listen.</span>
        </h1>
        <p className="text-white/70 max-w-prose">Dedicated to <span className="text-purple-300 font-semibold">Thissdax</span> — FX mentor, purple vibes ambassador, and Quasimodo strategy wizard. Enjoy this little 3D tribute. 🎂</p>
        <div className="flex gap-3 flex-wrap">
          <a href="#scene" className="rounded-2xl px-5 py-3 font-medium bg-purple-600/80 hover:bg-purple-500/90">Explore 3D</a>
          <a href="#message" className="rounded-2xl px-5 py-3 font-medium border border-white/10 hover:border-purple-400">Leave a note</a>
        </div>
      </div>
      <div id="scene" className="h-[420px]">
        <Suspense fallback={<div className="w-full h-full bg-black/20 animate-pulse rounded-3xl" />}>
            <HeroScene />
        </Suspense>
      </div>
    </div>
  );
}
const HeroSection = withSection(Hero, 'home');


// Quasimodo (QM) strategy visual cue
function QuasimodoCard(){
  return (
    <div className="grid lg:grid-cols-2 gap-10 items-center">
      <div className="rounded-3xl p-6 bg-white/5 ring-1 ring-white/10 backdrop-blur">
        <Suspense fallback={<div className="w-full h-full bg-black/20 animate-pulse rounded-2xl" />}>
            <QuasimodoScene />
        </Suspense>
      </div>
      <div className="space-y-4">
        <h2 className="text-3xl sm:text-4xl font-bold">Quasimodo Pattern • Tribute</h2>
        <p className="text-white/70">A symbolic 3D nod to the QM idea (HH/HL then BOS to form LH/LL). This is just an artistic visualization to honor your style — not trading advice.</p>
        <div className="flex gap-3">
          <a href="#message" className="rounded-2xl px-5 py-3 font-medium bg-purple-600/80 hover:bg-purple-500/90">Say Happy Birthday</a>
        </div>
      </div>
    </div>
  );
}
const QuasimodoSection = withSection(QuasimodoCard, 'qm');

// Mentee Engagement Section
function MenteeEngagement() {
  const [isLiked, setIsLiked] = useState(false);
  const [count, setCount] = useState(42); // Starting count

  const handleClick = () => {
    if (!isLiked) {
      setIsLiked(true);
      setCount(count + 1);
    }
  };

  return (
    <div id="mentees" className="text-center space-y-4">
      <h2 className="text-3xl sm:text-4xl font-bold">Are you a Mentee?</h2>
      <p className="text-white/70 max-w-2xl mx-auto">Show some love and mark your presence! Click the heart to let Thissdax know you stopped by.</p>
      <div className="flex justify-center">
        <button 
          onClick={handleClick} 
          className="group flex items-center gap-3 rounded-full pl-5 pr-6 py-3 font-medium bg-gradient-to-r from-purple-600/50 to-fuchsia-500/50 hover:from-purple-500/60 hover:to-fuchsia-400/60 ring-1 ring-purple-400/30 transition-all transform hover:scale-105 disabled:opacity-80"
          disabled={isLiked}
        >
          <Heart className={`w-6 h-6 transition-all duration-300 ${isLiked ? 'text-red-400 fill-current' : 'text-white/80 group-hover:text-white'}`} />
          <span className="text-lg">{count}</span>
        </button>
      </div>
       {isLiked && <p className="text-green-400 text-sm">Thanks for the support!</p>}
    </div>
  );
}
const MenteeSection = withSection(MenteeEngagement, 'mentees');


// Contact section
function Contact(){
  return (
    <div id="message" className="grid lg:grid-cols-2 gap-10 items-start">
      <div className="space-y-3">
        <h2 className="text-3xl sm:text-4xl font-bold">Send a Birthday Message</h2>
        <p className="text-white/70">Your email goes straight to Thissdax. This is a demo; email sending is not live.</p>
        <ContactForm />
      </div>
      <div className="rounded-3xl p-6 bg-gradient-to-br from-purple-900/40 to-fuchsia-900/30 ring-1 ring-white/10">
        <h3 className="font-semibold text-lg mb-2">What’s inside this gift</h3>
        <ul className="text-white/70 list-disc pl-6 space-y-1">
          <li>React + Tailwind dark purple theme</li>
          <li>Three.js scenes with lights, camera, and floating 3D model</li>
          <li>Framer Motion entrances & GSAP shimmer</li>
          <li>Responsive design with Suspense & Preload</li>
          <li>HOC-based section structure for scalability</li>
        </ul>
      </div>
    </div>
  );
}
const ContactSection = withSection(Contact, 'contact');

// Main App
export default function ThissdaxBirthdayApp() {
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    // This check is to prevent hydration errors
    setYear(new Date().getFullYear());
  }, []);

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
      <header className="sticky top-0 z-40 backdrop-blur bg-black/20 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px:6 lg:px:8 h-16 flex items-center justify-between">
          <a href="#home" className="font-black tracking-wide text-xl"><span className="text-purple-400">Thiss</span>•<span className="text-fuchsia-400">Dax</span> 🎂</a>
          <nav className="hidden md:flex items-center gap-6 text-white/80">
            <a href="#qm" className="hover:text-white">Quasimodo</a>
            <a href="#mentees" className="hover:text-white">Mentees</a>
            <a href="#contact" className="hover:text-white">Message</a>
          </nav>
          <a href="#contact" className="md:hidden rounded-xl px-3 py-2 bg-purple-600/80">Message</a>
        </div>
      </header>

      <main>
        <HeroSection />
        <QuasimodoSection />
        <MenteeSection />
        <ContactSection />
      </main>

      <footer className="py-10 border-t border-white/10 mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px:6 lg:px:8 text-sm text-white/60 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <p>Made with 💜 by Dreadshades • © {year}</p>
          <div className="flex items-center gap-4">
            <a href="https://x.com/thissdax" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              <Twitter className="w-5 h-5" />
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

    