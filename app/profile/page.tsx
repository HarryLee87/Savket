// import db from "@/lib/prisma";
import { createClient } from "@/utils/supabase/server";
// import getSession from "@/lib/session";
import { notFound, redirect } from "next/navigation";

async function getUser() {
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
    const supabase = await createClient()
    const session = await supabase.auth.getSession()
    if (session) {
        return session
    }

    notFound();
}

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
                {user?.data.session?.user.user_metadata.display_name}
            </h1>
            <form action={logOut}>
                <button>Logout</button>
            </form>
        </div>
    )
}