"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Wand2 } from "lucide-react";

import { generateBirthdayPoem, type GenerateBirthdayPoemOutput } from "@/ai/flows/generate-birthday-poem";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "../ui/skeleton";

export default function PoemGenerator() {
  const [poem, setPoem] = useState<GenerateBirthdayPoemOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGeneratePoem = async () => {
    setIsLoading(true);
    setError(null);
    setPoem(null);
    try {
      const result = await generateBirthdayPoem({
        name: "Thissdax",
        tradingStrategy: "Quasimodo",
        interests: "Forex trading, mentoring, and being a market wizard.",
      });
      setPoem(result);
    } catch (e) {
      setError("Failed to generate poem. Please try again.");
      console.error(e);
    }
    setIsLoading(false);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
      className="max-w-2xl mx-auto"
    >
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Wand2 className="w-6 h-6 text-primary" />
            <CardTitle className="font-headline">AI-Powered Birthday Poem</CardTitle>
          </div>
          <CardDescription>
            Generate a unique birthday poem for Thissdax using AI.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
            <Button onClick={handleGeneratePoem} disabled={isLoading}>
                {isLoading ? "Generating..." : "Create a Poem"}
            </Button>

            {isLoading && (
                <div className="mt-6 space-y-2 text-left">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                </div>
            )}
            {error && <p className="mt-6 text-destructive">{error}</p>}
            {poem && (
                <div className="mt-6 p-4 bg-primary/10 rounded-lg text-left">
                    <pre className="whitespace-pre-wrap font-code text-sm text-foreground/80">
                        {poem.poem}
                    </pre>
                </div>
            )}
        </CardContent>
      </Card>
    </motion.section>
  );
}
