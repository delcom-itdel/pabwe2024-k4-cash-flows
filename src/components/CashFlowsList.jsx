import PropTypes from "prop-types";
import CashFlowItem from "./CashFlowsItem";

function CashFlowList({ cashFlows, onDeleteCashFlow }) {
  if (cashFlows.length === 0) {
    return <p>Tidak ada cash flow tersedia.</p>;
  }

  return (
    <div>
      {cashFlows.map((cashFlow) => (
        <CashFlowItem
          key={cashFlow.id}
          cashFlow={cashFlow}
          onDeleteCashFlow={onDeleteCashFlow}
        />
      ))}
    </div>
  );
}

CashFlowList.propTypes = {
  cashFlows: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      label: PropTypes.string.isRequired,
      nominal: PropTypes.number.isRequired,
      type: PropTypes.string.isRequired,
    })
  ).isRequired,
  onDeleteCashFlow: PropTypes.func.isRequired,
};

export default CashFlowList;
