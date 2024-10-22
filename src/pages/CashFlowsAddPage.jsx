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
  const { isAddCashFlowSuccess = false } = useSelector((state) => state);

  useEffect(() => {
    if (isAddCashFlowSuccess) {
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
  }, [isAddCashFlowSuccess, navigate, dispatch]);

  const onAddCashFlow = (data) => {
    dispatch(asyncAddCashFlow(data));
  };

  return (
    <section>
      <div className="container pt-1">
        <h3>Tambah Cash Flow</h3>
        <CashFlowInput onAddCashFlow={onAddCashFlow} />
      </div>
    </section>
  );
}

export default CashFlowAddPage;
