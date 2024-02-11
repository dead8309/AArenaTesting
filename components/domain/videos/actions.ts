"use server";

import { postVideoSchema } from "./schema";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { Prisma } from "@prisma/client";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { ValidationError } from "yup";
import { State } from "../common/state";

export const postVideoAction = async (
  prevState: State | null,
  formData: FormData
): Promise<State> => {
  try {
    const rawData = {
      url: formData.get("url") as string,
      domain: formData.get("domain") as string,
    };
    const data = await postVideoSchema.validate(rawData);

    const session = await getServerSession(authOptions);
    if (!session) {
      return {
        status: "error",
        message: "You must be logged in to do this",
      };
    }
    const video: Prisma.VideoCreateInput = {
      url: data.url,
      domain: data.domain,
      user: { connect: { id: session.user.id } },
    };
    await db.video.create({ data: video });

    revalidatePath(`/learning-paths/${data.domain}/videos`);

    return {
      status: "success",
      message: "Video added successfully",
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
      message: "An error occured",
    };
  }
};

export const deleteVideoAction = async (
  prevState: State | null,
  formData: FormData
): Promise<State> => {
  try {
    const videoId = formData.get("videoId");

    if (!videoId) {
      return {
        status: "error",
        message: "Video not found",
      };
    }

    const session = await getServerSession(authOptions);
    if (!session) {
      return {
        status: "error",
        message: "You must be logged in to do this",
      };
    }
    

    const video = await db.video.findUnique({
      where: {
        id: videoId as string,
      },
    });

    if (video?.userId !== session.user.id) {
      return {
        status: "error",
        message: "UnAuthorized",
      };
    }

    await db.video.delete({
      where: {
        id: formData.get("videoId") as string,
      },
    });
    
    revalidatePath(`/learning-paths/${video.domain}/videos`);
    return {
      status: "success",
      message: "Video deleted successfully",
    };
  } catch (e: unknown) {
    return {
      status: "error",
      message: "An error occured",
    };
  }
};

