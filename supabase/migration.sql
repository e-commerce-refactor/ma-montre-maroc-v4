-- =========================================================================
-- COMPLETE SUPABASE SCHEMA & RLS DEFINITIONS FOR SHOPIFY MODERNIZATION
-- Lead ID: Ma_Montre_Maroc | Slug: ma-montre-maroc
-- =========================================================================

-- 1. Orders table
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lead_id TEXT NOT NULL,
    product_name TEXT NOT NULL,
    product_price NUMERIC(10, 2) NOT NULL,
    shipping_fee NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
    total_amount NUMERIC(10, 2) NOT NULL,
    customer_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    city TEXT NOT NULL,
    address TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending',
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Backward compatibility columns
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'orders' AND column_name = 'lead_id') THEN
        ALTER TABLE public.orders ADD COLUMN lead_id TEXT DEFAULT 'Ma_Montre_Maroc';
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'orders' AND column_name = 'product_name') THEN
        ALTER TABLE public.orders ADD COLUMN product_name TEXT DEFAULT '';
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'orders' AND column_name = 'product_price') THEN
        ALTER TABLE public.orders ADD COLUMN product_price NUMERIC(10, 2) DEFAULT 0;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'orders' AND column_name = 'shipping_fee') THEN
        ALTER TABLE public.orders ADD COLUMN shipping_fee NUMERIC(10, 2) DEFAULT 0;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'orders' AND column_name = 'total_amount') THEN
        ALTER TABLE public.orders ADD COLUMN total_amount NUMERIC(10, 2) DEFAULT 0;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'orders' AND column_name = 'notes') THEN
        ALTER TABLE public.orders ADD COLUMN notes TEXT DEFAULT '';
    END IF;
END $$;

-- 2. Products table (Dynamic catalog management by Admin)
CREATE TABLE IF NOT EXISTS public.products (
    id TEXT PRIMARY KEY,
    lead_id TEXT NOT NULL,
    name TEXT NOT NULL,
    price_mad NUMERIC(10, 2) NOT NULL,
    original_price_mad NUMERIC(10, 2),
    category TEXT DEFAULT 'Collection',
    image_url TEXT NOT NULL,
    badge TEXT,
    in_stock BOOLEAN NOT NULL DEFAULT true,
    rating NUMERIC(3, 2) DEFAULT 5.0,
    reviews_count INT DEFAULT 0,
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. Reviews table (Customer feedback & testimonials)
CREATE TABLE IF NOT EXISTS public.reviews (
    id TEXT PRIMARY KEY,
    lead_id TEXT NOT NULL,
    author TEXT NOT NULL,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT NOT NULL,
    city TEXT DEFAULT 'Casablanca',
    product_name TEXT DEFAULT '',
    status TEXT NOT NULL DEFAULT 'approved',
    verified_buyer BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. Store Settings table
CREATE TABLE IF NOT EXISTS public.store_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lead_id TEXT UNIQUE NOT NULL,
    brand_name TEXT NOT NULL,
    whatsapp_number TEXT DEFAULT '+212600000000',
    contact_email TEXT DEFAULT '',
    shipping_fee NUMERIC(10, 2) DEFAULT 0.00,
    free_shipping_threshold NUMERIC(10, 2) DEFAULT 400.00,
    currency_symbol TEXT DEFAULT 'DH',
    announcement_text TEXT DEFAULT 'Livraison Gratuite & Paiement à la Livraison partout au Maroc',
    announcement_enabled BOOLEAN DEFAULT true,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. Admin Users table (Username-to-email routing & Admin permissions)
CREATE TABLE IF NOT EXISTS public.admin_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lead_id TEXT NOT NULL,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    role TEXT NOT NULL DEFAULT 'admin',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable Row Level Security (RLS) on all tables
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.store_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Orders policies: anon can INSERT only; authenticated has full management access
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'orders' AND policyname = 'Allow public order placement') THEN
        CREATE POLICY "Allow public order placement" ON public.orders FOR INSERT TO anon WITH CHECK (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'orders' AND policyname = 'Allow authenticated order management') THEN
        CREATE POLICY "Allow authenticated order management" ON public.orders FOR ALL TO authenticated USING (true) WITH CHECK (true);
    END IF;
    IF EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'orders' AND policyname = 'Allow anon read orders') THEN
        DROP POLICY "Allow anon read orders" ON public.orders;
    END IF;
END $$;

-- Products policies: anon can SELECT active products; authenticated can manage all
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'products' AND policyname = 'Allow public read products') THEN
        CREATE POLICY "Allow public read products" ON public.products FOR SELECT TO anon USING (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'products' AND policyname = 'Allow authenticated product management') THEN
        CREATE POLICY "Allow authenticated product management" ON public.products FOR ALL TO authenticated USING (true) WITH CHECK (true);
    END IF;
END $$;

-- Reviews policies: anon can SELECT approved reviews; anon can INSERT pending review; authenticated full access
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'reviews' AND policyname = 'Allow public read approved reviews') THEN
        CREATE POLICY "Allow public read approved reviews" ON public.reviews FOR SELECT TO anon USING (status = 'approved');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'reviews' AND policyname = 'Allow public submit review') THEN
        CREATE POLICY "Allow public submit review" ON public.reviews FOR INSERT TO anon WITH CHECK (status = 'pending');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'reviews' AND policyname = 'Allow authenticated review management') THEN
        CREATE POLICY "Allow authenticated review management" ON public.reviews FOR ALL TO authenticated USING (true) WITH CHECK (true);
    END IF;
END $$;

-- Store settings policies: anon can read; authenticated can manage
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'store_settings' AND policyname = 'Allow public read settings') THEN
        CREATE POLICY "Allow public read settings" ON public.store_settings FOR SELECT TO anon USING (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'store_settings' AND policyname = 'Allow authenticated settings management') THEN
        CREATE POLICY "Allow authenticated settings management" ON public.store_settings FOR ALL TO authenticated USING (true) WITH CHECK (true);
    END IF;
END $$;

-- Admin users lookup policies: anon can query username -> email for auth routing
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'admin_users' AND policyname = 'Allow anon username lookup') THEN
        CREATE POLICY "Allow anon username lookup" ON public.admin_users FOR SELECT TO anon USING (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'admin_users' AND policyname = 'Allow authenticated admin management') THEN
        CREATE POLICY "Allow authenticated admin management" ON public.admin_users FOR ALL TO authenticated USING (true) WITH CHECK (true);
    END IF;
END $$;

-- Seed default admin user for this lead
INSERT INTO public.admin_users (lead_id, username, email, role)
VALUES ('Ma_Montre_Maroc', 'admin', 'admin@ma-montre-maroc.ma', 'admin')
ON CONFLICT (username) DO UPDATE SET email = EXCLUDED.email;

-- Seed default store settings
INSERT INTO public.store_settings (lead_id, brand_name, whatsapp_number, contact_email, shipping_fee, free_shipping_threshold)
VALUES ('Ma_Montre_Maroc', 'Ma Montre Maroc', '+212600000000', 'contact@ma-montre-maroc.ma', 0.00, 400.00)
ON CONFLICT (lead_id) DO NOTHING;
