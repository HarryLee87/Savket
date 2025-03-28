import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

interface SessionContent {
  id?: string;
}

export default async function getSession() {
  return getIronSession<SessionContent>(await cookies(), {
    cookieName: "savket_cookie",
    password: process.env.SECRET_COOKIE_PASSWORD!,
  });
}
