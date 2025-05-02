import { Button } from "@/components/ui/button";
import { FileUserIcon, PenLineIcon } from "lucide-react";
import Link from "next/link";
import { steps } from "./steps";
interface FooterProps {
  currentStep: string;
  setCurrentStep: (step: string) => void;
  showSmResumePreview?: boolean;
  setShowSmResumePreview?: (show: boolean) => void;
  isSaving: boolean;
}

export default function Footer({
  currentStep,
  setCurrentStep,
  showSmResumePreview,
  setShowSmResumePreview,
  isSaving,
}: FooterProps) {
  const currentIndex = steps.findIndex((step) => step.key === currentStep);
  const previousStep =
    currentIndex > 0 ? steps[currentIndex - 1]?.key : undefined;
  const nextStep =
    currentIndex < steps.length - 1 ? steps[currentIndex + 1]?.key : undefined;

  return (
    <footer className="w-full border-t px-3 py-3">
      <div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-3">
        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            onClick={
              previousStep ? () => setCurrentStep(previousStep) : undefined
            }
            disabled={!previousStep}
          >
            Previous Step
          </Button>
          <Button
            onClick={nextStep ? () => setCurrentStep(nextStep) : undefined}
            disabled={!nextStep}
          >
            Next Step
          </Button>
        </div>

        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setShowSmResumePreview &&
            setShowSmResumePreview(!showSmResumePreview)
          }
          className="md:hidden"
          title={
            showSmResumePreview ? "Show Input Form" : "Show Resume Preview"
          }
        >
          {showSmResumePreview ? <PenLineIcon /> : <FileUserIcon />}
        </Button>

        <div className="flex items-center gap-3">
          <Button variant="secondary">
            <Link href="/resumes">Close</Link>
          </Button>
          {isSaving && (
            <p className="absolute top-4 right-4 animate-pulse rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-500 shadow-sm">
              Saving...
            </p>
          )}
        </div>
      </div>
    </footer>
  );
}
