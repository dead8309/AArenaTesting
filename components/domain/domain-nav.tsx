"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { domains, domainsLaoutNavLinks } from "@/config/domains";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";



interface DomainNavProps extends React.HTMLAttributes<HTMLDivElement> {}

const DomainNav = ({ className, ...props }: DomainNavProps) => {
  const pathname = usePathname();
  const domain = domains.find((d) =>
    pathname.startsWith(`/learning-paths/${d.id}`)
  )?.id;
  return (
    <div className="relative">
      <div className={cn("mb-4 flex items-center", className)} {...props}>
        <NavigationMenu>
          <NavigationMenuList>
            {domainsLaoutNavLinks.map((nav) => (
              <NavigationMenuItem key={nav.id}>
                <Link
                  href={{
                    pathname: nav.disabled
                      ? null
                      : `/learning-paths/${domain}${nav.id}`,
                  }}
                  legacyBehavior
                  passHref
                >
                  <NavigationMenuLink
                    className={cn(
                      navigationMenuTriggerStyle(),
                      pathname?.endsWith(nav.id)
                        ? "bg-muted font-medium text-primary"
                        : "text-muted-foreground",
                      nav.disabled && "cursor-not-allowed"
                    )}
                  >
                    {nav.title}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  );
};

export default DomainNav;
