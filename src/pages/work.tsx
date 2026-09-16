import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { CaseStudyMissing, CaseStudyPage } from "@/components/case-study";
import { DEFAULT_PROFILE, type Profile, type Project } from "@/lib/profile";
import { getProfile } from "@/lib/profile-fns";

export function WorkPage() {
  const { projectId } = useParams();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [project, setProject] = useState<Project | null | undefined>(undefined);

  useEffect(() => {
    getProfile()
      .then((next) => {
        setProfile(next);
        setProject(next.projects.find((item) => item.id === projectId) ?? null);
      })
      .catch(() => {
        setProfile(DEFAULT_PROFILE);
        setProject(DEFAULT_PROFILE.projects.find((item) => item.id === projectId) ?? null);
      });
  }, [projectId]);

  if (!profile || project === undefined) {
    return <div className="min-h-dvh bg-paper" />;
  }
  if (!project) return <CaseStudyMissing profile={profile} />;
  return <CaseStudyPage profile={profile} project={project} />;
}
