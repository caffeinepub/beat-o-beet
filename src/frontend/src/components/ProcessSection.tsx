export default function ProcessSection() {
  return (
    <div className="bg-kraft py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 space-y-4">
            <h2 className="font-script text-5xl md:text-6xl text-burgundy">Our Process</h2>
            <p className="text-xl text-brown/80 max-w-2xl mx-auto">
              Cold pressing preserves the natural goodness of beetroots, delivering maximum
              nutrition in every bottle.
            </p>
          </div>

          {/* Content Grid */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="order-2 md:order-1">
              <div className="bg-white rounded-3xl p-8 shadow-xl">
                <img
                  src="/assets/generated/cold-press-process.dim_600x400.png"
                  alt="Cold Press Process"
                  className="w-full h-auto rounded-2xl"
                />
              </div>
            </div>

            {/* Text Content */}
            <div className="order-1 md:order-2 space-y-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-burgundy text-cream rounded-full flex items-center justify-center font-bold text-xl">
                    1
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-burgundy mb-2">
                      Fresh, Premium Beetroots
                    </h3>
                    <p className="text-brown/80">
                      We source only the finest, organically grown beetroots at peak ripeness to
                      ensure maximum flavor and nutrition.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-burgundy text-cream rounded-full flex items-center justify-center font-bold text-xl">
                    2
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-burgundy mb-2">Cold Press Method</h3>
                    <p className="text-brown/80">
                      Our hydraulic cold press extracts juice without heat or oxidation, preserving
                      vital enzymes, vitamins, and minerals.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-burgundy text-cream rounded-full flex items-center justify-center font-bold text-xl">
                    3
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-burgundy mb-2">
                      100% Natural Purity
                    </h3>
                    <p className="text-brown/80">
                      No additives, no preservatives, no artificial anything. Just pure, cold
                      pressed juice bottled fresh for you.
                    </p>
                  </div>
                </div>
              </div>

              {/* Highlight Box */}
              <div className="bg-forest/10 border-2 border-forest rounded-2xl p-6 mt-8">
                <h4 className="text-forest font-semibold text-lg mb-2">Why Cold Pressed?</h4>
                <p className="text-brown/80 text-sm leading-relaxed">
                  Unlike traditional juicing methods that generate heat and destroy nutrients, cold
                  pressing maintains the integrity of vitamins, minerals, and enzymes. This means
                  you get up to 5x more nutrients in every sip.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
