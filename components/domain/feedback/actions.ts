"use server";

import { db } from "@/lib/db";
import { State } from "../common/state";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { revalidatePath } from "next/cache";
import { createFeedbackSchema } from "./schema";
import { ValidationError } from "yup";

export const createFeedbackAction = async (
  prevState: State | null,
  formData: FormData
): Promise<State> => {
  try {
    const rawData = {
      content: formData.get("content") as string,
      domain: formData.get("domain") as string,
    };
    const data = await createFeedbackSchema.validate(rawData);

    const session = await getServerSession(authOptions);
    if (!session) {
      return {
        status: "error",
        message: "You must be logged in to do this",
      };
    }

    const feedback = await db.feedback.create({
      data: {
        content: data.content,
        domain: data.domain,
        user: {
          connect: {
            id: session.user.id,
          },
        },
      },
    });

    revalidatePath(`/learning-paths/${feedback.domain}/feedback`);
    return {
      status: "success",
      message: "Feedback created successfully",
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

export const deleteFeedbackAction = async (
  prevState: State | null,
  formData: FormData
): Promise<State> => {
  try {
    const feedbackId = formData.get("feedbackId");

    if (!feedbackId) {
      return {
        status: "error",
        message: "Feedback not found",
      };
    }

    const session = await getServerSession(authOptions);
    if (!session) {
      return {
        status: "error",
        message: "You must be logged in to do this",
      };
    }

    const feedback = await db.feedback.findUnique({
      where: {
        id: feedbackId as string,
      },
    });

    if (feedback?.userId !== session.user.id) {
      return {
        status: "error",
        message: "UnAuthorized",
      };
    }

    await db.feedback.delete({
      where: {
        id: feedbackId as string,
      },
    });

    revalidatePath(`/learning-paths/${feedback.domain}/feedback`);
    return {
      status: "success",
      message: "Feedback deleted successfully",
    };
  } catch (e: unknown) {
    return {
      status: "error",
      message: "An error occured",
    };
  }
};
