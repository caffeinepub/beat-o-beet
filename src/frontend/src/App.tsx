import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import ProductsSection from './components/ProductsSection';
import ProcessSection from './components/ProcessSection';
import HealthBenefitsSection from './components/HealthBenefitsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

function App() {
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

export default App;
