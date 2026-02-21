import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useSubmitInquiry } from '../hooks/useQueries';
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const submitInquiry = useSubmitInquiry();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    submitInquiry.mutate(formData, {
      onSuccess: () => {
        setFormData({ name: '', email: '', message: '' });
      }
    });
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

          {/* Form */}
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
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
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-brown font-medium">
                  Your Message *
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className="border-2 border-kraft focus:border-burgundy rounded-xl resize-none"
                  placeholder="Tell us about your inquiry..."
                />
              </div>

              {/* Status Messages */}
              {submitInquiry.isSuccess && (
                <div className="bg-forest/10 border-2 border-forest rounded-xl p-4 flex items-start space-x-3">
                  <CheckCircle className="text-forest flex-shrink-0 mt-0.5" size={20} />
                  <div>
                    <p className="text-forest font-medium">Thank you for your inquiry!</p>
                    <p className="text-forest/80 text-sm">
                      We've received your message and will get back to you soon.
                    </p>
                  </div>
                </div>
              )}

              {submitInquiry.isError && (
                <div className="bg-destructive/10 border-2 border-destructive rounded-xl p-4 flex items-start space-x-3">
                  <AlertCircle className="text-destructive flex-shrink-0 mt-0.5" size={20} />
                  <div>
                    <p className="text-destructive font-medium">Oops! Something went wrong.</p>
                    <p className="text-destructive/80 text-sm">
                      Please try again or contact us directly.
                    </p>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={submitInquiry.isPending}
                className="w-full bg-burgundy hover:bg-burgundy-dark text-cream font-semibold py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {submitInquiry.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Sending...
                  </>
                ) : (
                  'Send Message'
                )}
              </Button>
            </form>
          </div>

          {/* Additional Contact Info */}
          <div className="mt-12 text-center space-y-4">
            <h3 className="text-2xl font-script text-burgundy">Where to Find Us</h3>
            <p className="text-brown/80">
              Available at select health food stores and organic markets. Contact us for retail
              locations near you.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
