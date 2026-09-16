import { useEffect, useState } from "react";
import { AboutSection } from "@/components/about-section";
import { ContactSection } from "@/components/contact-form";
import { CvSection } from "@/components/cv-section";
import { HeroSection } from "@/components/hero-section";
import { ProjectGrid } from "@/components/project-grid";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SkillsSection } from "@/components/skills-section";
import { DEFAULT_PROFILE, type Profile } from "@/lib/profile";
import { getProfile } from "@/lib/profile-fns";

export function HomePage() {
  const [profile, setProfile] = useState<Profile>(DEFAULT_PROFILE);

  useEffect(() => {
    getProfile()
      .then(setProfile)
      .catch(() => setProfile(DEFAULT_PROFILE));
  }, []);

  return (
    <div className="min-h-dvh">
      <SiteHeader profile={profile} />
      <main>
        <HeroSection profile={profile} />
        <ProjectGrid profile={profile} />
        <AboutSection profile={profile} />
        <SkillsSection profile={profile} />
        <CvSection profile={profile} />
        <ContactSection profile={profile} />
      </main>
      <SiteFooter profile={profile} />
    </div>
  );
}
