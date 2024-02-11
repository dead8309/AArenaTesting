import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { db } from "@/lib/db";
import { formatDate } from "@/lib/utils";
import { getServerSession } from "next-auth";
import React from "react";
import DeleteFeedbackForm from "../forms/delete-feedback-form";

interface FeedbacksCardProps {
  domain: string;
}

const FeedbacksCard = async ({ domain }: FeedbacksCardProps) => {
  const session = await getServerSession(authOptions);
  const feedbacks = await db.feedback.findMany({
    where: {
      domain,
    },
    include: {
      user: {
        select: {
          name: true,
          image: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <div className="flex flex-col max-w-lg gap-6">
      {feedbacks.map((feedback) => (
        <div key={feedback.id} className="w-full relative group">
          <div className="flex space-x-4">
            <Avatar>
              <AvatarImage src={feedback.user.image ?? undefined} />
              <AvatarFallback>{feedback.user.name?.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <div className="space-y-4">
              <p className="text-base">
                <span className="font-bold">{feedback.user.name}</span>{" "}
                <span className="text-muted-foreground">
                  {formatDate(feedback.createdAt)}
                </span>
              </p>
              <p className="text-sm">{feedback.content}</p>
            </div>
          </div>
          <div className="absolute top-0 right-0 block group-hover:block">
            {session?.user.id === feedback.userId && (
              <DeleteFeedbackForm id={feedback.id} />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeedbacksCard;
