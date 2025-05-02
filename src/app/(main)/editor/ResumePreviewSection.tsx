import ResumePreview from "@/components/ResumePreview";
import { ResumeValues } from "@/lib/validation";
import ColorPicker from "./ColorPicker";
import BorderStyleButton from "./BorderStyleButton";
import { cn } from "@/lib/utils";

interface ResumePreviewSectionProps {
  resumeData: ResumeValues;
  className?: string;
  setResumeData: (resumeData: ResumeValues) => void;
}

export default function ResumePreviewSection({
  resumeData,
  setResumeData,
  className,
}: ResumePreviewSectionProps) {
  return (
    <div className={cn("group relative hidden w-full md:flex", className)}>
      <div className="absolute top-1 left-1 flex flex-none flex-col gap-3 opacity-30 transition-opacity group-hover:opacity-100 lg:top-2 lg:left-2">
        <ColorPicker
          color={resumeData.colorHex}
          onChange={(color) => {
            setResumeData({ ...resumeData, colorHex: color.hex });
          }}
        />
        <BorderStyleButton
          borderStyle={resumeData.borderStyle}
          onChange={(borderStyle) =>
            setResumeData({ ...resumeData, borderStyle })
          }
        />
      </div>
      <div className="bg-secondary flex w-full justify-center overflow-y-auto p-3">
        <ResumePreview
          resumeData={resumeData}
          className="w-full max-w-2xl shadow-md"
        />
      </div>
    </div>
  );
}
