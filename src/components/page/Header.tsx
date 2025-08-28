"use client";

import { motion } from "framer-motion";
import { CandlestickChart } from "lucide-react";

export default function Header() {
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex items-center">
          <CandlestickChart className="h-6 w-6 mr-2 text-primary" />
          <span className="font-bold font-headline">HBD THISSDAX</span>
        </div>
      </div>
    </motion.header>
  );
}
