const BottomBlur = () => {
  return (
    <>
      {/* --- ULTRA GLASS BOTTOM BLUR --- */}
      <div className="fixed bottom-0 left-0 z-[999] w-full h-40 pointer-events-none">
        {/* Container ini menggunakan CSS MASK.
    Masking membuat elemen ini (dan efek blurnya) memudar dari solid (bawah) ke transparan (atas).
  */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            // Gradasi masker: Hitam artinya terlihat, Transparan artinya tersembunyi.
            maskImage: "linear-gradient(to top, black 10%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to top, black 10%, transparent 100%)", // Dukungan Safari
          }}
        >
          {/* Layer Efek Kaca:
      1. backdrop-blur-[16px]: Blur yang sangat kuat (lebih dari xl).
      2. bg-white/40: Memberikan warna putih susu transparan pada kaca.
    */}
          <div className="w-full h-full backdrop-blur-[16px] bg-white/40"></div>
        </div>

        {/* Opsional: Gradasi Halus Tambahan di paling bawah
    Untuk memastikan teks di paling bawah benar-benar "tenggelam".
  */}
        <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-white via-white/70 to-transparent"></div>
      </div>
    </>
  );
};

export default BottomBlur;