import { useState } from "react";
import PropTypes from "prop-types";

function CashFlowInput({ onAddCashFlow }) {
  const [type, setType] = useState("");
  const [source, setSource] = useState("");
  const [label, setLabel] = useState("");
  const [description, setDescription] = useState("");
  const [nominal, setNominal] = useState("");

  function handleOnAddCashFlow(e) {
    e.preventDefault();
    if (type.trim() && source.trim() && label.trim() && description.trim() && nominal.trim()) {
      onAddCashFlow({ type, source, label, description, nominal: Number(nominal) });
    }
  }

  function handleLabel({ target }) {
    if (target.value.length <= 50) {
      setLabel(target.value);
    }
  }

  function handleDescription({ target }) {
    if (target.value.length <= 1000) {
      setDescription(target.value);
    }
  }

  return (
    <div className="card">
      <div className="card-body">
        <h3 className="ps-2">Buat Cash Flow</h3>
        <hr />
        <form onSubmit={handleOnAddCashFlow}>
          <div className="mb-3">
            <label htmlFor="inputType" className="form-label">Tipe</label>
            <select
              id="inputType"
              className="form-select"
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
            >
              <option value="">Pilih Tipe</option>
              <option value="inflow">Inflow</option>
              <option value="outflow">Outflow</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="inputSource" className="form-label">Sumber</label>
            <select
              id="inputSource"
              className="form-select"
              value={source}
              onChange={(e) => setSource(e.target.value)}
              required
            >
              <option value="">Pilih Sumber</option>
              <option value="cash">Cash</option>
              <option value="savings">Savings</option>
              <option value="loans">Loans</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="inputLabel" className="form-label">Label</label>
            <div className="input-group">
              <input
                type="text"
                id="inputLabel"
                onChange={handleLabel}
                value={label}
                className="form-control"
                required
              />
              <span className="input-group-text">{label.length}/50</span>
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="inputNominal" className="form-label">Nominal</label>
            <input
              type="number"
              id="inputNominal"
              value={nominal}
              onChange={(e) => setNominal(e.target.value)}
              className="form-control"
              required
            />
          </div>
          <div>
            <label htmlFor="inputDescription" className="form-label">Deskripsi</label>
            <textarea
              rows="5"
              id="inputDescription"
              onChange={handleDescription}
              value={description}
              className="form-control"
              required
            ></textarea>
            <div className="text-end">
              <span>{description.length}/1000</span>
            </div>
          </div>
          <div className="mb-4 text-end mt-3">
            <button type="submit" className="btn btn-primary">Simpan</button>
          </div>
        </form>
      </div>
    </div>
  );
}

CashFlowInput.propTypes = {
  onAddCashFlow: PropTypes.func.isRequired,
};

export default CashFlowInput;
