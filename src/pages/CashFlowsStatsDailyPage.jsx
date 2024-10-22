import React, { useState, useEffect } from "react";
import api from "../utils/api";

function getCurrentDateTime() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")} ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`;
}

function formatCurrency(value) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value);
}

const CashFlowStatsDailyPage = () => {
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
        const result = await api.getStatsDaily({ end_date: endDate, total_data: 7 });

        const inflow = {};
        const outflow = {};
        const total = {};

        Object.keys(result.stats_inflow).forEach((date) => {
          inflow[date] = formatCurrency(parseFloat(result.stats_inflow[date]));
          outflow[date] = formatCurrency(parseFloat(result.stats_outflow[date]));
          total[date] = formatCurrency(parseFloat(result.stats_inflow[date] - result.stats_outflow[date]));
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
      <h1>Daily Cash Flow Stats</h1>
      {error ? <p>Error: {error}</p> : null}
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Inflow</th>
            <th>Outflow</th>
            <th>Total Cash Flow</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(cashFlowData.total).map((date) => (
            <tr key={date}>
              <td>{date}</td>
              <td>{cashFlowData.inflow[date]}</td>
              <td>{cashFlowData.outflow[date]}</td>
              <td>{cashFlowData.total[date]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CashFlowStatsDailyPage;
