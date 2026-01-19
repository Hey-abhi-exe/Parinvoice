export interface User {
    id: string;
    email: string;
    name?: string;
    companyName?: string;
}

export interface Client {
    id: string;
    userId: string;
    name: string;
    email: string;
    address?: string;
}

export interface Product {
    id: string;
    userId: string;
    name: string;
    description: string;
    price: number;
}

export interface Invoice {
    id: string;
    userId: string;
    clientId: string;
    client?: Client;
    date: string;
    dueDate?: string;
    status: 'DRAFT' | 'SENT' | 'PAID';
    items: InvoiceItem[];
    subtotal?: number;
    taxRate?: number;
    taxAmount?: number;
    discount?: number;
    total: number;
    createdAt: string;
}

export interface InvoiceItem {
    id?: string;
    productId?: string;
    description: string;
    quantity: number;
    price: number;
    total?: number;
}
