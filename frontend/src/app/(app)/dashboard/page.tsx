import { redirect } from "next/navigation";

export const metadata = {
  title: "Tablero | TaskFlow",
};

export default function DashboardPage() {
  redirect("/board");
}
