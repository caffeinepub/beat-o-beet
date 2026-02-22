import { useState } from 'react';
import { useProducts, useDeleteProduct } from '@/hooks/useQueries';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ProductEditModal from '@/components/ProductEditModal';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Loader2, AlertCircle, Edit, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import type { Product } from '../backend';

export default function AdminProductsPage() {
  const { data, isLoading, isError } = useProducts();
  const deleteProduct = useDeleteProduct();
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const handleDelete = async (productId: string, productName: string) => {
    if (!confirm(`Are you sure you want to delete "${productName}"?`)) {
      return;
    }

    try {
      const result = await deleteProduct.mutateAsync(productId);
      if (result.success) {
        toast.success('Product deleted successfully!');
      } else {
        toast.error(result.message || 'Failed to delete product');
      }
    } catch (error) {
      toast.error('Error deleting product');
      console.error('Delete error:', error);
    }
  };

  const formatPrice = (priceInCents: bigint) => {
    return `₹${Number(priceInCents) / 100}`;
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      <main className="flex-1 pt-28 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="font-script text-5xl text-burgundy mb-2">Product Management</h1>
              <p className="text-brown/80 text-lg">Manage product images, pricing, and details</p>
            </div>

            {isLoading && (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-burgundy" />
                <span className="ml-3 text-brown">Loading products...</span>
              </div>
            )}

            {isError && (
              <div className="bg-destructive/10 border-2 border-destructive rounded-2xl p-8 flex items-start space-x-4">
                <AlertCircle className="text-destructive flex-shrink-0 mt-1" size={24} />
                <div>
                  <h3 className="text-destructive font-semibold text-lg mb-1">Error Loading Data</h3>
                  <p className="text-destructive/80">
                    Failed to load products. Please try refreshing the page.
                  </p>
                </div>
              </div>
            )}

            {!isLoading && !isError && data && (
              <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
                <div className="p-6 bg-kraft border-b border-brown/10">
                  <h2 className="font-script text-2xl text-burgundy">
                    Total Products: {data.products.length}
                  </h2>
                </div>

                {data.products.length === 0 ? (
                  <div className="p-12 text-center">
                    <p className="text-brown/60 text-lg">No products available.</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-kraft/50 hover:bg-kraft/70">
                          <TableHead className="font-semibold">Image</TableHead>
                          <TableHead className="font-semibold">Name</TableHead>
                          <TableHead className="font-semibold">Variant</TableHead>
                          <TableHead className="font-semibold">Price</TableHead>
                          <TableHead className="font-semibold">Description</TableHead>
                          <TableHead className="font-semibold">Stock</TableHead>
                          <TableHead className="font-semibold text-center">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {data.products.map((product) => (
                          <TableRow key={product.id} className="hover:bg-kraft/20">
                            <TableCell>
                              <img
                                src={product.imageUrl}
                                alt={product.name}
                                className="h-16 w-16 object-contain rounded-lg bg-white border border-brown/10"
                              />
                            </TableCell>
                            <TableCell className="font-medium text-brown">
                              {product.name}
                            </TableCell>
                            <TableCell className="text-brown/80">{product.variant}</TableCell>
                            <TableCell className="font-semibold text-burgundy">
                              {formatPrice(product.price)}
                            </TableCell>
                            <TableCell className="max-w-xs truncate text-brown/70">
                              {product.description}
                            </TableCell>
                            <TableCell>
                              <span
                                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                  product.inStock
                                    ? 'bg-forest/20 text-forest'
                                    : 'bg-destructive/20 text-destructive'
                                }`}
                              >
                                {product.inStock ? 'In Stock' : 'Out of Stock'}
                              </span>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center justify-center gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => setEditingProduct(product)}
                                  className="hover:bg-burgundy/10 hover:text-burgundy border-burgundy/30"
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleDelete(product.id, product.name)}
                                  disabled={deleteProduct.isPending}
                                  className="hover:bg-destructive/10 hover:text-destructive border-destructive/30"
                                >
                                  {deleteProduct.isPending ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                  ) : (
                                    <Trash2 className="h-4 w-4" />
                                  )}
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />

      {editingProduct && (
        <ProductEditModal
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
        />
      )}
    </div>
  );
}
