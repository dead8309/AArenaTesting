"use server"

import { getServerSession } from "next-auth";
import { State } from "../common/state";
import { createResourceSchema } from "./schema";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { Prisma } from "@prisma/client";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { ValidationError } from "yup";

export const createResourceAction = async (
  prevState: State | null,
  formData: FormData
): Promise<State> => {
  try {
    const rawData = {
      title: formData.get("title") as string,
      content: formData.get("content") as string,
      url: formData.get("url") as string,
      domain: formData.get("domain") as string,
    };
    console.log(rawData);
    const data = await createResourceSchema.validate(rawData);

    const session = await getServerSession(authOptions);
    if (!session) {
      return {
        status: "error",
        message: "You must be logged in to do this",
      };
    }
    const resource: Prisma.ResourceCreateInput = {
      title: data.title,
      content: data.content ,
      url: data.url,
      domain: data.domain,
      user: { connect: { id: session.user.id } },
    };
    await db.resource.create({ data: resource });

    revalidatePath(`/learning-paths/${data.domain}/resources`);

    return {
      status: "success",
      message: "Resource added successfully",
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
      message: "An error occured"
    };
  }
};


export const deleteResourceAction = async (
    prevState: State | null,
    formData: FormData
  ): Promise<State> => {
  try {
    const resourceId = formData.get("resourceId")

    if (!resourceId) {
      return {
        status: "error",
        message: "Resource not found",
      };
    }

    const session = await getServerSession(authOptions);
    if (!session) {
      return {
        status: "error",
        message: "You must be logged in to do this",
      };
    }
    

    const resource = await db.resource.findUnique({
      where: {
        id: resourceId as string,
      },
    });

    if (resource?.userId !== session.user.id) {
      return {
        status: "error",
        message: "UnAuthorized",
      };
    }

    await db.resource.delete({
      where: {
        id: resourceId as string,
      },
    });
    
    revalidatePath(`/learning-paths/${resource.domain}/resources`);
    return {
      status: "success",
      message: "Resource deleted successfully",
    };
  } catch (e: unknown) {
    return {
      status: "error",
      message: "An error occured",
    };
  }
};
  
  