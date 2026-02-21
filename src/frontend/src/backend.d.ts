import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Inquiry {
    id: bigint;
    status: InquiryStatus;
    name: string;
    email: string;
    message: string;
    timestamp: bigint;
}
export interface Response {
    message: string;
    success: boolean;
}
export enum InquiryStatus {
    new_ = "new",
    closed = "closed",
    inProgress = "inProgress"
}
export interface backendInterface {
    getAllInquiries(): Promise<Array<Inquiry>>;
    getInquiriesByStatus(status: InquiryStatus): Promise<Array<Inquiry>>;
    getInquiryById(inquiryId: bigint): Promise<Inquiry>;
    submitInquiry(name: string, email: string, message: string): Promise<Response>;
    updateInquiryStatus(inquiryId: bigint, newStatus: InquiryStatus): Promise<Response>;
}
