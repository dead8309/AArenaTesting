"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { State } from "../domain/common/state";
import { communityPostSchema } from "./schema/community-post-schema";
import { ValidationError } from "yup";

export const postLikeAction = async (formData: FormData) => {
  try {
    const postId = formData.get("postId");

    if (!postId) {
      throw new Error("postId is required");
    }

    const session = await getServerSession(authOptions);
    if (!session) {
      throw new Error("Unauthorized");
    }

    const exisitngLike = await db.postLike.findFirst({
      where: {
        postId: postId as string,
        userId: session.user.id,
      },
    });

    // If the user has already liked the post, remove the like
    if (exisitngLike) {
      await db.postLike.delete({
        where: {
          id: exisitngLike.id,
        },
      });
      revalidatePath("/community");
      return;
    }
    await db.postLike.create({
      data: {
        post: {
          connect: {
            id: postId as string,
          },
        },
        user: {
          connect: {
            id: session.user.id,
          },
        },
      },
    });
    revalidatePath("/community");
  } catch (error) {
    console.error(error);
  }
};

export const createCommunityPostAction = async (
  prevState: State | null,
  formData: FormData
): Promise<State> => {
  try {
    const rawdata = Object.fromEntries(formData.entries());
    const { title, content, tags } = await communityPostSchema.validate(
      rawdata
    );

    const session = await getServerSession(authOptions);
    if (!session) {
      return {
        status: "error",
        message: "Unauthorized",
      };
    }

    const postData: Prisma.PostCreateInput = {
      title,
      content,
      user: {
        connect: {
          id: session.user.id,
        },
      },
    };
    await db.post.create({
      data: postData,
    });
    revalidatePath("/community");
    return {
      status: "success",
      message: "Post created",
    };
  } catch (e: unknown) {
    if (e instanceof ValidationError) {
      return {
        status: "error",
        message: "Validation Error occured.",
        error: {
          path: e.path,
          message: e.errors[0],
        },
      };
    }
    return {
      status: "error",
      message: "An error occurred",
    };
  }
};
