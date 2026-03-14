import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://jxlantblbvfqpuurfvqv.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_BpHZ3WRmu1ILBtsMG9247g_M8DZM3Le";

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
