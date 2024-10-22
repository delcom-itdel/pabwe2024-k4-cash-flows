import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncAddCashFlow, addCashFlowActionCreator } from "../states/cash-flows/action";
import CashFlowInput from "../components/CashFlowsInput";
import { useNavigate } from "react-router-dom";

function CashFlowAddPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAddCashFlowSuccess = useSelector((state) => state.cashFlows.isAddCashFlowSuccess);

  useEffect(() => {
    if (isAddCashFlowSuccess) {
      navigate("/");
      dispatch(addCashFlowActionCreator(false));
    }
  }, [isAddCashFlowSuccess, navigate, dispatch]);

  const onAddCashFlow = ({ type, source, label, description, nominal }) => {
    dispatch(asyncAddCashFlow({ type, source, label, description, nominal }));
  };

  return (
    <section>
      <div className="container pt-1">
        <CashFlowInput onAddCashFlow={onAddCashFlow} />
      </div>
    </section>
  );
}

export default CashFlowAddPage;
