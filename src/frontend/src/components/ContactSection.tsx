import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { CheckCircle, Mail, Phone, MapPin, AlertCircle } from 'lucide-react';
import { useSubmitContactForm } from '@/hooks/useQueries';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    message: ''
  });
  const [showSuccess, setShowSuccess] = useState(false);
  
  const submitContactForm = useSubmitContactForm();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const result = await submitContactForm.mutateAsync({
        customerName: formData.name,
        customerEmail: formData.email,
        address: formData.address,
        message: formData.message || undefined
      });

      if (result.success) {
        // Show success message and reset form
        setShowSuccess(true);
        setFormData({ name: '', email: '', address: '', message: '' });
        
        setTimeout(() => {
          setShowSuccess(false);
        }, 5000);
      }
    } catch (error) {
      console.error('Contact form submission failed:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="bg-kraft py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 space-y-4">
            <h2 className="font-script text-5xl md:text-6xl text-burgundy">Get In Touch</h2>
            <p className="text-xl text-brown/80">
              Interested in wholesale orders, retail partnerships, or have questions? We'd love to
              hear from you.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Information */}
            <div className="space-y-6">
              <div className="bg-white rounded-3xl p-8 shadow-xl">
                <h3 className="text-2xl font-script text-burgundy mb-6">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <Mail className="text-burgundy flex-shrink-0 mt-1" size={24} />
                    <div>
                      <p className="font-semibold text-brown">Email</p>
                      <a
                        href="mailto:info@beatobeet.com"
                        className="text-forest hover:text-burgundy transition-colors"
                      >
                        info@beatobeet.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <Phone className="text-burgundy flex-shrink-0 mt-1" size={24} />
                    <div>
                      <p className="font-semibold text-brown">Phone</p>
                      <a
                        href="tel:+919876543210"
                        className="text-forest hover:text-burgundy transition-colors"
                      >
                        +91 98765 43210
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <MapPin className="text-burgundy flex-shrink-0 mt-1" size={24} />
                    <div>
                      <p className="font-semibold text-brown">Location</p>
                      <p className="text-brown/80">
                        Available at select health food stores and organic markets
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-cream rounded-3xl p-8 shadow-lg">
                <h3 className="text-xl font-script text-burgundy mb-4">Business Hours</h3>
                <div className="space-y-2 text-brown/80">
                  <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                  <p>Saturday: 10:00 AM - 4:00 PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="bg-white rounded-3xl p-8 shadow-xl">
              <h3 className="text-2xl font-script text-burgundy mb-6">Send us a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-brown font-medium">
                    Your Name *
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="border-2 border-kraft focus:border-burgundy rounded-xl"
                    placeholder="John Doe"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-brown font-medium">
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="border-2 border-kraft focus:border-burgundy rounded-xl"
                    placeholder="john@example.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address" className="text-brown font-medium">
                    Address *
                  </Label>
                  <Input
                    id="address"
                    name="address"
                    type="text"
                    required
                    value={formData.address}
                    onChange={handleChange}
                    className="border-2 border-kraft focus:border-burgundy rounded-xl"
                    placeholder="Your address"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-brown font-medium">
                    Your Message
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="border-2 border-kraft focus:border-burgundy rounded-xl resize-none"
                    placeholder="Tell us about your inquiry..."
                  />
                </div>

                {/* Status Messages */}
                {showSuccess && (
                  <div className="bg-forest/10 border-2 border-forest rounded-xl p-4 flex items-start space-x-3">
                    <CheckCircle className="text-forest flex-shrink-0 mt-0.5" size={20} />
                    <div>
                      <p className="text-forest font-medium">Message sent successfully!</p>
                      <p className="text-forest/80 text-sm">
                        We'll get back to you as soon as possible.
                      </p>
                    </div>
                  </div>
                )}

                {submitContactForm.isError && (
                  <div className="bg-destructive/10 border-2 border-destructive rounded-xl p-4 flex items-start space-x-3">
                    <AlertCircle className="text-destructive flex-shrink-0 mt-0.5" size={20} />
                    <div>
                      <p className="text-destructive font-medium">Failed to send message</p>
                      <p className="text-destructive/80 text-sm">
                        Please try again later.
                      </p>
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={submitContactForm.isPending}
                  className="w-full bg-burgundy hover:bg-burgundy-dark text-cream font-semibold py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {submitContactForm.isPending ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
