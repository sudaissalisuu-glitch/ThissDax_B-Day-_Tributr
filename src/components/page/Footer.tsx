import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border/40">
      <div className="container flex items-center justify-center py-6">
        <p className="text-sm text-muted-foreground flex items-center">
          Made with <Heart className="w-4 h-4 mx-1.5 text-primary fill-current" /> for the best Forex Mentor
        </p>
      </div>
    </footer>
  );
}
