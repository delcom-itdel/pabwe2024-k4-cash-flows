import React, { useState, useEffect } from "react";
import api from "../utils/api";

function getCurrentDateTime() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(
    2,
    "0"
  )}-${String(now.getDate()).padStart(2, "0")} ${String(
    now.getHours()
  ).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(
    now.getSeconds()
  ).padStart(2, "0")}`;
}

function formatCurrency(value) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value);
}

function CashFlowStatsMonthlyPage() {
  const [cashFlowData, setCashFlowData] = useState({
    inflow: {},
    outflow: {},
    total: {},
  });
  const [error, setError] = useState("");

  useEffect(() => {
    const endDate = getCurrentDateTime();

    const fetchData = async () => {
      try {
        const result = await api.getStatsMonthly({
          end_date: endDate,
          total_data: 12,
        });

        // Format the data to float and then to Indonesian Rupiah
        const inflow = {};
        const outflow = {};
        const total = {};

        Object.keys(result.stats_inflow).forEach((month) => {
          inflow[month] = formatCurrency(
            parseFloat(result.stats_inflow[month])
          );
          outflow[month] = formatCurrency(
            parseFloat(result.stats_outflow[month])
          );
          total[month] = formatCurrency(
            parseFloat(result.stats_cashflow[month])
          );
        });

        setCashFlowData({
          inflow,
          outflow,
          total,
        });
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="cashflow-stats-container">
      <h1>Monthly Cash Flow Stats</h1>
      {error ? <p className="error-message">Error: {error}</p> : null}
      <table className="cashflow-table">
        <thead>
          <tr>
            <th>Month</th>
            <th>Inflow</th>
            <th>Outflow</th>
            <th>Total Cash Flow</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(cashFlowData.total).map((month) => (
            <tr key={month}>
              <td>{month}</td>
              <td>{cashFlowData.inflow[month]}</td>
              <td>{cashFlowData.outflow[month]}</td>
              <td>{cashFlowData.total[month]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CashFlowStatsMonthlyPage;
