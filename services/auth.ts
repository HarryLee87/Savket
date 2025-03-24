"use server";

import db from "@/lib/prisma";
import { createClient } from "@/utils/supabase/server";
import { Provider } from "@supabase/supabase-js";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";

const getUser = async () => {
  // const session = await getSession();
  // if (session.id) {
  //     const user = await db.user.findUnique({
  //         where: {
  //             id: session.id
  //         }
  //     });
  //     if (user) {
  //         return user;
  //     }
  // }
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  console.log("🚀 ~ getUser ~ session:", session);
  if (!session) {
    notFound();
  }

  return session.user;
};

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

//TODO: required to register a business number for kakao biz app in order to receive account_email
// const signWithKakao = async () => {
//   const supabase = await createClient();

//   const origin_url = (await headers()).get("origin");

//   const { data, error } = await supabase.auth.signInWithOAuth({
//     provider: "kakao",
//     options: {
//       scopes: "profile_nickname profile_image",
//       redirectTo: `${origin_url}/auth/callback`,
//     },
//   });

//   if (error) {
//     console.error("Error fetching user data:", error.message);
//     redirect("/error");
//   }

//   if (data.url) {
//     redirect(data.url);
//   }
// };

const signInWithGoogle = signInWithSupabaseOAuth("google");

export { signInWithGoogle, getUser };
