
'use client'

import React,
{ Suspense, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import dynamic from 'next/dynamic';
import { useActionState } from 'react';

import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { sendBirthdayMessage } from '@/app/actions';

const HeroScene = dynamic(() => import('@/components/page/HeroScene'), { ssr: false });
const QuasimodoScene = dynamic(() => import('@/components/page/QuasimodoScene'), { ssr: false });
const Spline = dynamic(() => import('@splinetool/react-spline'), { ssr: false });


// HOC: Section wrapper
const withSection = (Component, id) => function Wrapped(props) {
  return (
    <section id={id} className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
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
  const [state, formAction, isPending] = useActionState(sendBirthdayMessage, {
    message: "",
    errors: undefined,
    success: false,
  });

  useEffect(() => {
    if (state.success) {
      toast({
        title: "Message Sent!",
        description: "Your birthday message has been sent to Thissdax.",
      });
      formRef.current?.reset();
    } else if (state.errors) {
      const errorMessages = typeof state.errors === 'string' ? state.errors : Object.values(state.errors).flat().join(', ');
      toast({
        variant: "destructive",
        title: "Error",
        description: errorMessages || 'An unexpected error occurred.',
      });
    }
  }, [state, toast]);

  return (
    <form ref={formRef} action={formAction} className="grid gap-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <input name="from_name" required placeholder="Your name" className="bg-white/5 border border-white/10 rounded-2xl px-4 py-3 outline-none focus:border-purple-400" />
        <input name="reply_to" type="email" required placeholder="Your email" className="bg-white/5 border border-white/10 rounded-2xl px-4 py-3 outline-none focus:border-purple-400" />
      </div>
      <textarea name="message" rows={5} required placeholder="Write a birthday note for Thissdax…" className="bg-white/5 border border-white/10 rounded-2xl px-4 py-3 outline-none focus:border-purple-400" />
      <Button type="submit" disabled={isPending} className="rounded-2xl px-5 py-3 font-medium bg-gradient-to-r from-purple-600 to-fuchsia-500 hover:from-purple-500 hover:to-fuchsia-400 disabled:opacity-60">
        {isPending ? "Sending…" : state.success ? "Sent ✓" : "Send Message"}
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

// Spline embed section
function SplineShowcase(){
  return (
    <div className="grid lg:grid-cols-2 gap-10 items-center">
      <div className="aspect-video w-full rounded-3xl overflow-hidden ring-1 ring-white/10">
        <Suspense fallback={<div className="w-full h-full bg-black/20 animate-pulse" />}>
          <Spline scene="https://prod.spline.design/3sBKv7-Xj1g8ePj7/scene.splinecode" />
        </Suspense>
      </div>
      <div className="space-y-4">
        <h2 className="text-3xl sm:text-4xl font-bold">Purple Space • Interactive Spline</h2>
        <p className="text-white/70">Crafted with <span className="text-purple-300">Spline</span> and embedded directly. Mix it with Three.js sections for a seamless 3D experience.</p>
        <ul className="text-white/70 list-disc pl-6 space-y-1">
          <li>Smooth performance with <code>Suspense</code> + <code>dynamic import</code>.</li>
          <li>Orbit, float effects, HDR environment.</li>
          <li>Fully responsive and touch-friendly.</li>
        </ul>
      </div>
    </div>
  );
}
const SplineSection = withSection(SplineShowcase, 'spline');

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
          <li>Spline interactive canvas</li>
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

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 backdrop-blur bg-black/20 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a href="#home" className="font-black tracking-wide text-xl"><span className="text-purple-400">Thiss</span>•<span className="text-fuchsia-400">Dax</span> 🎂</a>
          <nav className="hidden md:flex items-center gap-6 text-white/80">
            <a href="#spline" className="hover:text-white">Spline</a>
            <a href="#qm" className="hover:text-white">Quasimodo</a>
            <a href="#contact" className="hover:text-white">Message</a>
          </nav>
          <a href="#contact" className="md:hidden rounded-xl px-3 py-2 bg-purple-600/80">Message</a>
        </div>
      </header>

      <main>
        <HeroSection />
        <SplineSection />
        <QuasimodoSection />
        <ContactSection />
      </main>

      <footer className="py-10 border-t border-white/10 mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-sm text-white/60 flex flex-col sm:flex-row gap-2 items-center justify-between">
          <p>Made with 💜 for Thissdax • Built with React, Three.js, R3F, Tailwind, Framer Motion, GSAP & Spline</p>
          <p>© {year} Tribute by the crew.</p>
        </div>
      </footer>
    </div>
  );
}
