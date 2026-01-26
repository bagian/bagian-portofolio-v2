import Hero from "@/components/home/Hero";
import Intro from "@/components/home/Intro";
import FeaturedWork from "@/components/home/FeaturedWork";

import Services from "@/components/home/Services";
import TechStack from "@/components/home/TechStuck";

import Process from "@/components/home/Process";
import ClientLogs from "@/components/home/ClientLogs";
import FAQ from "@/components/home/Faq";
import Pricing from "@/components/home/Pricing";

export default function Home() {
  return (
    <main>
      <Hero />
      <Intro />
      <Services />
      <ClientLogs />
      <TechStack />
      <Process />
      <FeaturedWork />
      <Pricing />
      <FAQ />
    </main>
  );
}
