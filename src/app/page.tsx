import Header from '@/components/page/Header';
import Hero from '@/components/page/Hero';
import PoemGenerator from '@/components/page/PoemGenerator';
import ContactForm from '@/components/page/ContactForm';
import Footer from '@/components/page/Footer';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-grow">
        <Hero />
        <div className="container mx-auto px-4 py-16 sm:py-24 space-y-24">
          <PoemGenerator />
          <ContactForm />
        </div>
      </main>
      <Footer />
    </div>
  );
}
