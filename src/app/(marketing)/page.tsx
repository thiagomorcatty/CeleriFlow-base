import { Hero } from "@/components/sections/Hero";
import { Features } from "@/components/sections/Features";
import { Trust } from "@/components/sections/Trust";
import { FAQ } from "@/components/sections/FAQ";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <Trust />
      <FAQ />
      <Contact />
    </>
  );
}
