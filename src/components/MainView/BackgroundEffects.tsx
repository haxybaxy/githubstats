export const BackgroundEffects = () => {
  return (
    <>
      {/* Background effects */}
      <div className="fixed inset-0 z-0">
          {/* Purple-blues */}
          <div className="absolute top-1/4 -left-10 w-96 h-96 bg-violet-100/80 dark:bg-[#58a6ff]/20 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-70 animate-blob"></div>
          <div className="absolute bottom-1/3 left-1/3 w-96 h-96 bg-amber-100/80 dark:bg-[#1f6feb]/20 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>

          {/* Blues with purple tint */}
          <div className="absolute top-1/3 right-1/3 w-96 h-96 bg-indigo-100/80 dark:bg-[#3fb950]/20 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-32 right-1/4 w-96 h-96 bg-yellow-100/80 dark:bg-[#238636]/20 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-70 animate-blob animation-delay-6000"></div>

          {/* Purpletones and yellow */}
          <div className="absolute top-2/3 right-1/2 w-96 h-96 bg-fuchsia-100/80 dark:bg-[#2ea043]/20 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-70 animate-blob animation-delay-3000"></div>
          <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-violet-100/80 dark:bg-[#388bfd]/20 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-70 animate-blob animation-delay-5000"></div>

          {/* Right blob */}
          <div className="absolute top-1/3 -right-10 w-96 h-96 bg-purple-100/80 dark:bg-[#58a6ff]/20 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-70 animate-blob animation-delay-1000"></div>
        </div>

        {/* Noise texture overlay */}
        <div className="absolute inset-0 z-0 opacity-50">
          <svg className="w-full h-full">
            <filter id="noiseFilter">
              <feTurbulence type="fractalNoise" baseFrequency="0.6" stitchTiles="stitch"/>
            </filter>
            <rect width="100%" height="100%" filter="url(#noiseFilter)" opacity="0.05"/>
          </svg>
        </div>
    </>
  );
};
