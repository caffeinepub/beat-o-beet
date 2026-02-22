import { useState, FormEvent } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useCart } from '@/contexts/CartContext';
import { useSubmitOrder } from '@/hooks/useQueries';
import { useToast } from '@/hooks/useToast';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { QrCode } from 'lucide-react';

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const submitOrder = useSubmitOrder();
  const { success: showSuccessToast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    shippingAddress: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    shippingAddress: '',
  });

  const validateForm = () => {
    const newErrors = {
      name: '',
      email: '',
      shippingAddress: '',
    };

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.shippingAddress.trim()) {
      newErrors.shippingAddress = 'Shipping address is required';
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error !== '');
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (items.length === 0) {
      return;
    }

    const cartItems = items.map((item) => ({
      productId: item.product.id,
      quantity: BigInt(item.quantity),
      addedAt: BigInt(Date.now() * 1000000), // Convert to nanoseconds
    }));

    try {
      const result = await submitOrder.mutateAsync({
        items: cartItems,
        customerName: formData.name,
        customerEmail: formData.email,
        shippingAddress: formData.shippingAddress,
      });

      if (result.success && result.orderId) {
        // Show success toast notification
        showSuccessToast('Order submitted successfully! 🎉');
        
        // Clear cart
        clearCart();
        
        // Wait briefly to allow user to see the toast before navigating
        setTimeout(() => {
          navigate({ to: `/order/${result.orderId}` });
        }, 1500);
      }
    } catch (error) {
      console.error('Order submission failed:', error);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navigation />
        <main className="flex-1 flex items-center justify-center pt-20">
          <div className="text-center space-y-4 p-8">
            <h1 className="font-script text-4xl text-burgundy">Your cart is empty</h1>
            <p className="text-brown/60">Add some products before checking out</p>
            <Button
              onClick={() => navigate({ to: '/' })}
              className="bg-burgundy hover:bg-burgundy-dark text-cream"
            >
              Continue Shopping
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      <main className="flex-1 pt-28 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="font-script text-5xl text-burgundy text-center mb-12">Checkout</h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Customer Information Form */}
            <div className="bg-kraft rounded-3xl p-8 shadow-lg">
              <h2 className="font-script text-3xl text-burgundy mb-6">Customer Information</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name" className="text-brown font-semibold">
                    Full Name *
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="mt-2 bg-white border-brown/20"
                    placeholder="Enter your full name"
                  />
                  {errors.name && <p className="text-sm text-destructive mt-1">{errors.name}</p>}
                </div>

                <div>
                  <Label htmlFor="email" className="text-brown font-semibold">
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="mt-2 bg-white border-brown/20"
                    placeholder="your.email@example.com"
                  />
                  {errors.email && <p className="text-sm text-destructive mt-1">{errors.email}</p>}
                </div>

                <div>
                  <Label htmlFor="address" className="text-brown font-semibold">
                    Shipping Address *
                  </Label>
                  <Textarea
                    id="address"
                    value={formData.shippingAddress}
                    onChange={(e) => setFormData({ ...formData, shippingAddress: e.target.value })}
                    className="mt-2 bg-white border-brown/20 min-h-32"
                    placeholder="Enter your complete shipping address"
                  />
                  {errors.shippingAddress && (
                    <p className="text-sm text-destructive mt-1">{errors.shippingAddress}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={submitOrder.isPending}
                  className="w-full bg-burgundy hover:bg-burgundy-dark text-cream font-semibold py-6 rounded-xl text-lg"
                >
                  {submitOrder.isPending ? 'Processing...' : 'Place Order'}
                </Button>

                {submitOrder.isError && (
                  <p className="text-sm text-destructive text-center">
                    Failed to submit order. Please try again.
                  </p>
                )}
              </form>
            </div>

            {/* Order Summary & Payment */}
            <div className="space-y-6">
              {/* Order Summary */}
              <div className="bg-cream rounded-3xl p-8 shadow-lg">
                <h2 className="font-script text-3xl text-burgundy mb-6">Order Summary</h2>
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex items-center gap-4 pb-4 border-b border-brown/10">
                      <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center flex-shrink-0">
                        <img
                          src={item.product.imageUrl}
                          alt={item.product.name}
                          className="h-12 w-auto object-contain"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-brown">{item.product.name}</h3>
                        <p className="text-sm text-forest">{item.product.variant}</p>
                        <p className="text-sm text-brown/60">Qty: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-burgundy">₹{item.product.price * item.quantity}</p>
                      </div>
                    </div>
                  ))}

                  <div className="pt-4 space-y-2">
                    <div className="flex justify-between text-lg">
                      <span className="font-semibold text-brown">Subtotal:</span>
                      <span className="font-bold text-brown">₹{totalPrice}</span>
                    </div>
                    <div className="flex justify-between text-lg">
                      <span className="font-semibold text-brown">Shipping:</span>
                      <span className="font-bold text-forest">Free</span>
                    </div>
                    <div className="border-t border-brown/20 pt-4 mt-4">
                      <div className="flex justify-between text-2xl">
                        <span className="font-bold text-brown">Total:</span>
                        <span className="font-bold text-burgundy">₹{totalPrice}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* UPI Payment Section */}
              <div className="bg-white rounded-3xl p-8 shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <QrCode className="text-burgundy" size={32} />
                  <h2 className="font-script text-3xl text-burgundy">Payment via UPI</h2>
                </div>
                
                <div className="text-center space-y-4">
                  <div className="bg-kraft/30 rounded-2xl p-6">
                    <h3 className="text-2xl font-script text-burgundy mb-2">Mysore Food Labs</h3>
                    <p className="text-brown/80 text-sm mb-4">Scan the QR code below to pay via UPI</p>
                    
                    <div className="bg-white rounded-2xl p-4 inline-block shadow-md">
                      <img 
                        src="/assets/Screenshot_20260221_213147_GPay.jpg" 
                        alt="UPI Payment QR Code - Mysore Food Labs"
                        className="w-64 h-64 object-contain mx-auto"
                      />
                    </div>
                  </div>

                  <div className="bg-forest/10 rounded-xl p-4 text-left">
                    <h4 className="font-semibold text-forest mb-2">Payment Instructions:</h4>
                    <ol className="text-sm text-brown/80 space-y-1 list-decimal list-inside">
                      <li>Open any UPI app (Google Pay, PhonePe, Paytm, etc.)</li>
                      <li>Scan the QR code above</li>
                      <li>Enter the amount: ₹{totalPrice}</li>
                      <li>Complete the payment</li>
                      <li>After payment, click "Place Order" above to confirm</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
