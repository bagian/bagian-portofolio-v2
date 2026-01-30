import { createClient } from "@supabase/supabase-js";
import { GoogleGenerativeAI } from "@google/generative-ai";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY!);

export async function injectKnowledge() {
  const model = genAI.getGenerativeModel({ model: "text-embedding-004" });

  const knowledge = [
    "Bagian Corps adalah software house spesialis UI/UX Engineering dan Web Development.",
    "Paket Starter Page seharga Rp 4.850.000 mencakup 1-3 halaman, domain .id gratis, dan SSL Cloudflare.",
    "Paket Web Perusahaan seharga Rp 8.825.000 mencakup CMS, 5-8 halaman, dan optimasi SEO advance.",
    "Paket Aplikasi Custom mulai dari Rp 15.000.000 untuk sistem kompleks.",
    "Layanan IT Partner (Maintenance) tersedia mulai dari Rp 1.500.000 per bulan.",
    "Kami ahli dalam teknologi Next.js, TypeScript, Tailwind CSS, GSAP, dan Laravel.",
    "Klien kami meliputi YellowKost, Lentera Fajar Indonesia, dan Kinaya Interior.",
    "Kontak resmi kami adalah bagian.desk@gmail.com atau melalui website www.bagian.web.id.",
  ];

  for (const text of knowledge) {
    const result = await model.embedContent(text);
    const embedding = result.embedding.values;

    await supabase.from("documents").insert({
      content: text,
      embedding: embedding,
      metadata: { category: "company_info" },
    });
  }
  return "Knowledge injected!";
}
