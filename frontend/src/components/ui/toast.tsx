"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { CheckCircle2, X, XCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ToastTone = "error" | "success";

type Toast = {
  id: number;
  message: string;
  tone: ToastTone;
};

type ToastInput = {
  message: string;
  tone?: ToastTone;
};

type ToastContextValue = {
  showToast: (toast: ToastInput) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const nextToastId = useRef(0);
  const timeoutIds = useRef<number[]>([]);

  const removeToast = useCallback((id: number) => {
    setToasts((currentToasts) =>
      currentToasts.filter((toast) => toast.id !== id),
    );
  }, []);

  const showToast = useCallback(
    ({ message, tone = "success" }: ToastInput) => {
      nextToastId.current += 1;
      const id = nextToastId.current;
      setToasts((currentToasts) => [
        ...currentToasts.slice(-2),
        { id, message, tone },
      ]);
      const timeoutId = window.setTimeout(() => removeToast(id), 4000);
      timeoutIds.current.push(timeoutId);
    },
    [removeToast],
  );

  const value = useMemo(() => ({ showToast }), [showToast]);

  useEffect(() => {
    const currentTimeoutIds = timeoutIds.current;

    return () => {
      currentTimeoutIds.forEach((timeoutId) => window.clearTimeout(timeoutId));
    };
  }, []);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        className="fixed right-4 bottom-4 z-50 flex w-[calc(100%-2rem)] max-w-sm flex-col gap-2 sm:right-6 sm:bottom-6"
        role="region"
        aria-label="Notificaciones"
      >
        {toasts.map((toast) => {
          const Icon = toast.tone === "success" ? CheckCircle2 : XCircle;

          return (
            <div
              key={toast.id}
              className={cn(
                "bg-background text-foreground flex items-start gap-3 rounded-lg border p-4 shadow-lg",
                toast.tone === "success"
                  ? "border-emerald-500/30"
                  : "border-destructive/30",
              )}
              role={toast.tone === "success" ? "status" : "alert"}
            >
              <Icon
                className={cn(
                  "mt-0.5 size-4 shrink-0",
                  toast.tone === "success"
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-destructive",
                )}
                aria-hidden="true"
              />
              <p className="min-w-0 flex-1 text-sm">{toast.message}</p>
              <Button
                type="button"
                variant="ghost"
                size="icon-xs"
                className="-mt-1 -mr-1"
                onClick={() => removeToast(toast.id)}
                aria-label="Cerrar notificación"
              >
                <X className="size-3" aria-hidden="true" />
              </Button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast debe usarse dentro de ToastProvider.");
  }

  return context;
}
