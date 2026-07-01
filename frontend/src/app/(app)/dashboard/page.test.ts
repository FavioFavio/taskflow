import { describe, expect, it, vi } from "vitest";

import DashboardPage from "@/app/(app)/dashboard/page";
import { redirect } from "next/navigation";

vi.mock("next/navigation", () => ({
  redirect: vi.fn(),
}));

describe("DashboardPage", () => {
  it("redirects dashboard to the board", () => {
    DashboardPage();

    expect(redirect).toHaveBeenCalledWith("/board");
  });
});
