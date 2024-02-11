import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { Card, CardHeader, CardDescription, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import React from "react";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import LinkPreview from "./link-preview";
import DeleteResourceForm from "../forms/delete-resource-form";


interface ResourcesCardProps {
  domain: string;
}

const ResourcesCard = async ({domain}: ResourcesCardProps) => {
  const session = await getServerSession(authOptions);
  const resources = await db.resource.findMany({
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
      {resources.map((resource) => (
        <Card key={resource.id} className="group">
          <CardHeader className="relative">
            <CardTitle>{resource.title}</CardTitle>
            <CardDescription className="flex items-center justify-between">
              <span className="flex items-center">
                Posted {formatDate(resource.createdAt)} by {resource.user.name}
              </span>
            </CardDescription>
            <div className="absolute top-2 right-4">
              {session?.user.id === resource.userId && (
                <DeleteResourceForm
                  className="hidden group-hover:block"
                  id={resource.id}
                />
              )}
            </div>
          </CardHeader>
          <CardContent>
            <p>{resource.content}</p>
            <LinkPreview url={resource.url} />
          </CardContent>
          <CardFooter className="flex flex-col items-start space-y-2">
            <Badge>{resource.domain}</Badge>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default ResourcesCard;
