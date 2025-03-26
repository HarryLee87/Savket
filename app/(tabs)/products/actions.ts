"use server";

import db from "@/lib/prisma";

export async function getMoreProducts(page: number) {
  const products = await db.product.findMany({
    select: {
      title: true,
      price: true,
      created_at: true,
      photo: true,
      id: true,
    },
    skip: page * 3,
    take: 3,
    orderBy: {
      created_at: "desc",
    },
  });
  return products;
}
