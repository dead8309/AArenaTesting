import VideoForm from "@/components/domain/videos/forms/video-form";
import VideosCard from "@/components/domain/videos/components/videos-card";
import React, { Suspense } from "react";
import DomainSkeleton from "@/components/domain/common/domain-skeleton";
import { DomainPageParams } from "@/types/url-params";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

const VideosPage = async ({ params }: DomainPageParams) => {
  const session = await getServerSession(authOptions);
  return (
    <div>
      {session && <VideoForm domain={params.domain} />}
      <div className="mt-10">
        <h1 className="text-3xl font-bold mb-6">Videos</h1>
        <Suspense fallback={<DomainSkeleton />}>
          <VideosCard domain={params.domain} />
        </Suspense>
      </div>
    </div>
  );
};

export default VideosPage;
