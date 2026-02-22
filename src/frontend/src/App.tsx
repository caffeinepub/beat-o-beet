import { RouterProvider, createRouter, createRootRoute, createRoute } from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CartProvider } from './contexts/CartContext';
import { Toaster } from '@/components/ui/sonner';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import ProductsSection from './components/ProductsSection';
import ProcessSection from './components/ProcessSection';
import HealthBenefitsSection from './components/HealthBenefitsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import AdminProductsPage from './pages/AdminProductsPage';

const queryClient = new QueryClient();

function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <section id="home">
          <HeroSection />
        </section>
        <section id="products">
          <ProductsSection />
        </section>
        <section id="about">
          <ProcessSection />
        </section>
        <section id="benefits">
          <HealthBenefitsSection />
        </section>
        <section id="contact">
          <ContactSection />
        </section>
      </main>
      <Footer />
    </div>
  );
}

const rootRoute = createRootRoute();

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
});

const checkoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/checkout',
  component: CheckoutPage,
});

const orderRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/order/$orderId',
  component: OrderConfirmationPage,
});

const adminDashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/dashboard',
  component: AdminDashboardPage,
});

const adminProductsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/products',
  component: AdminProductsPage,
});

const routeTree = rootRoute.addChildren([indexRoute, checkoutRoute, orderRoute, adminDashboardRoute, adminProductsRoute]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <RouterProvider router={router} />
        <Toaster 
          position="top-center"
          toastOptions={{
            style: {
              background: 'oklch(0.92 0.02 60)',
              color: 'oklch(0.35 0.05 30)',
              border: '2px solid oklch(0.45 0.15 15)',
              borderRadius: '1rem',
              fontFamily: 'inherit',
            },
          }}
        />
      </CartProvider>
    </QueryClientProvider>
  );
}

export default App;
