import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import { domains } from "@/config/domains";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const LearningPaths = () => {
  return (
    <div className="container">
      <div className="max-w-xl space-y-2">
        <h1 className="text-6xl font-bold tracking-tighter">Learning Paths</h1>
        <p className="text-base text-muted-foreground font-medium">
          Learning paths are a great way to learn a new skill or technology.
          They are a series of courses that are designed to help you learn a new
          skill or technology.
        </p>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-3 mt-10 gap-4">
        {domains.map((domain) => {
          return (
            <Link
              href={`/learning-paths/${domain.id}`}
              key={domain.id}
              className="max-w-96 group"
            >
              <Card className="relative group-hover:bg-secondary">
                <ArrowRight className="hidden group-hover:block w-4 h-4 absolute top-2 right-4 animate-in translate-x-2" />
                <CardHeader>
                  <CardTitle>{domain.title}</CardTitle>
                  <CardDescription>{domain.description}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          );
        })}
      </section>
    </div>
  );
};

export default LearningPaths;
