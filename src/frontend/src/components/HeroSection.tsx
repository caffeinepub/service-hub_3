interface HeroSectionProps {
  compact?: boolean;
}

export default function HeroSection({ compact = false }: HeroSectionProps) {
  if (compact) {
    return (
      <section className="relative w-full h-32 bg-gradient-to-r from-lawn/20 to-wash/20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/assets/generated/hero-banner.dim_1200x400.png')] bg-cover bg-center opacity-30" />
        <div className="relative container h-full flex items-center justify-center">
          <h1 className="text-2xl md:text-3xl font-bold text-center">Professional Service at Your Doorstep</h1>
        </div>
      </section>
    );
  }

  return (
    <section className="relative w-full h-[400px] bg-gradient-to-r from-lawn/20 to-wash/20 overflow-hidden">
      <div className="absolute inset-0 bg-[url('/assets/generated/hero-banner.dim_1200x400.png')] bg-cover bg-center opacity-40" />
      <div className="relative container h-full flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 max-w-4xl">
          Professional Lawn & Car Care Services
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl">
          Book reliable lawn mowing and car washing services with just a few clicks. Quality service, every time.
        </p>
      </div>
    </section>
  );
}
