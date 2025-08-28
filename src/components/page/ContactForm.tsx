"use client";

import { sendBirthdayMessage } from "@/app/actions";
import { useActionState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

export default function ContactForm() {
  const { toast } = useToast();
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
    } else if (state.errors) {
      toast({
        variant: "destructive",
        title: "Error",
        description: state.errors,
      });
    }
  }, [state, toast]);

  return (
    <form action={formAction} className="grid gap-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <input
          name="from_name"
          required
          placeholder="Your name"
          className="bg-white/5 border border-white/10 rounded-2xl px-4 py-3 outline-none focus:border-purple-400"
        />
        <input
          name="reply_to"
          type="email"
          required
          placeholder="Your email"
          className="bg-white/5 border border-white/10 rounded-2xl px-4 py-3 outline-none focus:border-purple-400"
        />
      </div>
      <textarea
        name="message"
        rows={5}
        required
        placeholder="Write a birthday note for Thissdax…"
        className="bg-white/5 border border-white/10 rounded-2xl px-4 py-3 outline-none focus:border-purple-400"
      />
      <Button
        type="submit"
        disabled={isPending}
        className="rounded-2xl px-5 py-3 font-medium bg-gradient-to-r from-purple-600 to-fuchsia-500 hover:from-purple-500 hover:to-fuchsia-400 disabled:opacity-60"
      >
        {isPending ? "Sending…" : state.success ? "Sent ✓" : "Send Message"}
      </Button>
    </form>
  );
}