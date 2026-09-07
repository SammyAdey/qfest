import type { Metadata } from "next";
import { PageFrame } from "@/components/page-frame";
import { SessionRegister } from "@/components/session-register";

export const metadata: Metadata = {
  title: "Register",
};

export default function RegisterPage() {
  return (
    <PageFrame kicker="Free admission" title="Register">
      <SessionRegister />
    </PageFrame>
  );
}
