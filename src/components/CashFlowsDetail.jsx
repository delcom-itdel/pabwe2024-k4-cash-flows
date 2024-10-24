import PropTypes from "prop-types";
import { cashFlowItemShape } from "./CashFlowsItem";
import { postedAt } from "../utils/tools";
import { FaClock } from "react-icons/fa6";

function CashFlowDetail({ cashFlow }) {
  let badgeStatus, badgeLabel;
  if (cashFlow.type.toLowerCase() === "inflow") {
    badgeStatus = "badge bg-success text-white ms-3";
    badgeLabel = "Inflow";
  } else if (cashFlow.type.toLowerCase() === "outflow") {
    badgeStatus = "badge bg-warning text-dark ms-3";
    badgeLabel = "Outflow";
  }

  return (
    <div className="card mt-3">
      <div className="card-body">
        <div className="row align-items-center">
          <div className="col-12 d-flex">
            <h5>{cashFlow.label}</h5>
            <div>
              <span className={badgeStatus}>{badgeLabel}</span>
            </div>
          </div>
          <div className="col-12">
            <div className="text-sm op-5">
              <FaClock />
              <span className="ps-2">{postedAt(cashFlow.created_at)}</span>
            </div>
          </div>
          <div className="col-12">
            <hr />
            {cashFlow.description}
          </div>
        </div>
      </div>
    </div>
  );
}

CashFlowDetail.propTypes = {
  cashflow: PropTypes.shape(cashFlowItemShape).isRequired,
};

export default CashFlowDetail;
