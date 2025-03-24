"use server";

import { createClient } from "@/utils/supabase/server";
import { Provider } from "@supabase/supabase-js";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const signInWithSupabaseOAuth = (provider: Provider) => async () => {
  const supabase = await createClient();

  const origin_url = (await headers()).get("origin");

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${origin_url}/auth/callback`,
    },
  });

  if (error) {
    console.error("Error fetching user data:", error.message);
    redirect("/error");
  }

  if (data.url) {
    redirect(data.url);
  }
};

const signInWithGoogle = signInWithSupabaseOAuth("google");

export { signInWithGoogle };
