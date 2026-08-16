import Image from "next/image";
import type { Project } from "@/constant/projects";

const BrowserChrome = () => (
  <div className="flex h-8 items-center gap-1.5 border-b border-black/10 bg-white px-3">
    <span className="h-2 w-2 rounded-full bg-red-400" />
    <span className="h-2 w-2 rounded-full bg-amber-400" />
    <span className="h-2 w-2 rounded-full bg-green-400" />
    <div className="ml-3 h-3 flex-1 rounded-full bg-gray-100" />
  </div>
);

const RahayuTransportMockup = () => (
  <div className="h-full bg-[#f7f4ee] p-4 md:p-6">
    <div className="mb-6 flex items-center justify-between text-[7px] font-bold uppercase tracking-wider text-[#1b3a2b] md:text-[10px]">
      <span>Rahayu Transport</span>
      <div className="flex gap-3 text-[#51675b]"><span>Armada</span><span>Tentang</span><span>Kontak</span></div>
    </div>
    <div className="grid grid-cols-5 gap-3">
      <div className="col-span-3 rounded-lg bg-[#1b3a2b] p-4 text-white md:p-6">
        <p className="mb-2 text-[7px] uppercase tracking-[0.2em] text-[#d3c39a] md:text-[10px]">Sewa kendaraan terpercaya</p>
        <p className="max-w-[12rem] text-lg font-bold leading-[0.9] md:text-3xl">Perjalanan nyaman, tanpa khawatir.</p>
        <div className="mt-5 inline-block rounded-full bg-[#d3c39a] px-3 py-1.5 text-[7px] font-bold text-[#1b3a2b] md:text-[10px]">Booking Sekarang</div>
      </div>
      <div className="col-span-2 flex items-end rounded-lg bg-gradient-to-br from-[#768e7c] via-[#b7c4ac] to-[#e3dcc5] p-3">
        <div className="h-8 w-full rounded-t-full bg-[#f8f8f2] shadow-lg md:h-14">
          <div className="mx-auto mt-2 h-2 w-3/4 rounded-full bg-[#273f33] md:mt-3 md:h-3" />
        </div>
      </div>
    </div>
    <div className="mt-4 grid grid-cols-3 gap-2">
      {["Innova", "Hiace", "Alphard"].map((vehicle) => (
        <div key={vehicle} className="rounded-md bg-white p-2 shadow-sm">
          <div className="mb-2 h-6 rounded bg-[#d7dfd2] md:h-10" />
          <p className="text-[7px] font-bold text-[#1b3a2b] md:text-[10px]">{vehicle}</p>
        </div>
      ))}
    </div>
  </div>
);

const TahuTechMockup = () => (
  <div className="h-full bg-[#111113] p-4 text-white md:p-6">
    <div className="mb-6 flex items-center justify-between text-[7px] font-bold uppercase tracking-wider md:text-[10px]">
      <span className="text-[#d7ff00]">TahuTech.</span>
      <div className="flex gap-3 text-gray-400"><span>Review</span><span>Tier List</span><span>Shop</span></div>
    </div>
    <div className="grid grid-cols-5 gap-3">
      <div className="col-span-3 rounded-lg border border-white/10 bg-[#19191d] p-4 md:p-6">
        <p className="mb-2 text-[7px] uppercase tracking-[0.2em] text-[#d7ff00] md:text-[10px]">Gaming gear review</p>
        <p className="max-w-[12rem] text-lg font-bold leading-[0.9] md:text-3xl">Gear bagus perlu bukti, bukan hype.</p>
        <div className="mt-5 inline-block rounded-full bg-[#d7ff00] px-3 py-1.5 text-[7px] font-bold text-black md:text-[10px]">Watch Reviews</div>
      </div>
      <div className="col-span-2 flex items-center justify-center rounded-lg bg-gradient-to-br from-[#352d66] to-[#111113]">
        <div className="relative h-16 w-20 rounded-xl border-4 border-[#d7ff00] bg-[#292733] md:h-24 md:w-32">
          <div className="absolute -bottom-2 left-1/2 h-3 w-8 -translate-x-1/2 rounded-b bg-[#d7ff00]" />
        </div>
      </div>
    </div>
    <div className="mt-4 grid grid-cols-3 gap-2">
      {["Keyboard", "Mouse", "Headset"].map((category) => (
        <div key={category} className="rounded-md border border-white/10 bg-[#19191d] p-2">
          <div className="mb-2 h-6 rounded bg-[#302d3b] md:h-10" />
          <p className="text-[7px] font-bold text-gray-300 md:text-[10px]">{category}</p>
        </div>
      ))}
    </div>
  </div>
);

export default function ProjectMockup({
  project,
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
}: {
  project: Project;
  sizes?: string;
  priority?: boolean;
}) {
  if (project.image) {
    return (
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl shadow-black/5">
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-100">
          <Image
            src={project.image}
            alt={`Mockup ${project.client}`}
            fill
            priority={priority}
            quality={90}
            sizes={sizes}
            className="object-cover object-top"
          />
        </div>
      </div>
    );
  }

  const mockup = project.slug === "rahayu-transport" ? <RahayuTransportMockup /> : <TahuTechMockup />;

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl shadow-black/5">
      <BrowserChrome />
      <div className="aspect-[16/10] overflow-hidden">{mockup}</div>
    </div>
  );
}
