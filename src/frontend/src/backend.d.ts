import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Product {
    id: string;
    inStock: boolean;
    name: string;
    description: string;
    imageUrl: string;
    benefits: Array<string>;
    price: bigint;
    variant: string;
}
export interface ProductListResponse {
    success: boolean;
    products: Array<Product>;
}
export interface ContactSubmissionListResponse {
    submissions: Array<ContactSubmission>;
    success: boolean;
}
export interface ContactFormResponse {
    message: string;
    success: boolean;
    submissionId?: string;
}
export interface ProductResponse {
    success: boolean;
    product?: Product;
}
export interface ContactSubmission {
    id: string;
    customerName: string;
    submittedAt: bigint;
    message?: string;
    address: string;
    customerEmail: string;
}
export interface OrderResponse {
    orderId?: string;
    message: string;
    success: boolean;
}
export interface CartItem {
    productId: string;
    addedAt: bigint;
    quantity: bigint;
}
export interface Order {
    id: string;
    customerName: string;
    status: OrderStatus;
    createdAt: bigint;
    updatedAt: bigint;
    totalAmount: bigint;
    shippingAddress: string;
    items: Array<CartItem>;
    customerEmail: string;
}
export interface OrderListResponse {
    orders: Array<Order>;
    success: boolean;
}
export interface OrderStatusResponse {
    order?: Order;
    message: string;
    success: boolean;
}
export enum OrderStatus {
    shipped = "shipped",
    cancelled = "cancelled",
    pending = "pending",
    delivered = "delivered",
    processing = "processing"
}
export interface backendInterface {
    addProduct(id: string, name: string, variant: string, price: bigint, description: string, benefits: Array<string>, imageUrl: string, inStock: boolean): Promise<ProductResponse>;
    getAllContactSubmissions(): Promise<ContactSubmissionListResponse>;
    getOrderById(orderId: string): Promise<OrderStatusResponse>;
    getOrdersByStatus(status: OrderStatus): Promise<OrderListResponse>;
    getProductById(productId: string): Promise<ProductResponse>;
    getProducts(): Promise<ProductListResponse>;
    submitContactForm(customerName: string, customerEmail: string, address: string, message: string | null): Promise<ContactFormResponse>;
    submitOrder(items: Array<CartItem>, customerName: string, customerEmail: string, shippingAddress: string): Promise<OrderResponse>;
    updateOrderStatus(orderId: string, newStatus: OrderStatus): Promise<OrderStatusResponse>;
}
