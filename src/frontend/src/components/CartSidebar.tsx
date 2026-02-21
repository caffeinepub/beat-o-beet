import { X, Plus, Minus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { useNavigate } from '@tanstack/react-router';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const { items, totalPrice, updateQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    onClose();
    navigate({ to: '/checkout' });
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-50 transition-opacity"
        onClick={onClose}
      />

      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full sm:w-96 bg-kraft shadow-2xl z-50 flex flex-col animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-brown/20">
          <h2 className="font-script text-3xl text-burgundy">Your Cart</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-cream rounded-lg transition-colors"
          >
            <X size={24} className="text-brown" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="text-brown/40 mb-4">
                <ShoppingCart size={64} />
              </div>
              <p className="text-brown/60 text-lg">Your cart is empty</p>
              <p className="text-brown/40 text-sm mt-2">Add some delicious beetroot juice!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="bg-cream rounded-2xl p-4 shadow-sm"
                >
                  <div className="flex gap-4">
                    {/* Product Image */}
                    <div className="w-20 h-20 bg-white rounded-xl flex items-center justify-center flex-shrink-0">
                      <img
                        src={item.product.imageUrl}
                        alt={item.product.name}
                        className="h-16 w-auto object-contain"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-burgundy truncate">
                        {item.product.name}
                      </h3>
                      <p className="text-sm text-forest">{item.product.variant}</p>
                      <p className="text-lg font-bold text-brown mt-1">
                        ₹{item.product.price}
                      </p>
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-2 bg-white rounded-lg p-1">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="p-1 hover:bg-cream rounded transition-colors"
                      >
                        <Minus size={16} className="text-burgundy" />
                      </button>
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => {
                          const val = parseInt(e.target.value) || 0;
                          updateQuantity(item.product.id, val);
                        }}
                        className="w-12 text-center bg-transparent text-brown font-semibold focus:outline-none"
                        min="1"
                      />
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="p-1 hover:bg-cream rounded transition-colors"
                      >
                        <Plus size={16} className="text-burgundy" />
                      </button>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="font-bold text-burgundy">
                        ₹{item.product.price * item.quantity}
                      </span>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="p-2 hover:bg-white rounded-lg transition-colors"
                      >
                        <Trash2 size={18} className="text-brown/60 hover:text-burgundy" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-brown/20 p-6 space-y-4 bg-kraft">
            <div className="flex items-center justify-between text-lg">
              <span className="font-semibold text-brown">Total:</span>
              <span className="font-bold text-2xl text-burgundy">₹{totalPrice}</span>
            </div>
            <Button
              onClick={handleCheckout}
              className="w-full bg-burgundy hover:bg-burgundy-dark text-cream font-semibold py-6 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg text-lg"
            >
              Proceed to Checkout
            </Button>
          </div>
        )}
      </div>
    </>
  );
}

function ShoppingCart({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  );
}
