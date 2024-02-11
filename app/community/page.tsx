import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]/options";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import {
  ArrowRightIcon,
  HeartIcon,
  MessageCircleIcon,
  RepeatIcon,
  Share2,
  Share2Icon,
  ShareIcon,
  TwitterIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import { format } from "date-fns";
import PostLikeButton from "@/components/community/post-like-button";

const CommunityPage = async () => {
  const posts = await db.post.findMany({
    include: {
      user: true,
      postLikes: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  const session = await getServerSession(authOptions);

  return (
    <div className="container flex flex-col space-y-6 mt-10">
      <h1 className="text-3xl font-bold">Community</h1>

      {session && (
        <Link
          href="/community/new"
          className={buttonVariants({
            className: "w-fit",
          })}
        >
          Create a new post
          <ArrowRightIcon className="ml-2 h-4 w-4" />
        </Link>
      )}

      <div className="flex flex-col space-y-4">
        {posts.map((post) => (
          <Card
            key={post.id}
            className="mx-auto rounded-xl shadow-md overflow-hidden md:max-w-3xl m-3"
          >
            <CardHeader>
              <div className="flex items-center">
                <img
                  alt="Profile picture"
                  className="rounded-full"
                  height="40"
                  src={post.user.image || undefined}
                  style={{
                    aspectRatio: "40/40",
                    objectFit: "cover",
                  }}
                  width="40"
                />

                <div className="ml-4 tracking-wide text-lg font-semibold">
                  {post.user.name}
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <Link
                href={`/community/${post.id}`}
                key={post.id}
                className="flex flex-col space-y-2"
              >
                <h1>{post.title}</h1>
                <p>{post.content}</p>

                <div className="flex flex-wrap space-x-2 mt-2">
                  {post.tags.map((tag) => (
                    <Badge key={tag}>{tag}</Badge>
                  ))}
                </div>
              </Link>
            </CardContent>

            <CardFooter>
              <div className="flex w-full items-center justify-between">
                <div className="flex items-center space-x-4">
                  <PostLikeButton post={post} />
                </div>

                <div className="text-gray-400 dark:text-gray-300">
                  {format(post.createdAt, "PPP")}
                </div>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CommunityPage;
