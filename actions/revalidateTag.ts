"use server";

import { revalidatePath } from "next/cache";

export const customRevalidateTag = (tag?: string) => {
  revalidatePath("/");
};
