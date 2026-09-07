import type { Metadata } from "next";
import { ScheduleList } from "@/components/schedule-list";
import { PageFrame } from "@/components/page-frame";

export const metadata: Metadata = {
  title: "My schedule",
};

export default function SchedulePage() {
  return (
    <PageFrame kicker="Your path through QFest" title="My schedule">
      <ScheduleList />
    </PageFrame>
  );
}
