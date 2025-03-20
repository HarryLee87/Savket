import prisma from "@/lib/prisma";

async function test() {
  const user = await prisma.user.findMany({
    where: {
      username: {
        contains: "est",
      },
    },
  });
  console.log(user);
}

test();
