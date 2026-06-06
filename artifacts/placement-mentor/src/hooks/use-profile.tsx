import { useState, useEffect } from "react";

export type UserProfile = {
  name: string;
  college: string;
  branch: string;
  year: string;
  targetRole: string;
  avatar: string;
};

const STORAGE_KEY = "placementai_profile";

export function useProfile() {
  const [profile, setProfileState] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setProfileState(JSON.parse(stored));
      } catch {
        setProfileState(null);
      }
    }
    setLoading(false);
  }, []);

  const saveProfile = (data: UserProfile) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    setProfileState(data);
  };

  const clearProfile = () => {
    localStorage.removeItem(STORAGE_KEY);
    setProfileState(null);
  };

  const firstName = profile?.name?.split(" ")[0] ?? "";

  return { profile, firstName, loading, saveProfile, clearProfile };
}
