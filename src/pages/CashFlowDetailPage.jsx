import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { asyncDetailCashFlow } from "../states/cashFlow/action";

const CashFlowDetailPage = () => {
  const { id } = useParams(); // Get cash flow ID from URL
  const dispatch = useDispatch();

  // Get cash flow details from the state
  const cashFlow = useSelector((state) => state.detailCashFlow);

  // Fetch cash flow details when the page loads
  useEffect(() => {
    dispatch(asyncDetailCashFlow(id)); // Fetch cash flow details
  }, [dispatch, id]);

  if (!cashFlow) {
    return <p>Loading...</p>;
  }

  return (
    <div
      className="container"
      style={{ maxWidth: "600px", margin: "20px auto" }}
    >
      <div
        className="card"
        style={{
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div className="card-body">
          <h2 style={{ marginBottom: "10px" }}>{cashFlow.label}</h2>
          <p style={{ fontSize: "14px", color: "#888", marginBottom: "10px" }}>
            <strong>Type:</strong> {cashFlow.type} <br />
            <strong>Source:</strong> {cashFlow.source}
          </p>
          <p style={{ marginBottom: "15px" }}>{cashFlow.description}</p>
          <p style={{ marginBottom: "15px" }}>
            <strong>Nominal:</strong> Rp {cashFlow.nominal.toLocaleString()}
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span style={{ fontSize: "12px", color: "#666" }}>
              {new Date(cashFlow.created_at).toLocaleTimeString()} -{" "}
              {new Date(cashFlow.created_at).toLocaleDateString()}
            </span>
            <Link
              to={`/cashflows/${id}/edit`}
              className="btn btn-primary"
              style={{
                padding: "8px 12px",
                fontSize: "14px",
                backgroundColor: "#007bff",
                color: "#fff",
                textDecoration: "none",
                borderRadius: "4px",
                border: "none",
              }}
            >
              Edit
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CashFlowDetailPage;
