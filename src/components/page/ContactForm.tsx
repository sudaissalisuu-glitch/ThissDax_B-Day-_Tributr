"use client";

import { useFormState, useFormStatus } from "react-dom";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Mail, Send } from "lucide-react";

import { sendBirthdayMessage } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Label } from "../ui/label";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full mt-4">
      {pending ? "Sending..." : "Send Message"}
      <Send className="ml-2 h-4 w-4" />
    </Button>
  );
}

export default function ContactForm() {
  const [state, formAction] = useFormState(sendBirthdayMessage, {
    message: "",
    errors: undefined,
    success: false,
  });
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if(state.message === "") return;
    if (state.success) {
      toast({
        title: "Success!",
        description: state.message,
      });
      formRef.current?.reset();
    } else {
       toast({
        title: "Oops!",
        description: state.message,
        variant: "destructive",
      });
    }
  }, [state]);

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
            <Mail className="w-6 h-6 text-primary" />
            <CardTitle className="font-headline">Send a Birthday Wish</CardTitle>
          </div>
          <CardDescription>
            Leave a message for Thissdax and it will be sent directly to him.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form ref={formRef} action={formAction} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" placeholder="Your Name" />
              {state.errors?.name && <p className="text-sm text-destructive">{state.errors.name[0]}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="Your Email" />
              {state.errors?.email && <p className="text-sm text-destructive">{state.errors.email[0]}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" name="message" placeholder="Happy Birthday..." />
              {state.errors?.message && <p className="text-sm text-destructive">{state.errors.message[0]}</p>}
            </div>
            <SubmitButton />
          </form>
        </CardContent>
      </Card>
    </motion.section>
  );
}
