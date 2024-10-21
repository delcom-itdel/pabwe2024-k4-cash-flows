import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Untuk navigasi
import api from "../utils/api"; // Pastikan path ini benar dan mengarah ke file api.js

function CashFlowLabelsPage() {
  const [labels, setLabels] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Untuk melakukan navigasi

  useEffect(() => {
    async function fetchLabels() {
      try {
        const token = api.getAccessToken();
        console.log("Token:", token); // Logging token

        if (!token) {
          throw new Error("No valid token found");
        }

        const cashFlows = await api.getAllCashFlows();
        const cashFlowLabels = cashFlows.map((cashFlow) => ({
          id: cashFlow.id,
          label: cashFlow.label,
        }));
        setLabels(cashFlowLabels);
      } catch (error) {
        setError(error.message);
      }
    }
    fetchLabels();
  }, []);

  // Fungsi untuk menangani klik label dan navigasi ke halaman detail
  const handleLabelClick = (id) => {
    navigate(`/cashflows/${id}`); // Menggunakan navigate untuk navigasi
  };

  return (
    <div className="container mt-4">
      <h1>Cash Flow Labels</h1>
      {error ? (
        <p>Error: {error}</p>
      ) : (
        <ul className="list-group">
          {labels.length > 0 ? (
            labels.map((cashFlow) => (
              <li
                key={cashFlow.id}
                className="list-group-item"
                onClick={() => handleLabelClick(cashFlow.id)} // Navigasi ketika label diklik
                style={{ cursor: "pointer" }} // Mengubah cursor jadi pointer
              >
                {cashFlow.label}
              </li>
            ))
          ) : (
            <li className="list-group-item">No Cash Flow Labels Available</li>
          )}
        </ul>
      )}
    </div>
  );
}

export default CashFlowLabelsPage;
