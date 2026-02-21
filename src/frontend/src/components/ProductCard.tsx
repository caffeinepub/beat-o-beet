interface ProductCardProps {
  image: string;
  name: string;
  variant: string;
  description: string;
  benefits: string[];
}

export default function ProductCard({ image, name, variant, description, benefits }: ProductCardProps) {
  return (
    <div className="group bg-cream rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
      {/* Image Container */}
      <div className="relative bg-white p-8 flex items-center justify-center h-80 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="h-full w-auto object-contain group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4 bg-burgundy text-cream px-4 py-2 rounded-full text-sm font-semibold shadow-md">
          180ml
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        <div>
          <h3 className="font-script text-3xl text-burgundy mb-1">{name}</h3>
          <p className="text-forest font-medium text-lg">{variant}</p>
        </div>

        <p className="text-brown/80 leading-relaxed">{description}</p>

        {/* Benefits */}
        <div className="pt-2">
          <h4 className="text-sm font-semibold text-brown mb-2 uppercase tracking-wide">
            Key Benefits
          </h4>
          <ul className="space-y-1">
            {benefits.map((benefit, index) => (
              <li key={index} className="flex items-start text-sm text-brown/80">
                <span className="text-burgundy mr-2 mt-0.5">•</span>
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
