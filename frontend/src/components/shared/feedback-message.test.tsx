import { cleanup, render, screen } from "@testing-library/react";
import { Info } from "lucide-react";
import { afterEach, describe, expect, it } from "vitest";

import { FeedbackMessage } from "@/components/shared/feedback-message";

afterEach(() => {
  cleanup();
});

describe("FeedbackMessage", () => {
  it("renders error feedback as an alert", () => {
    render(<FeedbackMessage tone="error">No pudimos guardar.</FeedbackMessage>);

    expect(screen.getByRole("alert")).toHaveTextContent("No pudimos guardar.");
  });

  it("renders success feedback as a status message", () => {
    render(<FeedbackMessage tone="success">Tarea creada.</FeedbackMessage>);

    expect(screen.getByRole("status")).toHaveTextContent("Tarea creada.");
  });

  it("supports a custom icon", () => {
    render(
      <FeedbackMessage tone="success" icon={Info}>
        Listo.
      </FeedbackMessage>,
    );

    expect(screen.getByRole("status")).toHaveTextContent("Listo.");
  });
});
