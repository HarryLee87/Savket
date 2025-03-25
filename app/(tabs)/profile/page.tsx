// import db from "@/lib/prisma";
import { getUser } from "@/services/auth";
import { createClient } from "@/utils/supabase/server";
// import getSession from "@/lib/session";
import { notFound, redirect } from "next/navigation";

export default async function Profile() {
    const user = await getUser();
    console.log("🚀 ~ Profile ~ user:", user)
    const logOut = async () => {
        "use server";
        const supabase = await createClient()
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error("Error during sign out:", error.message);
        }
        // const session = await getSession();
        // session.destroy();
        redirect("/")
    }

    return (
        <div>
            <h1>Welcome,
                {user?.user_metadata.username ?? user.user_metadata.name}
            </h1>
            <form action={logOut}>
                <button>Logout</button>
            </form>
        </div>
    )
}

// export async function middleware(request: NextRequest) {
//     const session = await getSession();
//     const exists = publicOnlyUrls[request.nextUrl.pathname];
//     if (!session.id) {
//         if (!exists) {
//             return NextResponse.redirect(new URL("/", request.url));
//         }
//     } else {
//         if (exists) {
//             return NextResponse.redirect(new URL("/products", request.url));
//         }
//     }
// }