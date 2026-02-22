import { useState } from 'react';
import { useUpdateProduct } from '@/hooks/useQueries';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Loader2, Plus, X } from 'lucide-react';
import { toast } from 'sonner';
import type { Product } from '../backend';

interface ProductEditModalProps {
  product: Product;
  onClose: () => void;
}

export default function ProductEditModal({ product, onClose }: ProductEditModalProps) {
  const updateProduct = useUpdateProduct();
  const [formData, setFormData] = useState({
    name: product.name,
    variant: product.variant,
    price: Number(product.price) / 100, // Convert cents to INR
    description: product.description,
    benefits: [...product.benefits],
    imageUrl: product.imageUrl,
    inStock: product.inStock,
  });
  const [newBenefit, setNewBenefit] = useState('');
  const [imagePreview, setImagePreview] = useState<string>(product.imageUrl);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.match(/^image\/(png|jpeg|jpg|webp)$/)) {
        toast.error('Please select a valid image file (PNG, JPG, or WEBP)');
        return;
      }

      setIsProcessing(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUrl = reader.result as string;
        setImagePreview(dataUrl);
        setFormData({
          ...formData,
          imageUrl: dataUrl,
        });
        setIsProcessing(false);
      };
      reader.onerror = () => {
        toast.error('Error reading image file');
        setIsProcessing(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUrlChange = (url: string) => {
    setFormData({
      ...formData,
      imageUrl: url,
    });
    setImagePreview(url);
  };

  const handleAddBenefit = () => {
    if (newBenefit.trim()) {
      setFormData({
        ...formData,
        benefits: [...formData.benefits, newBenefit.trim()],
      });
      setNewBenefit('');
    }
  };

  const handleRemoveBenefit = (index: number) => {
    setFormData({
      ...formData,
      benefits: formData.benefits.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.variant.trim() || !formData.description.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (formData.price <= 0) {
      toast.error('Price must be greater than 0');
      return;
    }

    if (formData.benefits.length === 0) {
      toast.error('Please add at least one benefit');
      return;
    }

    if (!formData.imageUrl.trim()) {
      toast.error('Please provide a product image');
      return;
    }

    try {
      const priceInCents = BigInt(Math.round(formData.price * 100));

      const result = await updateProduct.mutateAsync({
        id: product.id,
        name: formData.name,
        variant: formData.variant,
        price: priceInCents,
        description: formData.description,
        benefits: formData.benefits,
        imageUrl: formData.imageUrl,
        inStock: formData.inStock,
      });

      if (result.success) {
        toast.success('Product updated successfully!');
        onClose();
      } else {
        toast.error(result.message || 'Failed to update product');
      }
    } catch (error) {
      toast.error('Error updating product');
      console.error('Update error:', error);
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-cream">
        <DialogHeader>
          <DialogTitle className="font-script text-3xl text-burgundy">
            Edit Product
          </DialogTitle>
          <DialogDescription className="text-brown/70">
            Update product details, pricing, and images
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image Upload */}
          <div className="space-y-2">
            <Label className="text-brown font-semibold">
              Product Image *
            </Label>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <img
                  src={imagePreview}
                  alt="Product preview"
                  className="h-32 w-32 object-contain rounded-lg bg-white border-2 border-brown/10"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/assets/generated/beetroot-pure-bottle.dim_400x600.png';
                  }}
                />
              </div>
              <div className="flex-1 space-y-3">
                <div>
                  <Label htmlFor="imageFile" className="text-sm text-brown/80">
                    Upload Image File
                  </Label>
                  <Input
                    id="imageFile"
                    type="file"
                    accept="image/png,image/jpeg,image/jpg,image/webp"
                    onChange={handleImageChange}
                    className="bg-white border-brown/20"
                    disabled={isProcessing}
                  />
                  <p className="text-xs text-brown/60 mt-1">
                    Accepted formats: PNG, JPG, WEBP
                  </p>
                </div>
                <div>
                  <Label htmlFor="imageUrl" className="text-sm text-brown/80">
                    Or Enter Image URL
                  </Label>
                  <Input
                    id="imageUrl"
                    type="text"
                    value={formData.imageUrl}
                    onChange={(e) => handleImageUrlChange(e.target.value)}
                    placeholder="/assets/generated/product-image.png"
                    className="bg-white border-brown/20"
                    disabled={isProcessing}
                  />
                  <p className="text-xs text-brown/60 mt-1">
                    Use /assets/... for static images
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-brown font-semibold">
              Product Name *
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="bg-white border-brown/20"
              required
            />
          </div>

          {/* Variant */}
          <div className="space-y-2">
            <Label htmlFor="variant" className="text-brown font-semibold">
              Variant *
            </Label>
            <Input
              id="variant"
              value={formData.variant}
              onChange={(e) => setFormData({ ...formData, variant: e.target.value })}
              className="bg-white border-brown/20"
              required
            />
          </div>

          {/* Price */}
          <div className="space-y-2">
            <Label htmlFor="price" className="text-brown font-semibold">
              Price (₹) *
            </Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              min="0"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
              className="bg-white border-brown/20"
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-brown font-semibold">
              Description *
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="bg-white border-brown/20 min-h-[100px]"
              required
            />
          </div>

          {/* Benefits */}
          <div className="space-y-2">
            <Label className="text-brown font-semibold">Benefits *</Label>
            <div className="space-y-2">
              {formData.benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="flex-1 bg-white border border-brown/20 rounded-lg px-3 py-2 text-sm text-brown">
                    {benefit}
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleRemoveBenefit(index)}
                    className="hover:bg-destructive/10 hover:text-destructive border-destructive/30"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <div className="flex gap-2">
                <Input
                  value={newBenefit}
                  onChange={(e) => setNewBenefit(e.target.value)}
                  placeholder="Add a new benefit"
                  className="bg-white border-brown/20"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddBenefit();
                    }
                  }}
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleAddBenefit}
                  className="hover:bg-burgundy/10 hover:text-burgundy border-burgundy/30"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Stock Status */}
          <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-brown/20">
            <div>
              <Label htmlFor="inStock" className="text-brown font-semibold">
                In Stock
              </Label>
              <p className="text-sm text-brown/60">
                Toggle product availability
              </p>
            </div>
            <Switch
              id="inStock"
              checked={formData.inStock}
              onCheckedChange={(checked) => setFormData({ ...formData, inStock: checked })}
            />
          </div>

          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="border-brown/30 hover:bg-brown/10"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={updateProduct.isPending || isProcessing}
              className="bg-burgundy hover:bg-burgundy-dark text-cream"
            >
              {updateProduct.isPending || isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                'Save Changes'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
