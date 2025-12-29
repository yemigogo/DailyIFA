import { useState, useEffect } from "react";

interface UserProfile {
  id?: string;
  age?: number;
  name?: string;
  email?: string;
}

export function useAuth() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedProfile = localStorage.getItem("ifaUserProfile");
    if (savedProfile) {
      try {
        setUser(JSON.parse(savedProfile));
      } catch (e) {
        console.error("Failed to parse user profile:", e);
      }
    }
    setIsLoading(false);
  }, []);

  const updateProfile = (profile: Partial<UserProfile>) => {
    const updatedUser = { ...user, ...profile };
    setUser(updatedUser);
    localStorage.setItem("ifaUserProfile", JSON.stringify(updatedUser));
  };

  return {
    user,
    isLoading,
    updateProfile,
    isAuthenticated: !!user,
  };
}
