import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  asyncDetailCashFlow,
  asyncUpdateCashFlow,
  updateCashFlowActionCreator,
} from "../states/cash-flows/action";

const CashFlowsUpdatePage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cashFlow = useSelector((state) => state.cashFlows.cashFlow);
  const isUpdateCashFlow = useSelector((state) => state.cashFlows.isUpdateCashFlow);

  const [formData, setFormData] = useState({
    type: "",
    source: "",
    label: "",
    description: "",
    nominal: 0,
  });

  useEffect(() => {
    dispatch(asyncDetailCashFlow(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (cashFlow) {
      setFormData({
        type: cashFlow.type,
        source: cashFlow.source,
        label: cashFlow.label,
        description: cashFlow.description,
        nominal: cashFlow.nominal,
      });
    }
  }, [cashFlow]);

  useEffect(() => {
    if (isUpdateCashFlow) {
      navigate(`/cashflows/${id}`);
      dispatch(updateCashFlowActionCreator(false));
    }
  }, [isUpdateCashFlow, navigate, id, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(asyncUpdateCashFlow({ id, ...formData }));
  };

  return (
    <div className="container" style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Edit Cash Flow</h1>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <div>
          <label htmlFor="type" style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
            Type:
          </label>
          <input
            type="text"
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
          />
        </div>
        <div>
          <label htmlFor="source" style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
            Source:
          </label>
          <input
            type="text"
            id="source"
            name="source"
            value={formData.source}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
          />
        </div>
        <div>
          <label htmlFor="label" style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
            Label:
          </label>
          <input
            type="text"
            id="label"
            name="label"
            value={formData.label}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
          />
        </div>
        <div>
          <label htmlFor="description" style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
            Description:
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
          />
        </div>
        <div>
          <label htmlFor="nominal" style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
            Nominal:
          </label>
          <input
            type="number"
            id="nominal"
            name="nominal"
            value={formData.nominal}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
          />
        </div>
        <button
          type="submit"
          style={{ padding: "10px 20px", backgroundColor: "#007bff", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }}
        >
          Update Cash Flow
        </button>
      </form>
    </div>
  );
};

export default CashFlowsUpdatePage;
