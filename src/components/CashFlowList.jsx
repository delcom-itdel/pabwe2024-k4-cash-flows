import PropTypes from "prop-types";
import CashFlowItem from "./CashFlowItem";

function CashFlowList({ cashFlows, onDeleteCashFlow }) {
  // Tambahkan onDeleteCashFlow sebagai parameter
  console.log("CashFlows received in CashFlowList:", cashFlows);
  if (cashFlows.length === 0) {
    return <p>Tidak ada cash flow tersedia.</p>;
  }

  return (
    <div>
      {/* Map melalui daftar cashFlows dan render CashFlowItem untuk setiap item */}
      {cashFlows.map((cashFlow) => (
        <CashFlowItem
          key={cashFlow.id}
          cashFlow={cashFlow}
          onDeleteCashFlow={onDeleteCashFlow} // Meneruskan fungsi penghapusan
        />
      ))}
    </div>
  );
}

// Mendefinisikan prop types untuk memvalidasi props yang diteruskan ke CashFlowList
CashFlowList.propTypes = {
  cashFlows: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      label: PropTypes.string.isRequired,
      nominal: PropTypes.number.isRequired,
      type: PropTypes.string.isRequired,
    })
  ).isRequired,
  onDeleteCashFlow: PropTypes.func.isRequired, // Tambahkan prop type untuk onDeleteCashFlow
};

export default CashFlowList;
