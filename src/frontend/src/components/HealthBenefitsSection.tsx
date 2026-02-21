export default function HealthBenefitsSection() {
  const benefits = [
    {
      icon: '/assets/generated/health-icon-circulation.dim_200x200.png',
      title: 'Improved Circulation',
      description:
        'Rich in dietary nitrates that convert to nitric oxide, helping to dilate blood vessels and improve blood flow throughout your body.'
    },
    {
      icon: '/assets/generated/health-icon-energy.dim_200x200.png',
      title: 'Natural Energy Boost',
      description:
        'Enhance your stamina and reduce fatigue naturally. Perfect for athletes and active individuals seeking sustained energy.'
    },
    {
      icon: '/assets/generated/health-icon-antioxidants.dim_200x200.png',
      title: 'Powerful Antioxidants',
      description:
        'Packed with betalains and vitamin C to fight free radicals, support immune function, and promote overall cellular health.'
    }
  ];

  const nutritionalHighlights = [
    { nutrient: 'Folate', benefit: 'Cell growth & DNA synthesis' },
    { nutrient: 'Vitamin C', benefit: 'Immune support & collagen production' },
    { nutrient: 'Potassium', benefit: 'Heart health & blood pressure regulation' },
    { nutrient: 'Iron', benefit: 'Oxygen transport & energy metabolism' },
    { nutrient: 'Magnesium', benefit: 'Muscle & nerve function' },
    { nutrient: 'Fiber', benefit: 'Digestive health & satiety' }
  ];

  return (
    <div className="bg-cream py-20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="font-script text-5xl md:text-6xl text-burgundy">Health Benefits</h2>
          <p className="text-xl text-brown/80 leading-relaxed">
            Discover why beetroot juice has been celebrated for centuries as a natural health tonic.
          </p>
        </div>

        {/* Main Benefits Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center"
            >
              <div className="flex justify-center mb-6">
                <div className="w-32 h-32 bg-cream rounded-full flex items-center justify-center p-4">
                  <img src={benefit.icon} alt={benefit.title} className="w-full h-full object-contain" />
                </div>
              </div>
              <h3 className="text-2xl font-semibold text-burgundy mb-4">{benefit.title}</h3>
              <p className="text-brown/80 leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* Nutritional Highlights */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg">
            <h3 className="text-3xl font-script text-burgundy text-center mb-8">
              Nutritional Powerhouse
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {nutritionalHighlights.map((item, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-3 h-3 bg-burgundy rounded-full mt-2" />
                  <div>
                    <h4 className="font-semibold text-forest text-lg">{item.nutrient}</h4>
                    <p className="text-brown/70 text-sm">{item.benefit}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scientific Note */}
        <div className="mt-12 text-center">
          <p className="text-sm text-brown/60 max-w-2xl mx-auto italic">
            * These statements are based on scientific research. Individual results may vary. Consult
            with a healthcare professional before making significant dietary changes.
          </p>
        </div>
      </div>
    </div>
  );
}
