import { useState } from 'react';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';

interface ProductCardProps {
  id: string;
  image: string;
  name: string;
  variant: string;
  description: string;
  benefits: string[];
  price: number;
}

export default function ProductCard({ id, image, name, variant, description, benefits, price }: ProductCardProps) {
  const { addToCart } = useCart();
  const [showSuccess, setShowSuccess] = useState(false);

  const handleAddToCart = () => {
    addToCart({
      id,
      name,
      variant,
      price,
      imageUrl: image,
    });
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

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

        {/* Price and Add to Cart */}
        <div className="pt-4 space-y-3">
          <div className="text-2xl font-bold text-burgundy">
            ₹{price}
          </div>
          <Button
            onClick={handleAddToCart}
            className="w-full bg-burgundy hover:bg-burgundy-dark text-cream font-semibold py-6 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg"
            disabled={showSuccess}
          >
            {showSuccess ? (
              <span className="flex items-center justify-center gap-2">
                <Check className="h-5 w-5" />
                Added to Cart!
              </span>
            ) : (
              'Add to Cart'
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
