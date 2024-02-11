import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import React from "react";
import { Badge } from "@/components/ui/badge";
import DeleteVideoForm from "../forms/delete-video-form";
import { formatDate } from "@/lib/utils";
import YoutubeVideo from "../components/youtube-embed";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { db } from "@/lib/db";

interface VideosCardProps {
  domain: string;
}

const VideosCard = async ({ domain }: VideosCardProps) => {
  const session = await getServerSession(authOptions);
  const videos = await db.video.findMany({
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {videos.map((video) => (
        <Card key={video.id} className="group">
          <CardHeader className="relative">
            <CardDescription className="flex items-center justify-between">
              <span className="flex items-center">
                Posted {formatDate(video.createdAt)} by {video.user.name}
              </span>
            </CardDescription>
            <div className="absolute top-2 right-4">
              {session?.user.id === video.userId && (
                <DeleteVideoForm
                  className="hidden group-hover:block"
                  id={video.id}
                />
              )}
            </div>
          </CardHeader>
          <CardContent>
            <YoutubeVideo width={"100%"} height={200} url={video.url} />
          </CardContent>
          <CardFooter className="flex flex-col items-start space-y-2">
            <Badge>{video.domain}</Badge>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default VideosCard;
