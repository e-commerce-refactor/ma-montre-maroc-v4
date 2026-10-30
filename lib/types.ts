export interface Order {
  id: string;
  lead_id: string;
  product_name: string;
  product_price: number;
  shipping_fee: number;
  total_amount: number;
  customer_name: string;
  phone: string;
  city: string;
  address: string;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  notes?: string;
  created_at?: string;
}

export interface OrderPayload {
  lead_id: string;
  product_name: string;
  product_price: number;
  shipping_fee: number;
  total_amount: number;
  customer_name: string;
  phone: string;
  city: string;
  address: string;
  status: 'pending' | 'confirmed' | 'delivered';
}

export interface Product {
  id: string;
  lead_id: string;
  name: string;
  price_mad: number;
  original_price_mad?: number;
  category: string;
  image_url: string;
  badge?: string;
  in_stock: boolean;
  rating: number;
  reviews_count: number;
  description?: string;
  created_at?: string;
}

export interface Review {
  id: string;
  lead_id: string;
  author: string;
  rating: number;
  comment: string;
  city: string;
  product_name?: string;
  status: 'pending' | 'approved' | 'rejected';
  verified_buyer: boolean;
  created_at: string;
}

export interface StoreSettings {
  id?: string;
  lead_id: string;
  brand_name: string;
  whatsapp_number: string;
  contact_email: string;
  shipping_fee: number;
  free_shipping_threshold: number;
  currency_symbol: string;
  announcement_text: string;
  announcement_enabled: boolean;
  updated_at?: string;
}

export interface AdminUser {
  id: string;
  lead_id: string;
  username: string;
  email: string;
  role: 'admin' | 'manager';
  created_at?: string;
}
