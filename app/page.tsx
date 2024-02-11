import SignInButton from "@/components/sign-in-button";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { features } from "@/config/features";
import { siteConfig } from "@/config/site";
import Link from "next/link";

export default function Home() {
  return (
    <div className="container relative flex pt-20 flex-col space-y-4 ">
      <div className="space-y-6 max-w-lg">
        <h1 className="text-6xl font-bold">{siteConfig.name}</h1>
        <p className="text-muted-foreground">{siteConfig.description}</p>
      </div>

      <div className="flex gap-2">
        <Link href="/dashboard" className={buttonVariants()}>
          Get Started
        </Link>
        <Link
          href="/about"
          className={buttonVariants({ variant: "secondary" })}
        >
          Learn More
        </Link>
      </div>

      <section className="pt-20 space-y-8">
        <h3 className="text-center text-4xl font-semibold">Features</h3>
        <div className="grid grid-cols-2 gap-4">
          {features.map((Feature) => {
            const icon = Feature.icon ? (
              <Feature.icon className="w-10 h-10" />
            ) : null;
            return (
              <Card
                key={Feature.title}
                className="hover:bg-secondary/65 hover:text-secondary-foreground"
              >
                <CardHeader>
                  {icon}
                  <CardTitle>{Feature.title}</CardTitle>
                  <CardDescription>{Feature.description}</CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </section>

      <section>
        <div>Tech Stacks</div>
      </section>
    </div>
  );
}
