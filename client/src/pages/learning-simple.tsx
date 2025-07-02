function LearningSimple() {
  return (
    <div style={{
      position: "fixed",
      top: "0",
      left: "0", 
      right: "0",
      bottom: "0",
      backgroundColor: "#1e40af",
      color: "white",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "2rem",
      fontWeight: "bold",
      zIndex: "99999",
      fontFamily: "system-ui, -apple-system, sans-serif"
    }}>
      <div style={{
        backgroundColor: "white",
        color: "#1e40af", 
        padding: "3rem",
        borderRadius: "20px",
        textAlign: "center",
        maxWidth: "500px",
        boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
      }}>
        <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>🎓</div>
        
        <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
          Orisha Learning Academy
        </h1>
        
        <p style={{ fontSize: "1.2rem", color: "#6b7280", marginBottom: "2rem" }}>
          Personalized Yoruba spiritual learning
        </p>
        
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "1rem",
          marginBottom: "2rem"
        }}>
          <div style={{
            backgroundColor: "#f0f8ff",
            padding: "1rem",
            borderRadius: "10px",
            textAlign: "center"
          }}>
            <div style={{ fontSize: "2rem" }}>🌊</div>
            <div style={{ fontSize: "1rem", color: "#1e40af", fontWeight: "bold" }}>Olókun</div>
          </div>
          
          <div style={{
            backgroundColor: "#fff8e1", 
            padding: "1rem",
            borderRadius: "10px",
            textAlign: "center"
          }}>
            <div style={{ fontSize: "2rem" }}>💛</div>
            <div style={{ fontSize: "1rem", color: "#f59e0b", fontWeight: "bold" }}>Ọ̀ṣun</div>
          </div>
          
          <div style={{
            backgroundColor: "#f0f9ff",
            padding: "1rem", 
            borderRadius: "10px",
            textAlign: "center"
          }}>
            <div style={{ fontSize: "2rem" }}>💙</div>
            <div style={{ fontSize: "1rem", color: "#0ea5e9", fontWeight: "bold" }}>Yemọja</div>
          </div>
        </div>
        
        <button style={{
          backgroundColor: "#10b981",
          color: "white",
          border: "none",
          padding: "1rem 2rem",
          borderRadius: "8px",
          fontSize: "1.2rem",
          fontWeight: "bold",
          cursor: "pointer",
          width: "100%"
        }}>
          START LEARNING JOURNEY
        </button>
        
        <div style={{
          marginTop: "1rem",
          padding: "0.5rem",
          backgroundColor: "#10b981",
          color: "white",
          borderRadius: "6px",
          fontSize: "0.9rem"
        }}>
          ✓ LEARNING PAGE NOW VISIBLE
        </div>
      </div>
    </div>
  );
}

export default LearningSimple;