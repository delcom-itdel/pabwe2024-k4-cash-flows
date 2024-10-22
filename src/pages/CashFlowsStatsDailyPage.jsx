import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncGetStatsDaily } from "../states/cash-flows/action";

const CashFlowStatsDailyPage = () => {
  const dispatch = useDispatch();

  const statsDaily = useSelector((state) => state.cashFlow.statsDaily);
  const [loading, setLoading] = useState(true);

  // Ambil data hanya saat komponen pertama kali di-load
  useEffect(() => {
    dispatch(asyncGetStatsDaily()).finally(() => setLoading(false)); // Set loading ke false setelah action selesai
  }, [dispatch]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!statsDaily || !statsDaily.stats_inflow || !statsDaily.stats_outflow) {
    return <p>No data available.</p>;
  }

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
