import ResourceForm from "@/components/domain/resources/forms/resource-form";
import ResourcesCard from "@/components/domain/resources/components/resources-card";
import React, { Suspense } from "react";
import DomainSkeleton from "@/components/domain/common/domain-skeleton";
import { DomainPageParams } from "@/types/url-params";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

const ResoursePage = async ({ params }: DomainPageParams) => {
  const session = await getServerSession(authOptions);
  return (
    <div className="flex flex-col space-y-4">
      {session && <ResourceForm domain={params.domain} />}
      <Suspense fallback={<DomainSkeleton />}>
        <ResourcesCard domain={params.domain} />
      </Suspense>
    </div>
  );
};

export default ResoursePage;
