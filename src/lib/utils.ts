import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ResumeServerData } from "./types";
import { ResumeValues } from "./validation";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function fileReplacer(key: unknown, value: unknown) {
  return value instanceof File
    ? {
        name: value.name,
        size: value.size,
        type: value.type,
        lastModified: value.lastModified,
      }
    : value;
}

export function mapToResumeValues(data: ResumeServerData): ResumeValues {
  console.log("fetched data", data);
  return {
    id: data.id,
    title: data.title || "",
    description: data.description || "",
    photo: data.photoUrl || undefined,
    firstName: data.firstName || "",
    lastName: data.lastName || "",
    jobTitle: data.jobTitle || "",
    city: data.city || "",
    country: data.country || "",
    phone: data.phone || "",
    email: data.email || "",
    workExperiences: data.workExperiences.map((exp) => ({
      position: exp.position || "",
      company: exp.company || "",
      startDate: exp.startDate?.toISOString().split("T")[0],
      endDate: exp.endDate?.toISOString().split("T")[0],
      description: exp.description || "",
    })),
    educations: data.educations.map((edu) => ({
      degree: edu.degree || "",
      school: edu.school || "",
      startDate: edu.startDate?.toISOString().split("T")[0],
      endDate: edu.endDate?.toISOString().split("T")[0],
    })),
    skills: data.skills,
    borderStyle: data.borderStyle,
    colorHex: data.colorHex,
    summary: data.summary || "",
  };
}
