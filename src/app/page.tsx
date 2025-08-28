'use client';

import React, { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, Environment, Html, useGLTF, Preload, PerspectiveCamera, Text as DreiText } from '@react-three/drei';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import Spline from '@splinetool/react-spline';
import emailjs from 'emailjs-com';

// HOC: Section wrapper for spacing, id anchors, and entrance animations
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

// 3D Model (GLTF).
function PurpleHoodie(props){
  const url = props.url || 'https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/hoodie/model.gltf';
  const { scene } = useGLTF(url);
  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.8}>
      <primitive object={scene} scale={props.scale ?? 2.2} position={props.position ?? [0, -1.2, 0]} />
    </Float>
  );
}
useGLTF.preload('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/hoodie/model.gltf');

// Reusable 3D Scene component
function HeroScene(){
  return (
    <Canvas className="rounded-3xl shadow-2xl" dpr={[1, 2]}>
      <color attach="background" args={["#1a052d"]} />
      <PerspectiveCamera makeDefault position={[0, 1.2, 4]} fov={50} />
      <hemisphereLight intensity={0.5} groundColor={'#12021f'} />
      <spotLight position={[2, 5, 3]} angle={0.6} penumbra={0.6} intensity={1.5} castShadow />
      <pointLight position={[-3, 2, -2]} intensity={1} color={'#a855f7'} />

      <Suspense fallback={<Html center><div className="animate-pulse text-sm">loading 3D…</div></Html>}>
        <PurpleHoodie />
        <DreiText position={[0, 1.6, 0]} fontSize={0.25} anchorX="center" anchorY="middle">
          THISSDAX
          <meshBasicMaterial color={'#c084fc'} />
        </DreiText>
        <Environment preset="night" />
        <Preload all />
      </Suspense>

      <OrbitControls enablePan={false} minDistance={2} maxDistance={6} />
    </Canvas>
  );
}

// Email form (EmailJS)
function ContactForm(){
  const formRef = useRef(null);
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!formRef.current) return;
    setSending(true);
    emailjs.sendForm(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'your_service_id',
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'your_template_id',
      formRef.current,
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'your_public_key'
    ).then(()=>{
      setDone(true);
    }).catch(()=>{
      alert('Email failed. Configure EmailJS keys and template.');
    }).finally(()=> setSending(false));
  };

  return (
    <form ref={formRef} onSubmit={onSubmit} className="grid gap-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <input name="from_name" required placeholder="Your name" className="bg-white/5 border border-white/10 rounded-2xl px-4 py-3 outline-none focus:border-purple-400" />
        <input name="reply_to" type="email" required placeholder="Your email" className="bg-white/5 border border-white/10 rounded-2xl px-4 py-3 outline-none focus:border-purple-400" />
      </div>
      <textarea name="message" rows={5} required placeholder="Write a birthday note for Thissdax…" className="bg-white/5 border border-white/10 rounded-2xl px-4 py-3 outline-none focus:border-purple-400" />
      <button disabled={sending} className="rounded-2xl px-5 py-3 font-medium bg-gradient-to-r from-purple-600 to-fuchsia-500 hover:from-purple-500 hover:to-fuchsia-400 disabled:opacity-60">
        {sending ? 'Sending…' : (done ? 'Sent ✓' : 'Send Message')}
      </button>
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
        <HeroScene />
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
          <li>Smooth performance with <code>Suspense</code> + <code>Preload</code>.</li>
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
        <Canvas dpr={[1,2]} className="rounded-2xl h-[360px]">
          <color attach="background" args={["#130322"]} />
          <PerspectiveCamera makeDefault position={[0,0,5]} />
          <ambientLight intensity={0.5} />
          <spotLight position={[6,6,6]} intensity={1.4} />
          <Suspense fallback={<Html center>loading…</Html>}>
            <gridHelper args={[20, 20, '#4c1d95', '#1f0a3a']} />
            <mesh position={[-2, -1, 0]}>
              <boxGeometry args={[0.3, 1.2, 0.3]} />
              <meshStandardMaterial color={'#8b5cf6'} />
            </mesh>
            <mesh position={[0, 0.2, 0]}>
              <boxGeometry args={[0.3, 2.2, 0.3]} />
              <meshStandardMaterial color={'#a78bfa'} />
            </mesh>
            <mesh position={[2, -0.6, 0]}>
              <boxGeometry args={[0.3, 1.0, 0.3]} />
              <meshStandardMaterial color={'#c4b5fd'} />
            </mesh>
            <Preload all />
          </Suspense>
          <OrbitControls enablePan={false} />
        </Canvas>
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
        <p className="text-white/70">Your email goes straight to Thissdax. Configure EmailJS keys to enable sending.</p>
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
