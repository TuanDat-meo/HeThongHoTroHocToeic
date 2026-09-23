import { HeroActions } from "@/components/dashboard/HeroActions";
import { KpiRow } from "@/components/dashboard/KpiRow";
import { LearningAnalytics } from "@/components/dashboard/LearningAnalytics";
import { AiValidationQueue } from "@/components/dashboard/AiValidationQueue";

export default function Home() {
  return (
    <div className="flex flex-col w-full space-y-space-lg">
      {/* TOP HEADER / ACTION BAR */}
      <HeroActions />

      {/* KPI SUMMARY ROW (4 CARDS) */}
      <KpiRow />

      {/* MAIN SECTION 1: LEARNING ANALYTICS & WEAKNESS DRIFT */}
      <LearningAnalytics />

      {/* MAIN SECTION 2 & 3: AI VALIDATION QUEUE & AUDIT SYSTEM LOGS */}
      <AiValidationQueue />
    </div>
  );
}
