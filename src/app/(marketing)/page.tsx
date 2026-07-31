import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";
import { EcosystemMatrix } from "@/components/sections/EcosystemMatrix";
import { DashboardShowcase } from "@/components/sections/DashboardShowcase";
import { Trust } from "@/components/sections/Trust";
import { FAQ } from "@/components/sections/FAQ";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <EcosystemMatrix />
      <DashboardShowcase />
      <Trust />
      <FAQ />
      <Contact />
    </>
  );
}
