import { Post, Prisma } from "@prisma/client";
import { HeartIcon } from "lucide-react";
import React from "react";
import SubmitButton from "../domain/common/submit-button";
import { postLikeAction } from "./action";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { cn } from "@/lib/utils";

interface PostLikeButtonProps {
  post: Prisma.PostGetPayload<{
    include: {
      postLikes: true;
    };
  }>;
}

const PostLikeButton = async ({ post }: PostLikeButtonProps) => {
  const session = await getServerSession(authOptions);
  const existingLike = await db.postLike.findFirst({
    where: {
      postId: post.id,
      userId: session?.user?.id,
    },
  });

  return (
    <form action={postLikeAction}>
      <input type="hidden" name="postId" value={post.id} />
      <div className="flex items-center">
        <SubmitButton variant={"ghost"} className="p-0 hover:bg-background">
          <HeartIcon className={cn("h-6 w-6", {
            "fill-red-500 stroke-red-500": Boolean(existingLike),
          })} />
        </SubmitButton>
        <span className="ml-1">{post.postLikes.length}</span>
      </div>
    </form>
  );
};

export default PostLikeButton;
