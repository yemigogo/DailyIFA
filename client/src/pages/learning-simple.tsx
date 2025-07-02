import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function LearningSimple() {
  const { language, t } = useLanguage();
  const [selectedTab, setSelectedTab] = useState("paths");

  // Mock data - in real app, fetch from API
  const userStats = {
    totalPaths: 5,
    completedModules: 0,
    timeSpent: 0,
    badgesEarned: 0,
    averageProgress: 0
  };

  const availableOrishas = [
    {
      name: "Olókun",
      nameYoruba: "Olókun",
      description: "Ocean deity of wisdom and mysteries",
      descriptionYoruba: "Òrìṣà òkun ọgbọ́n àti àwọn ohun ìjìnlẹ̀",
      icon: "🌊",
      difficulty: "intermediate",
      hasAuthentic: true,
      progress: 0
    },
    {
      name: "Ọya",
      nameYoruba: "Ọya", 
      description: "Wind goddess of transformation",
      descriptionYoruba: "Òrìṣà afẹ́fẹ́ àyípadà",
      icon: "💨",
      difficulty: "advanced",
      hasAuthentic: true,
      progress: 0
    },
    {
      name: "Yemọja",
      nameYoruba: "Yemọja",
      description: "Motherly waters and fertility",
      descriptionYoruba: "Ọmọ omi àti ìbísí",
      icon: "💙",
      difficulty: "beginner",
      hasAuthentic: true,
      progress: 0
    },
    {
      name: "Ọ̀ṣun",
      nameYoruba: "Ọ̀ṣun",
      description: "River goddess of love and abundance",
      descriptionYoruba: "Òrìṣà odò ìfẹ́ àti ọ̀pọ̀lọpọ̀",
      icon: "💛",
      difficulty: "beginner", 
      hasAuthentic: true,
      progress: 0
    },
    {
      name: "Ọbàtálá",
      nameYoruba: "Ọbàtálá",
      description: "Father of creation and wisdom",
      descriptionYoruba: "Baba ìṣẹ̀dá àti ọgbọ́n",
      icon: "🤍",
      difficulty: "advanced",
      hasAuthentic: true,
      progress: 0
    }
  ];

  const achievements = [
    {
      id: 1,
      name: "Spiritual Seeker",
      nameYoruba: "Wa-ẹ̀mí Wíwá",
      description: "Started your first learning path",
      descriptionYoruba: "Bẹ̀rẹ̀ ọ̀nà ẹ̀kọ́ àkọ́kọ́ rẹ",
      icon: "🌟",
      category: "learning",
      isRare: false,
      isEarned: false
    },
    {
      id: 2,
      name: "Voice of Tradition",
      nameYoruba: "Ohùn Àṣà",
      description: "Completed pronunciation module",
      descriptionYoruba: "Parí ẹ̀ka ìpè",
      icon: "🎵",
      category: "pronunciation",
      isRare: true,
      isEarned: false
    },
    {
      id: 3,
      name: "Orisha Devotee",
      nameYoruba: "Olóòtẹ́ Òrìṣà",
      description: "Learned about 3 different Orishas",
      descriptionYoruba: "Kọ́ nípa Òrìṣà mẹ́ta",
      icon: "⭐",
      category: "spiritual",
      isRare: false,
      isEarned: false
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner": return "bg-green-100 text-green-800";
      case "intermediate": return "bg-yellow-100 text-yellow-800"; 
      case "advanced": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #f0f8ff 0%, #ffffff 50%, #fff8e1 100%)",
      padding: "1rem"
    }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem 0" }}>
        
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "80px",
            height: "80px",
            background: "linear-gradient(135deg, #1e40af, #f59e0b)",
            borderRadius: "50%",
            marginBottom: "1rem"
          }}>
            <span style={{ fontSize: "2rem" }}>🎓</span>
          </div>
          <h1 style={{
            fontSize: "2.5rem",
            fontWeight: "bold",
            color: "#1e40af",
            marginBottom: "1rem"
          }}>
            {t("Orisha Learning Academy", "Ilé-ẹ̀kọ́ Òrìṣà")}
          </h1>
          <p style={{
            fontSize: "1.2rem",
            color: "#6b7280",
            maxWidth: "600px",
            margin: "0 auto"
          }}>
            {t(
              "Master authentic Yoruba traditions through personalized learning paths",
              "Mọ àwọn àṣà Yorùbá òtítọ́ nípa àwọn ọ̀nà ẹ̀kọ́ ti ara rẹ"
            )}
          </p>
        </div>

        {/* Stats Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "1.5rem",
          marginBottom: "3rem"
        }}>
          <div style={{
            background: "white",
            padding: "1.5rem",
            borderRadius: "12px",
            textAlign: "center",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
          }}>
            <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>📈</div>
            <div style={{ fontSize: "2rem", fontWeight: "bold", color: "#10b981", marginBottom: "0.5rem" }}>
              {userStats.averageProgress}%
            </div>
            <div style={{ fontSize: "0.9rem", color: "#6b7280" }}>
              {t("Average Progress", "Ìlọsíwájú Àpapọ̀")}
            </div>
          </div>

          <div style={{
            background: "white",
            padding: "1.5rem",
            borderRadius: "12px",
            textAlign: "center",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
          }}>
            <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>⏱️</div>
            <div style={{ fontSize: "2rem", fontWeight: "bold", color: "#3b82f6", marginBottom: "0.5rem" }}>
              {Math.round(userStats.timeSpent / 60)}h
            </div>
            <div style={{ fontSize: "0.9rem", color: "#6b7280" }}>
              {t("Time Spent", "Àkókò Lò")}
            </div>
          </div>

          <div style={{
            background: "white",
            padding: "1.5rem",
            borderRadius: "12px",
            textAlign: "center",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
          }}>
            <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>📚</div>
            <div style={{ fontSize: "2rem", fontWeight: "bold", color: "#8b5cf6", marginBottom: "0.5rem" }}>
              {userStats.completedModules}
            </div>
            <div style={{ fontSize: "0.9rem", color: "#6b7280" }}>
              {t("Modules Done", "Àwọn Ẹ̀ka Parí")}
            </div>
          </div>

          <div style={{
            background: "white",
            padding: "1.5rem",
            borderRadius: "12px",
            textAlign: "center",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
          }}>
            <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>🏆</div>
            <div style={{ fontSize: "2rem", fontWeight: "bold", color: "#f59e0b", marginBottom: "0.5rem" }}>
              {userStats.badgesEarned}
            </div>
            <div style={{ fontSize: "0.9rem", color: "#6b7280" }}>
              {t("Badges", "Àwọn Àmì")}
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "2rem",
          borderBottom: "1px solid #e5e7eb"
        }}>
          {[
            { id: "paths", label: t("Learning Paths", "Àwọn Ọ̀nà Ẹ̀kọ́"), icon: "🎯" },
            { id: "achievements", label: t("Achievements", "Àwọn Àṣeyọrí"), icon: "🏆" },
            { id: "recommendations", label: t("Recommendations", "Àwọn Ìmọ̀ràn"), icon: "🧠" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id)}
              style={{
                padding: "1rem 2rem",
                background: selectedTab === tab.id ? "#1e40af" : "transparent",
                color: selectedTab === tab.id ? "white" : "#6b7280",
                border: "none",
                borderRadius: "8px 8px 0 0",
                cursor: "pointer",
                fontWeight: selectedTab === tab.id ? "bold" : "normal",
                transition: "all 0.2s",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem"
              }}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {selectedTab === "paths" && (
          <div>
            <h2 style={{
              fontSize: "1.8rem",
              fontWeight: "bold",
              color: "#1e40af",
              marginBottom: "2rem",
              textAlign: "center"
            }}>
              {t("Available Orisha Learning Paths", "Àwọn Ọ̀nà Ẹ̀kọ́ Òrìṣà Tó Wà")}
            </h2>
            
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "1.5rem"
            }}>
              {availableOrishas.map((orisha) => (
                <div
                  key={orisha.name}
                  style={{
                    background: "white",
                    borderRadius: "12px",
                    padding: "1.5rem",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    transition: "transform 0.2s, box-shadow 0.2s",
                    cursor: "pointer"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = "0 8px 12px rgba(0, 0, 0, 0.15)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
                  }}
                >
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "1rem"
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                      <div style={{ fontSize: "2rem" }}>{orisha.icon}</div>
                      <div>
                        <h3 style={{ fontSize: "1.2rem", fontWeight: "bold", color: "#1f2937" }}>
                          {orisha.name}
                        </h3>
                        <p style={{ fontSize: "0.9rem", color: "#6b7280" }}>
                          {language === "english" ? orisha.description : orisha.descriptionYoruba}
                        </p>
                      </div>
                    </div>
                    {orisha.hasAuthentic && (
                      <span style={{
                        background: "#10b981",
                        color: "white",
                        fontSize: "0.7rem",
                        padding: "0.25rem 0.5rem",
                        borderRadius: "9999px",
                        fontWeight: "bold"
                      }}>
                        {t("Authentic", "Òtítọ́")}
                      </span>
                    )}
                  </div>

                  <div style={{ marginBottom: "1rem" }}>
                    <div style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: "0.9rem",
                      marginBottom: "0.5rem"
                    }}>
                      <span>{t("Progress", "Ìlọsíwájú")}</span>
                      <span>{orisha.progress}%</span>
                    </div>
                    <div style={{
                      width: "100%",
                      height: "6px",
                      background: "#e5e7eb",
                      borderRadius: "3px",
                      overflow: "hidden"
                    }}>
                      <div style={{
                        width: `${orisha.progress}%`,
                        height: "100%",
                        background: "linear-gradient(90deg, #10b981, #3b82f6)",
                        transition: "width 0.3s"
                      }} />
                    </div>
                  </div>

                  <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontSize: "0.9rem",
                    marginBottom: "1rem"
                  }}>
                    <span>{t("4 modules available", "Àwọn ẹ̀ka mẹ́rin wà")}</span>
                    <span className={getDifficultyColor(orisha.difficulty)} style={{
                      padding: "0.25rem 0.5rem",
                      borderRadius: "6px",
                      fontSize: "0.8rem",
                      fontWeight: "bold"
                    }}>
                      {t(
                        orisha.difficulty.charAt(0).toUpperCase() + orisha.difficulty.slice(1),
                        orisha.difficulty === "beginner" ? "Tuntun" :
                        orisha.difficulty === "intermediate" ? "Àárín" : "Gíga"
                      )}
                    </span>
                  </div>

                  <button style={{
                    width: "100%",
                    background: "linear-gradient(135deg, #1e40af, #3b82f6)",
                    color: "white",
                    border: "none",
                    padding: "0.75rem",
                    borderRadius: "8px",
                    fontWeight: "bold",
                    cursor: "pointer",
                    transition: "transform 0.2s"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.02)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                  >
                    {t("Start Learning", "Bẹ̀rẹ̀ Ẹ̀kọ́")}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedTab === "achievements" && (
          <div>
            <h2 style={{
              fontSize: "1.8rem",
              fontWeight: "bold",
              color: "#1e40af",
              marginBottom: "2rem",
              textAlign: "center"
            }}>
              {t("Achievement Badges", "Àwọn Àmì Àṣeyọrí")}
            </h2>
            
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "1.5rem"
            }}>
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  style={{
                    background: achievement.isEarned ? "white" : "#f9fafb",
                    borderRadius: "12px",
                    padding: "1.5rem",
                    textAlign: "center",
                    boxShadow: achievement.isEarned ? "0 4px 6px rgba(0, 0, 0, 0.1)" : "0 2px 4px rgba(0, 0, 0, 0.05)",
                    opacity: achievement.isEarned ? 1 : 0.6,
                    border: achievement.isRare ? "2px solid #f59e0b" : "1px solid #e5e7eb"
                  }}
                >
                  <div style={{
                    fontSize: "3rem",
                    marginBottom: "1rem",
                    filter: achievement.isEarned ? "none" : "grayscale(1)"
                  }}>
                    {achievement.icon}
                  </div>
                  
                  <h3 style={{
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                    color: achievement.isEarned ? "#1f2937" : "#9ca3af",
                    marginBottom: "0.5rem"
                  }}>
                    {language === "english" ? achievement.name : achievement.nameYoruba}
                  </h3>
                  
                  <p style={{
                    fontSize: "0.9rem",
                    color: achievement.isEarned ? "#6b7280" : "#9ca3af",
                    marginBottom: "1rem"
                  }}>
                    {language === "english" ? achievement.description : achievement.descriptionYoruba}
                  </p>
                  
                  {achievement.isRare && (
                    <span style={{
                      background: "#f59e0b",
                      color: "white",
                      fontSize: "0.7rem",
                      padding: "0.25rem 0.5rem",
                      borderRadius: "9999px",
                      fontWeight: "bold"
                    }}>
                      ⭐ {t("Rare", "Pàtàkì")}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedTab === "recommendations" && (
          <div>
            <h2 style={{
              fontSize: "1.8rem",
              fontWeight: "bold",
              color: "#1e40af",
              marginBottom: "2rem",
              textAlign: "center"
            }}>
              {t("Personalized Recommendations", "Àwọn Ìmọ̀ràn Ti Ara Rẹ")}
            </h2>
            
            <div style={{
              background: "white",
              borderRadius: "12px",
              padding: "2rem",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
            }}>
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                padding: "1.5rem",
                background: "#f0f8ff",
                borderRadius: "8px",
                marginBottom: "1.5rem"
              }}>
                <div style={{ fontSize: "2rem" }}>💙</div>
                <div>
                  <h3 style={{ fontSize: "1.2rem", fontWeight: "bold", color: "#1e40af" }}>
                    {t("Start with Yemọja", "Bẹ̀rẹ̀ pẹ̀lú Yemọja")}
                  </h3>
                  <p style={{ color: "#6b7280" }}>
                    {t("Perfect for beginners - gentle introduction to Orisha wisdom", 
                       "Ó dára fún àwọn tuntun - ìfihàn rọ̀rà sí ọgbọ́n Òrìṣà")}
                  </p>
                </div>
                <button style={{
                  background: "#1e40af",
                  color: "white",
                  border: "none",
                  padding: "0.5rem 1rem",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontWeight: "bold"
                }}>
                  {t("Start", "Bẹ̀rẹ̀")}
                </button>
              </div>
              
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                padding: "1.5rem",
                background: "#fffbeb",
                borderRadius: "8px"
              }}>
                <div style={{ fontSize: "2rem" }}>💛</div>
                <div>
                  <h3 style={{ fontSize: "1.2rem", fontWeight: "bold", color: "#f59e0b" }}>
                    {t("Try Ọ̀ṣun Next", "Gbìyànjú Ọ̀ṣun Tókàn")}
                  </h3>
                  <p style={{ color: "#6b7280" }}>
                    {t("Learn about love and abundance - also beginner friendly", 
                       "Kọ́ nípa ìfẹ́ àti ọ̀pọ̀lọpọ̀ - tún rọrùn fún àwọn tuntun")}
                  </p>
                </div>
                <button style={{
                  background: "#f59e0b",
                  color: "white",
                  border: "none",
                  padding: "0.5rem 1rem",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontWeight: "bold"
                }}>
                  {t("Explore", "Ṣawárí")}
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}