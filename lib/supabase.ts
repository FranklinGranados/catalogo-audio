import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;//el signo de exclamación al final de la variable indica que estamos seguros de que la variable no es nula o indefinida, lo que permite a TypeScript omitir la verificación de nulidad.
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

//los comentarios los escribo pero visual predice asique solo lo escribo y visual termina el comentario.