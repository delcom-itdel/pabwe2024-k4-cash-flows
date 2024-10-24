import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  asyncAddCashFlow,
  addCashFlowActionCreator,
} from "../states/cash-flows/action";
import CashFlowInput from "../components/CashFlowsInput";
import { useNavigate } from "react-router-dom";

function CashFlowAddPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAddCashFlow = false } = useSelector((state) => state);

  useEffect(() => {
    if (isAddCashFlow) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Cash flow berhasil ditambahkan!",
        showConfirmButton: false,
        timer: 700,
      });
      navigate("/");
      dispatch(addCashFlowActionCreator(false));
    }
  }, [isAddCashFlow, navigate, dispatch]);

  const onAddCashFlow = (data) => {
    dispatch(asyncAddCashFlow(data));
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
