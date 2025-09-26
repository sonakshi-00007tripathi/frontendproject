import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import API_BASE_URL from "../config";

export default function Recommendations() {
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/recommend`, {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });

        const data = await res.json();
        console.log("✅ Recommendations:", data);
      } catch (err) {
        console.error("❌ Error fetching recommendations:", err);
      }
    };

    if (token) fetchRecommendations();
  }, [token]);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Recommendations Page</h2>
      <p>Check console for API data 👀</p>
    </div>
  );
}
