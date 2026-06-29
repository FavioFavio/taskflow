import { FeedbackMessage } from "@/components/shared/feedback-message";

type AuthFeedbackProps = {
  children: React.ReactNode;
  tone: "error" | "success";
};

export function AuthFeedback({ children, tone }: AuthFeedbackProps) {
  return <FeedbackMessage tone={tone}>{children}</FeedbackMessage>;
}
