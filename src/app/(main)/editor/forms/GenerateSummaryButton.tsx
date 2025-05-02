import LoadingButton from "@/components/LoadingButton";
import { ResumeValues } from "@/lib/validation";
import { SparkleIcon, Sparkles, WandSparklesIcon } from "lucide-react";
import { useState } from "react";
import { generateSummary } from "./actions";

interface GenerateSummaryButtonProps {
  resumeData: ResumeValues;
  onSummaryGenerated: (summary: string) => void;
}

export default function GenerateSummaryButton({
  resumeData,
  onSummaryGenerated,
}: GenerateSummaryButtonProps) {
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    try {
      setLoading(true);
      const summary = await generateSummary(resumeData);
      onSummaryGenerated(summary);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <LoadingButton
      type="button"
      variant="outline"
      loading={loading}
      onClick={handleClick}
    >
      <Sparkles className="size-4" />
      Generate Summary
    </LoadingButton>
  );
}
