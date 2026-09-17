import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";
import { EcosystemMatrix } from "@/components/sections/EcosystemMatrix";
import { DashboardShowcase } from "@/components/sections/DashboardShowcase";
import { ConnectivityMatrix } from "@/components/sections/ConnectivityMatrix";
import { ImplementationRoadmap } from "@/components/sections/ImplementationRoadmap";
import { RoiCalculator } from "@/components/sections/RoiCalculator";
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
      <ConnectivityMatrix />
      <ImplementationRoadmap />
      <RoiCalculator />
      <Trust />
      <FAQ />
      <Contact />
    </>
  );
}
