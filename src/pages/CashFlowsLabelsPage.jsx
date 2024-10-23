import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link untuk navigasi
import api from "../utils/api"; // Pastikan path ini benar dan mengarah ke file `api.js`

function CashFlowLabels() {
  const [cashFlows, setCashFlows] = useState([]); // Simpan cashFlows, bukan hanya labels
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchLabels() {
      try {
        const token = api.getAccessToken();
        console.log("Token:", token); // Logging token

        if (!token) {
          throw new Error("No valid token found");
        }

        const fetchedCashFlows = await api.getAllCashFlows();
        setCashFlows(fetchedCashFlows); // Simpan seluruh data cash flow
      } catch (error) {
        setError(error.message);
      }
    }
    fetchLabels();
  }, []);

  return (
    <div className="container mt-5 d-flex justify-content-center">
      {/* Kontainer di tengah dengan lebar maksimal 50% */}
      <div className="w-50">
        <h1 className="text-black text-center mb-4">Cash Flow Labels</h1>
        {error ? (
          <p className="text-danger text-center">Error: {error}</p>
        ) : (
          <ul className="list-group">
            {cashFlows.length > 0 ? (
              cashFlows.map((cashFlow) => (
                <li
                  key={cashFlow.id}
                  className="list-group-item mb-4 border rounded d-flex align-items-center justify-content-center cashflow-item" // Border melengkung dengan konten di tengah
                  style={{
                    borderRadius: "15px", // Membuat border melengkung
                    height: "60px", // Menetapkan tinggi tetap untuk border
                    backgroundColor: "#fff", // Latar belakang warna putih
                    transition: "all 0.3s ease", // Transisi animasi pada hover
                  }}
                >
                  {/* Gunakan Link untuk navigasi ke halaman detail */}
                  <Link
                    to={`/cashflows/${cashFlow.id}`}
                    className="text-black text-decoration-none"
                    style={{ fontSize: "18px", fontWeight: "bold" }}
                  >
                    {cashFlow.label}
                  </Link>
                </li>
              ))
            ) : (
              <li className="list-group-item text-center">
                No Cash Flow Labels Available
              </li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
}

export default CashFlowLabels;
