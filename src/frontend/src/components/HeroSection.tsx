import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';

export default function HeroSection() {
  const scrollToProducts = () => {
    const element = document.getElementById('products');
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(/assets/generated/hero-beetroot-background.dim_1920x1080.jpg)'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-kraft/95 via-kraft/85 to-kraft/95" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Logo */}
          <div className="flex justify-center mb-8 animate-in fade-in zoom-in duration-700">
            <img
              src="/assets/generated/beat-o-beet-logo.dim_800x800.png"
              alt="Beat o Beet - 100% Natural Vitality"
              className="w-64 h-64 md:w-80 md:h-80 drop-shadow-2xl"
            />
          </div>

          {/* Tagline */}
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom duration-700 delay-200">
            <h1 className="font-script text-5xl md:text-7xl text-burgundy drop-shadow-lg">
              100% Natural Vitality
            </h1>
            <p className="text-2xl md:text-3xl text-brown font-medium">
              Cold Pressed Beetroot Juice
            </p>
          </div>

          {/* Description */}
          <p className="text-lg md:text-xl text-brown/90 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom duration-700 delay-300">
            Experience the pure power of nature in every 180ml bottle. Our cold pressed beetroot
            juice delivers maximum nutrition with no additives, no preservatives—just pure,
            wholesome goodness.
          </p>

          {/* CTA Button */}
          <div className="pt-6 animate-in fade-in slide-in-from-bottom duration-700 delay-500">
            <Button
              onClick={scrollToProducts}
              size="lg"
              className="bg-burgundy hover:bg-burgundy-dark text-cream font-semibold px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Explore Our Products
              <ArrowDown className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Decorative Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
        >
          <path
            d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="oklch(0.97 0.01 60)"
          />
        </svg>
      </div>
    </div>
  );
}
