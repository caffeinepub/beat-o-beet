import { useParams, useNavigate } from '@tanstack/react-router';
import { CheckCircle2, Package, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useOrder } from '@/hooks/useQueries';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function OrderConfirmationPage() {
  const { orderId } = useParams({ strict: false }) as { orderId: string };
  const navigate = useNavigate();
  const { data, isLoading, isError } = useOrder(orderId);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navigation />
        <main className="flex-1 flex items-center justify-center pt-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-burgundy mx-auto mb-4"></div>
            <p className="text-brown">Loading order details...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (isError || !data?.success || !data.order) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navigation />
        <main className="flex-1 flex items-center justify-center pt-20">
          <div className="text-center space-y-4 p-8">
            <h1 className="font-script text-4xl text-burgundy">Order Not Found</h1>
            <p className="text-brown/60">We couldn't find the order you're looking for</p>
            <Button
              onClick={() => navigate({ to: '/' })}
              className="bg-burgundy hover:bg-burgundy-dark text-cream"
            >
              Return to Home
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const order = data.order;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      <main className="flex-1 pt-28 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Success Message */}
          <div className="text-center mb-12 space-y-4">
            <div className="flex justify-center">
              <CheckCircle2 size={80} className="text-forest" />
            </div>
            <h1 className="font-script text-5xl text-burgundy">Order Confirmed!</h1>
            <p className="text-xl text-brown">Thank you for your order</p>
            <div className="bg-cream rounded-2xl px-6 py-4 inline-block">
              <p className="text-brown/60 text-sm">Order ID</p>
              <p className="font-mono text-2xl font-bold text-burgundy">{order.id}</p>
            </div>
          </div>

          {/* Order Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Customer Information */}
            <div className="bg-kraft rounded-3xl p-8 shadow-lg">
              <h2 className="font-script text-3xl text-burgundy mb-6 flex items-center gap-2">
                <Package size={28} />
                Shipping Details
              </h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-brown/60 uppercase tracking-wide">Name</p>
                  <p className="text-lg font-semibold text-brown">{order.customerName}</p>
                </div>
                <div>
                  <p className="text-sm text-brown/60 uppercase tracking-wide">Email</p>
                  <p className="text-lg font-semibold text-brown">{order.customerEmail}</p>
                </div>
                <div>
                  <p className="text-sm text-brown/60 uppercase tracking-wide">Shipping Address</p>
                  <p className="text-lg font-semibold text-brown whitespace-pre-line">
                    {order.shippingAddress}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-brown/60 uppercase tracking-wide">Status</p>
                  <span className="inline-block mt-1 px-4 py-2 bg-forest/20 text-forest font-semibold rounded-full text-sm">
                    {order.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-cream rounded-3xl p-8 shadow-lg">
              <h2 className="font-script text-3xl text-burgundy mb-6">Order Summary</h2>
              <div className="space-y-4">
                {order.items.map((item, index) => (
                  <div key={index} className="flex justify-between items-center pb-4 border-b border-brown/10">
                    <div>
                      <p className="font-semibold text-brown">Product #{index + 1}</p>
                      <p className="text-sm text-brown/60">Quantity: {Number(item.quantity)}</p>
                    </div>
                  </div>
                ))}

                <div className="pt-4 border-t border-brown/20">
                  <div className="flex justify-between text-2xl">
                    <span className="font-bold text-brown">Total:</span>
                    <span className="font-bold text-burgundy">₹{Number(order.totalAmount)}</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-4 bg-forest/10 rounded-xl">
                <p className="text-sm text-forest text-center">
                  We'll send you an email confirmation shortly with tracking details.
                </p>
              </div>
            </div>
          </div>

          {/* Return Home Button */}
          <div className="text-center mt-12">
            <Button
              onClick={() => navigate({ to: '/' })}
              className="bg-burgundy hover:bg-burgundy-dark text-cream font-semibold px-8 py-6 rounded-xl text-lg"
            >
              <Home size={20} className="mr-2" />
              Return to Home
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
