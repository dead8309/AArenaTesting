import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import DomainSkeleton from "@/components/domain/common/domain-skeleton";
import FeedbacksCard from "@/components/domain/feedback/components/feedbacks-card";
import FeedbackForm from "@/components/domain/feedback/forms/feedback-form";
import { DomainPageParams } from "@/types/url-params";
import { getServerSession } from "next-auth";
import React, { Suspense } from "react";

const FeedbackPage = async ({ params }: DomainPageParams) => {
  const session = await getServerSession(authOptions);
  return (
    <div className="">
      {session && <FeedbackForm domain={params.domain} />}
      <div className="mt-10">
        <h1 className="text-3xl font-bold mb-6">Feedbacks</h1>
        <Suspense fallback={<DomainSkeleton />}>
          <FeedbacksCard domain={params.domain} />
        </Suspense>
      </div>
    </div>
  );
};

export default FeedbackPage;
