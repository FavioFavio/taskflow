"use client";

import type { ReactNode } from "react";
import { Menu } from "lucide-react";

import { AppNavigationLinks } from "@/components/layout/app-navigation-links";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function MobileSidebar() {
  function wrapNavigationLink(link: ReactNode, href: string) {
    return (
      <SheetClose key={href} asChild>
        {link}
      </SheetClose>
    );
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="lg:hidden"
          aria-label="Abrir navegación"
        >
          <Menu className="size-5" aria-hidden="true" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72">
        <div className="border-border border-b px-5 py-4">
          <SheetTitle>Navegación</SheetTitle>
        </div>
        <nav className="space-y-1 p-3" aria-label="Navegación móvil">
          <AppNavigationLinks
            activeClassName="bg-accent text-accent-foreground"
            inactiveClassName="text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            wrapLink={wrapNavigationLink}
          />
        </nav>
      </SheetContent>
    </Sheet>
  );
}
