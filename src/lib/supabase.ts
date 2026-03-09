import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://tduyphhhmyvqdjehozdn.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_ANON_SUPABASE_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRkdXlwaGhobXl2cWRqZWhvemRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI1OTQ3NTQsImV4cCI6MjA4ODE3MDc1NH0.2NqtKIQ9-dWwod23_n4Aea4xchI58ZL2-n34MBb5O_s";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
