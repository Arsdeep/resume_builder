import { useToast } from "@/hooks/use-toast";
import { useDebounce } from "@/hooks/useDebounce";
import { ResumeValues } from "@/lib/validation";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { saveResume } from "./actions";
import { Button } from "@/components/ui/button";
import { fileReplacer } from "@/lib/utils";
export function useAutoSaveResume(resumeData: ResumeValues) {
  const searchParams = useSearchParams();

  const { toast } = useToast();

  const debouncedResumeData = useDebounce(resumeData, 1500);

  const [resumeId, setResumeId] = useState(resumeData.id);

  const [lastSavedData, setLastSavedData] = useState(
    JSON.parse(JSON.stringify(resumeData)),
  );

  const [isSaving, setIsSaving] = useState(false);
  const [isSavingError, setIsSavingError] = useState(false);

  useEffect(() => {
    setIsSavingError(false);
  }, [debouncedResumeData]);

  useEffect(() => {
    async function save() {
      try {
        setIsSaving(true);
        setIsSavingError(false);

        const newData = structuredClone(debouncedResumeData);

        // Only set photo to undefined if it's a File object and hasn't changed
        const photoShouldBeUndefined =
          newData.photo instanceof File &&
          JSON.stringify(lastSavedData.photo, fileReplacer) ===
            JSON.stringify(newData.photo, fileReplacer);

        const updatedResume = await saveResume({
          ...newData,
          id: resumeId,
          ...(photoShouldBeUndefined && {
            photo: undefined,
          }),
        });

        setResumeId(updatedResume?.id);
        setLastSavedData(newData);

        if (searchParams.get("resumeId") !== updatedResume?.id) {
          const newSearchParams = new URLSearchParams(searchParams);
          newSearchParams.set("resumeId", updatedResume?.id);
          window.history.replaceState(
            null,
            "",
            `?${newSearchParams.toString()}`,
          );
        }
      } catch (error) {
        setIsSavingError(true);
        console.error(error);
        const { dismiss } = toast({
          title: "Error saving resume",
          description: (
            <div className="flex flex-col gap-2">
              <p>{(error as Error).message}</p>
              <Button
                variant="secondary"
                onClick={() => {
                  dismiss();
                  save();
                }}
              >
                Try again
              </Button>
            </div>
          ),
          variant: "destructive",
        });
        setTimeout(() => {
          dismiss();
        }, 3000);
      } finally {
        setIsSaving(false);
      }
    }

    const hasUnsavedChanges =
      JSON.stringify(lastSavedData, fileReplacer) !==
      JSON.stringify(debouncedResumeData, fileReplacer);

    if (
      hasUnsavedChanges &&
      debouncedResumeData &&
      !isSaving &&
      !isSavingError
    ) {
      save();
    }
  }, [
    debouncedResumeData,
    isSaving,
    lastSavedData,
    isSavingError,
    resumeId,
    searchParams,
    toast,
  ]);

  return {
    isSaving,
    hasUnsavedChanges:
      JSON.stringify(resumeData) !== JSON.stringify(lastSavedData),
  };
}
