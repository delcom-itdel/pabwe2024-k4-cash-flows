import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../utils/api";

function CashFlowLabels() {
  const [cashFlows, setCashFlows] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchLabels() {
      try {
        const token = api.getAccessToken();
        console.log("Token:", token);

        if (!token) {
          throw new Error("No valid token found");
        }

        const fetchedCashFlows = await api.getAllCashFlows();
        setCashFlows(fetchedCashFlows);
      } catch (error) {
        setError(error.message);
      }
    }
    fetchLabels();
  }, []);

  return (
    <div className="container mt-5">
      <h1>Cash Flow Labels</h1>
      {error ? (
        <p>Error: {error}</p>
      ) : (
        <ul className="list-group">
          {cashFlows.length > 0 ? (
            cashFlows.map((cashFlow) => (
              <li key={cashFlow.id} className="list-group-item">
                <Link to={`/cash-flows/${cashFlow.id}`}>{cashFlow.label}</Link>
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

export default CashFlowLabels;
