import { Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const appIdentifier = encodeURIComponent(
    typeof window !== 'undefined' ? window.location.hostname : 'beat-o-beet'
  );

  return (
    <footer className="bg-brown text-cream py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img
                src="/assets/generated/beat-o-beet-logo.dim_800x800.png"
                alt="Beat o Beet"
                className="h-16 w-16"
              />
              <span className="font-script text-3xl text-cream">beat o beet</span>
            </div>
            <p className="text-cream/80 text-sm">
              100% Natural Vitality in every 180ml bottle. Cold pressed beetroot juice with no
              additives or preservatives.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => {
                    const element = document.getElementById('products');
                    element?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-cream/80 hover:text-cream transition-colors"
                >
                  Our Products
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    const element = document.getElementById('about');
                    element?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-cream/80 hover:text-cream transition-colors"
                >
                  Our Process
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    const element = document.getElementById('benefits');
                    element?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-cream/80 hover:text-cream transition-colors"
                >
                  Health Benefits
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    const element = document.getElementById('contact');
                    element?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-cream/80 hover:text-cream transition-colors"
                >
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Connect With Us</h3>
            <p className="text-cream/80 text-sm mb-4">
              Have questions or want to stock our products? Get in touch with us today.
            </p>
            <button
              onClick={() => {
                const element = document.getElementById('contact');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-burgundy-light hover:text-burgundy-lighter transition-colors text-sm font-medium"
            >
              Send us a message →
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-cream/20 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-cream/70 text-sm">
            © {currentYear} Beat o Beet. All rights reserved.
          </p>
          <p className="text-cream/70 text-sm flex items-center">
            Built with <Heart className="mx-1 h-4 w-4 text-burgundy-light fill-current" /> using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appIdentifier}`}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-1 text-burgundy-light hover:text-burgundy-lighter transition-colors font-medium"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
