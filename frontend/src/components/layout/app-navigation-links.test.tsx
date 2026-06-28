import type { AnchorHTMLAttributes } from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { AppNavigationLinks } from "@/components/layout/app-navigation-links";

vi.mock("next/link", () => ({
  default: ({
    children,
    href,
    ...props
  }: AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

vi.mock("next/navigation", () => ({
  usePathname: () => "/tasks",
}));

afterEach(() => {
  cleanup();
});

describe("AppNavigationLinks", () => {
  it("renders Spanish navigation labels", () => {
    render(
      <AppNavigationLinks
        activeClassName="active"
        inactiveClassName="inactive"
      />,
    );

    expect(screen.getByRole("link", { name: "Inicio" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Tareas" })).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Configuración" }),
    ).toBeInTheDocument();
  });

  it("marks the current route as active", () => {
    render(
      <AppNavigationLinks
        activeClassName="active"
        inactiveClassName="inactive"
      />,
    );

    const activeLink = screen.getByRole("link", { name: "Tareas" });

    expect(activeLink).toHaveAttribute("aria-current", "page");
    expect(activeLink).toHaveClass("active");
  });
});
