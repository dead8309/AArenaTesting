import React from "react";
import UserButton from "../user-button";
import { ModeToggle } from "../mode-toggle";
import { siteConfig } from "@/config/site";
import MainNav from "./main-nav";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <MainNav items={siteConfig.mainNav} />
        {/* MobileNav */}
        <div className="flex items-center justify-end space-x-2">
          <nav className="flex items-center space-x-4">
            <UserButton />
            <ModeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
