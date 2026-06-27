import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Button } from "@/components/ui/button";

describe("Button", () => {
  it("renders button content", () => {
    render(<Button>Crear tarea</Button>);

    expect(
      screen.getByRole("button", { name: "Crear tarea" }),
    ).toBeInTheDocument();
  });

  it("applies variant and custom classes", () => {
    render(
      <Button variant="secondary" className="custom-class">
        Guardar
      </Button>,
    );

    const button = screen.getByRole("button", { name: "Guardar" });

    expect(button).toHaveAttribute("data-variant", "secondary");
    expect(button).toHaveClass("custom-class");
  });
});
