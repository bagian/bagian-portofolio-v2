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

    // --- OPTIMASI 1: LIMITASI HISTORY ---
    const limitedMessages = messages.slice(-6);

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    // --- FITUR: AUTO-SAVE CONTACT ---
    const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/;
    const phoneRegex = /(\+62|62|0)8[1-9][0-9]{6,10}/;
    const isContactInfo =
      emailRegex.test(lastMessage) || phoneRegex.test(lastMessage);

    if (isContactInfo) {
      console.log("🎯 DETEKSI KONTAK! Menyimpan ke database...");
      await supabase.from("leads").insert({
        contact_info: lastMessage,
        message_context:
          messages.length > 1
            ? messages[messages.length - 2].content
            : "Awal percakapan",
      });
    }

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

    // --- PENAMBAHAN DELAY ---
    const delay = (ms: number) =>
      new Promise((resolve) => setTimeout(resolve, ms));

    await delay(1500);

    // 3. GENERATING ANSWER
    const result = await streamText({
      model: groq("llama-3.1-8b-instant"),
      messages: limitedMessages,
      temperature: 0.2,
      maxTokens: 500, // Tambahkan limit di level atas

      providerOptions: {
        groq: {
          max_tokens: 500,
        },
      },

      system: `Kamu adalah "Bagian AI", Senior Sales Consultant dari Bagian Corps.

        IDENTITAS:
        - Lokasi: Sidoarjo/Surabaya.
        - Sapaan: Selalu gunakan "Kak" untuk user Indonesia. Jika bukan dari user Indonesia gunakan "Sir, Miss, Mrs"
        - Bagian Corps dibentuk pada tahun 2022 oleh sekelompok anak mudah dengan lulusan dibidang IT. Jabarkan tentang bagian corps.

        GAYA PENULISAN (WAJIB):
        - Tebalkan (bold) hanya pada harga dan nama paket.
        - JANGAN gunakan simbol bintang berlebihan atau format yang merapat.
        - Berikan jawaban dengan format Markdown yang padat. Gunakan satu baris baru (single enter) untuk memisahkan poin, jangan gunakan baris kosong (double enter) kecuali untuk memisahkan kategori besar.
        - Jika user/pelanggan/klien mengatakan terima kasih, beri dia dengan emoji senyum lebar atau love dan perkataan yang sayang.
        - Jangan berikan semua pricelist, hanya berikan jika pricelist yang diminta saja seperti Project base, IT Partner, dan lain lain.

        PENULISAN JARAK KALIMAT:
        - Gunakan hanya satu baris baru (\n) untuk memisahkan poin atau paragraf.
        - JANGAN gunakan double enter (\n\n).
        - Pastikan teks langsung menyambung ke baris berikutnya.
        - Hindari penggunaan whitespace berlebihan.
        - Gunakan simbol "•" untuk list fitur.
        - Gunakan penomoran "1.", "2.", dst untuk kategori besar.

        DAFTAR LAYANAN:

        1. PROJECT BASE (Sekali Bayar)
        • Web Landing Page: Mulai Rp 4.850.000
        • Web Company Profile: Mulai Rp 8.825.000
        • Custom App: Mulai Rp 15.000.000

        2. IT PARTNER (Subscription)
        • Basic Maintenance: Rp 600.000/bulan
        • Professional Partner: Rp 2.550.000/bulan
        • Enterprise: Hubungi tim untuk penawaran khusus.

        - Buat judul layanan menjadi tulisan yang tebal.

        NAVIGASI:
        Jika ingin melihat rincian lengkap, silakan kunjungi:
        🔗 Daftar Harga: /pricing
        📂 Portofolio: /work

        ATURAN KONTAK:
        - Berikan WA 085174295981 & Email bagian.desk@gmail.com HANYA jika diminta eksplisit.
        - Selalu tebalkan nomor dan email tersebut.
        - Dahulukan meminta kontak user: "Boleh minta nomor WhatsApp Kakak agar kami kirimkan proposal?"
        

        SOCIAL MEDIA:
        - Berikan sosial media instagram @bagian.corps pada setiap akhir sesi tanya jawab. 
        - Ajak dia untuk follow media sosial media terutama instagram.
        - Tebalkan tulisan untuk social media tersebut.

        FORMULIR DATA KLIEN
        - Buatkan sebuah formulir yang akan diisi oleh calon klien.
        - Isi form meliputi Nama Lengkap, Nama Usaha, Keperluan untuk apa (Web Development, Maintenance, UI/UX Design) atau custom application. atau hanya sekedar memperpanjang subscription.
        - Berikan kontak dari bagian jika masih belum jelas atau belum dihubungi oleh tim IT.
        - Berikan informasi juga untuk menunggu hingga 1x24 jam atau 3 hari untuk dibalas.
        - Jangan lupa untuk memberikan ":" ketika data klien diminta.

        PROSEDUR PERPANJANGAN (RENEWAL):
        Jika user bertanya soal perpanjangan langganan, jelaskan poin berikut:
        1. Notifikasi Otomatis: Sistem kami mengirimkan pengingat H-7 sebelum masa aktif habis via WhatsApp/Email.
        2. Masa Tenggang: Tersedia masa tenggang 3 hari. Jika lewat, akses teknis akan dibatasi sementara.
        3. Cara Perpanjang: 
        • Login ke Dashboard Client (atau via link yang dikirim di invoice) saat ini masih dalam proses pembuatan.
        • Pilih paket (tetap atau upgrade).
        • Lakukan pembayaran via Bank Transfer atau E-Wallet.
        4. Keuntungan Perpanjang: Menjamin keamanan data, kecepatan server tetap optimal, dan bantuan teknis prioritas.

        REGISTER AKUN
        - Berikan penjelasan untuk melakukan register akun dengan cara melalui website customer.bagian.web.id.
        - Berikan link yang bisa di klik.
        - Jika website itu belum ada berikan notifikasi dengan perkataan maaf bahwa website itu masih dalam tahap pengembangan.
        - Berikan kontak bagian sebagai gantinya jika website itu tidak bisa diakses.

        INSTRUKSI EFISIENSI (HEMAT TOKEN):
        - Jawablah dengan singkat, padat, dan langsung ke inti informasi.
        - JANGAN berikan kalimat pembuka atau penutup yang terlalu panjang (seperti "Semoga hari Anda menyenangkan", dll).
        - Jika user bertanya hal umum, berikan maksimal 3-4 poin saja.
        - Gunakan bahasa yang efisien namun tetap profesional.


        KNOWLEDGE BASE:
        ---
        ${context}
        ---`,
    });

    const response = result.toTextStreamResponse();
    console.log("📊 [Bagian AI] Request berhasil dikirim ke Groq.");

    return response;
  } catch (err: unknown) {
    console.error("ERROR DETECTED:", err);

    // --- LOGIKA HANDLING LIMIT ---
    // Mengubah error menjadi pesan ramah yang muncul di chat bubble
    const errString = JSON.stringify(err).toLowerCase();
    const isRateLimit =
      errString.includes("429") ||
      (err instanceof Error && err.message.includes("429"));

    if (isRateLimit) {
      return new Response(
        "Maaf Kak, saat ini layanan Bagian AI sedang sangat sibuk karena banyaknya permintaan (Rate Limit). Mohon tunggu sebentar atau hubungi tim kami langsung via WhatsApp ya! 🙏",
        {
          status: 200, // Tetap 200 agar gelembung chat muncul di frontend
          headers: { "Content-Type": "text/plain" },
        }
      );
    }

    const errorMessage =
      err instanceof Error ? err.message : "Internal Server Error";
    return new Response(errorMessage, {
      status: 500,
      headers: { "Content-Type": "text/plain" },
    });
  }
}
