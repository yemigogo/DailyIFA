import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function LearningSimple() {
  const { language, t } = useLanguage();
  
  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "linear-gradient(135deg, #1e40af, #f59e0b)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "2rem",
      color: "white",
      fontSize: "1.2rem",
      fontWeight: "bold",
      zIndex: 9999
    }}>
      <div style={{
        background: "rgba(255, 255, 255, 0.95)",
        color: "#1e40af",
        padding: "3rem",
        borderRadius: "20px",
        textAlign: "center",
        maxWidth: "600px",
        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)"
      }}>
        <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>🎓</div>
        
        <h1 style={{
          fontSize: "2.5rem",
          fontWeight: "bold",
          marginBottom: "1rem",
          color: "#1e40af"
        }}>
          {t("Orisha Learning Academy", "Ilé-ẹ̀kọ́ Òrìṣà")}
        </h1>
        
        <p style={{
          fontSize: "1.1rem",
          color: "#6b7280",
          marginBottom: "2rem"
        }}>
          {t(
            "Welcome to your personalized learning journey",
            "Kàábọ̀ sí ìrìn àjò ẹ̀kọ́ ti ara rẹ"
          )}
        </p>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "1.5rem",
          marginBottom: "2rem"
        }}>
          <div style={{
            background: "#f0f8ff",
            padding: "1.5rem",
            borderRadius: "12px",
            textAlign: "center"
          }}>
            <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>🌊</div>
            <h3 style={{ color: "#1e40af", fontWeight: "bold", marginBottom: "0.5rem" }}>Olókun</h3>
            <p style={{ fontSize: "0.9rem", color: "#6b7280" }}>
              {t("Ocean wisdom", "Ọgbọ́n òkun")}
            </p>
          </div>

          <div style={{
            background: "#fff8e1",
            padding: "1.5rem",
            borderRadius: "12px",
            textAlign: "center"
          }}>
            <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>💛</div>
            <h3 style={{ color: "#f59e0b", fontWeight: "bold", marginBottom: "0.5rem" }}>Ọ̀ṣun</h3>
            <p style={{ fontSize: "0.9rem", color: "#6b7280" }}>
              {t("Love & abundance", "Ìfẹ́ àti ọ̀pọ̀lọpọ̀")}
            </p>
          </div>

          <div style={{
            background: "#f0f9ff",
            padding: "1.5rem",
            borderRadius: "12px",
            textAlign: "center"
          }}>
            <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>💙</div>
            <h3 style={{ color: "#0ea5e9", fontWeight: "bold", marginBottom: "0.5rem" }}>Yemọja</h3>
            <p style={{ fontSize: "0.9rem", color: "#6b7280" }}>
              {t("Motherly waters", "Omi ìyá")}
            </p>
          </div>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "1rem",
          marginBottom: "2rem"
        }}>
          <button style={{
            background: "#1e40af",
            color: "white",
            border: "none",
            padding: "1rem",
            borderRadius: "8px",
            fontWeight: "bold",
            cursor: "pointer",
            fontSize: "1rem"
          }}>
            {t("Start Learning", "Bẹ̀rẹ̀ Ẹ̀kọ́")}
          </button>
          
          <button style={{
            background: "#f59e0b",
            color: "white",
            border: "none", 
            padding: "1rem",
            borderRadius: "8px",
            fontWeight: "bold",
            cursor: "pointer",
            fontSize: "1rem"
          }}>
            {t("View Achievements", "Wo Àwọn Àṣeyọrí")}
          </button>
        </div>

        <div style={{
          background: "#10b981",
          color: "white",
          padding: "1rem",
          borderRadius: "8px",
          fontSize: "0.9rem"
        }}>
          <strong>✓ WORKING:</strong> {t("Learning page is now stable and visible", "Ojú ewé ẹ̀kọ́ ti dúró ṣinṣin tí ó sì han")}
        </div>
      </div>
    </div>
  );
}