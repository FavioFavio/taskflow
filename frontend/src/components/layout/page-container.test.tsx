import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { PageContainer } from "@/components/layout/page-container";

describe("PageContainer", () => {
  it("renders page content without a breadcrumb trail", () => {
    render(
      <PageContainer>
        <p>Contenido principal</p>
      </PageContainer>,
    );

    expect(screen.getByText("Contenido principal")).toBeInTheDocument();
    expect(
      screen.queryByRole("navigation", { name: "Ruta de navegación" }),
    ).not.toBeInTheDocument();
  });
});
