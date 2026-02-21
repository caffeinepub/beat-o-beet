import ProductCard from './ProductCard';

export default function ProductsSection() {
  const products = [
    {
      image: '/assets/generated/beetroot-pure-bottle.dim_400x600.png',
      name: 'Pure Beetroot',
      variant: 'Classic',
      description:
        'The original. 100% pure cold pressed beetroot juice with nothing added. Experience the full, earthy richness of premium beetroots.',
      benefits: [
        'Maximum nitrate content for circulation',
        'Rich in essential vitamins & minerals',
        'Pure, unadulterated beetroot flavor'
      ]
    },
    {
      image: '/assets/generated/beetroot-apple-bottle.dim_400x600.png',
      name: 'Beetroot Apple',
      variant: 'Sweet & Balanced',
      description:
        'A harmonious blend of earthy beetroot and crisp apple sweetness. Perfect for those new to beetroot juice.',
      benefits: [
        'Natural sweetness from fresh apples',
        'Enhanced vitamin C content',
        'Smooth, refreshing taste'
      ]
    },
    {
      image: '/assets/generated/beetroot-ginger-bottle.dim_400x600.png',
      name: 'Beetroot Ginger',
      variant: 'Spicy & Energizing',
      description:
        'Bold beetroot meets zesty ginger for an invigorating boost. A powerful combination for active lifestyles.',
      benefits: [
        'Anti-inflammatory properties',
        'Digestive support from ginger',
        'Natural energy kick'
      ]
    },
    {
      image: '/assets/generated/beetroot-carrot-bottle.dim_400x600.png',
      name: 'Beetroot Carrot',
      variant: 'Vitamin Rich',
      description:
        'A vibrant fusion of beetroot and carrot, packed with beta-carotene and antioxidants for overall wellness.',
      benefits: [
        'High in beta-carotene for eye health',
        'Double the antioxidant power',
        'Naturally sweet and earthy'
      ]
    }
  ];

  return (
    <div className="bg-cream py-20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="font-script text-5xl md:text-6xl text-burgundy">Our Products</h2>
          <p className="text-xl text-brown/80 leading-relaxed">
            Discover our range of cold pressed beetroot juice blends, each crafted to deliver
            maximum nutrition in a convenient 180ml bottle.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <ProductCard key={index} {...product} />
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <div className="inline-block bg-white rounded-2xl px-8 py-6 shadow-md">
            <p className="text-brown font-medium">
              <span className="text-burgundy font-semibold">All products:</span> No added sugar • No
              preservatives • No artificial colors • 100% Natural
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
