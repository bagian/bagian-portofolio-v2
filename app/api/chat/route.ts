import { google } from "@ai-sdk/google";
import { groq } from "@ai-sdk/groq";
import { streamText, embed } from "ai";
import { createClient } from "@supabase/supabase-js";

interface Document {
  id: number;
  content: string;
  metadata: unknown;
  similarity: number;
}

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const lastMessage = messages[messages.length - 1].content;

    console.log("--- REQUEST BARU ---");
    console.log("User:", lastMessage);

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    // --- FITUR BARU: AUTO-SAVE CONTACT (LEAD GEN) ---
    // Regex sederhana untuk deteksi Email atau Nomor HP Indonesia (08xx / 628xx)
    const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/;
    const phoneRegex = /(\+62|62|0)8[1-9][0-9]{6,10}/;

    const isContactInfo =
      emailRegex.test(lastMessage) || phoneRegex.test(lastMessage);

    if (isContactInfo) {
      console.log("🎯 DETEKSI KONTAK! Menyimpan ke database...");
      await supabase.from("leads").insert({
        contact_info: lastMessage, // Menyimpan isi pesan yang mengandung kontak
        message_context:
          messages.length > 1
            ? messages[messages.length - 2].content
            : "Awal percakapan",
      });
    }
    // ------------------------------------------------

    // 1. EMBEDDING
    const { embedding } = await embed({
      model: google.embedding("text-embedding-004"),
      value: lastMessage,
    });

    // 2. SEARCHING
    const { data: documents } = (await supabase.rpc("match_documents", {
      query_embedding: embedding,
      match_threshold: 0.1,
      match_count: 3,
    })) as { data: Document[] | null };

    const context = documents?.map((doc) => doc.content).join("\n") || "";

    // 3. GENERATING ANSWER
    console.log("Mengirim ke Groq...");

    const result = await streamText({
      model: groq("llama-3.3-70b-versatile"),

      system: `Kamu adalah asisten AI profesional untuk "Bagian Corps".
      
      KONTEKS DATA DARI WEBSITE:
      ---
      ${context}
      ---

      ATURAN PENTING:
      1. Jika user baru saja memberikan nomor HP atau Email (lihat input user terakhir), JANGAN LUPA ucapkan: "Terima kasih, data kontak Kakak sudah kami simpan. Tim kami akan segera menghubungi."
      2. Jika user bertanya harga/layanan, jawab sesuai konteks di atas.
      3. Jika user terlihat tertarik tapi belum kasih kontak, pancing dengan sopan: "Boleh tinggalkan nomor WhatsApp agar kami bisa kirimkan penawaran lengkap?"
      
      Gunakan Bahasa Indonesia yang ramah dan profesional.`,
      messages,
    });

    return result.toTextStreamResponse();
  } catch (err: unknown) {
    console.error("ERROR:", err);
    const errorMessage =
      err instanceof Error ? err.message : "Internal Server Error";
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
