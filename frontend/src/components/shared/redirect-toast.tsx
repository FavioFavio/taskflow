"use client";

import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { useToast } from "@/components/ui/toast";

const REDIRECT_TOAST_MESSAGES = {
  login: "Sesión iniciada correctamente.",
  logout: "Sesión cerrada correctamente.",
} as const;

type RedirectToastKey = keyof typeof REDIRECT_TOAST_MESSAGES;

function isRedirectToastKey(value: string | null): value is RedirectToastKey {
  return value === "login" || value === "logout";
}

export function RedirectToast() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { showToast } = useToast();

  useEffect(() => {
    const toastKey = searchParams.get("toast");

    if (!isRedirectToastKey(toastKey)) {
      return;
    }

    showToast({ message: REDIRECT_TOAST_MESSAGES[toastKey] });

    const nextParams = new URLSearchParams(searchParams.toString());
    nextParams.delete("toast");
    const queryString = nextParams.toString();
    router.replace(queryString ? `${pathname}?${queryString}` : pathname, {
      scroll: false,
    });
  }, [pathname, router, searchParams, showToast]);

  return null;
}
