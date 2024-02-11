import glimpse from "react-glimpse/server";
import Image from "next/image";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import Link from "next/link";
import { cache } from "react";

const getData = async (url: string) => {
  try {
    const { image, description, title } = await glimpse(url);
    return { image, description, title };
  } catch (error) {
    return { image: null, description: null, title: null };
  }
};

const LinkPreview = async ({ url }: { url: string }) => {
  if (!url) return null;
  const { image, description, title } = await getData(url);

  return (
    <Link
      href={url}
      key={title}
      className="no-underline hover:-translate-y-1 transition-transform"
    >
      <Card className="flex items-start gap-2 w-full not-prose overflow-hidden bg-secondary">
        <CardHeader>
          <CardTitle className="text-base font-medium line-clamp-2">
            {title}
          </CardTitle>
          <CardDescription className="text-sm line-clamp-2">
            {description}
          </CardDescription>
        </CardHeader>
        {image ? (
          <Image
            src={image}
            alt={title ?? "embed"}
            height={720}
            width={1080}
            className="h-40"
            style={{
              aspectRatio: "120/67",
              objectFit: "cover",
            }}
            unoptimized
          />
        ) : null}
      </Card>
    </Link>
  );
};

export default LinkPreview;
