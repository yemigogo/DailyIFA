import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import PersonalizedLearningDashboard from "@/components/personalized-learning-dashboard";

export default function LearningSimple() {
  const { language, t: ts } = useLanguage();
  const [userId] = useState("demo-user"); // In real app, get from auth context

  return <PersonalizedLearningDashboard userId={userId} />;
}