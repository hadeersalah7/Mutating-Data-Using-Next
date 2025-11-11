"use server";
import { uploadImage } from "@/lib/cloudinary";
import { storePost } from "@/lib/posts";
import { redirect } from "next/navigation";

export const formServerAction = async (prevState: {}, formData: FormData) => {
    const title = formData.get("title") as string;
    const image = formData.get("image");
    const content = formData.get("content") as string;

    let errors: string[] = [];

    if (!title || title.trim().length === 0) {
        errors.push("Title is required.");
    }

    if (!content || content.trim().length === 0) {
        errors.push("Content is required.");
    }

    if (!image || !(image instanceof File) || image.size === 0) {
        errors.push("Image is required.");
    }

    if (errors.length > 0) {
        return { errors };
    }

    let imageUrl: string;
    try {
        imageUrl = await uploadImage(image);
    } catch (error) {
        throw new Error("Failed To Load Image. Please Try Again Later");
    }

    await storePost({
        imageUrl: imageUrl,
        title,
        content,
        userId: 1,
    });
    redirect("/feed");
};
