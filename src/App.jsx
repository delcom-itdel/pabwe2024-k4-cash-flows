import { useEffect } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { asyncPreloadProcess } from "./states/isPreload/action";
import { asyncUnsetAuthLogin } from "./states/authLogin/action";
import Loading from "./components/Loading";
import Navigation from "./components/Navigation";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import ProfilePage from "./pages/ProfilePage";
import CashFlowsAddPage from "./pages/CashFlowsAddPage";
import CashFlowsUpdatePage from "./pages/CashFlowsUpdatePage";
import CashFlowsDetailPage from "./pages/CashFlowsDetailPage";
import CashFlowsLabelsPage from "./pages/CashFlowsLabelsPage";
import CashFlowsStatsDailyPage from "./pages/CashFlowsStatsDailyPage";
import CashFlowsStatsMonthlyPage from "./pages/CashFLowsStatsMonthlyPage";

function App() {
  const authLogin = useSelector((state) => state.authLogin || null);
  const isPreload = useSelector((state) => state.isPreload || false);
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  const onAuthSignOut = () => {
    dispatch(asyncUnsetAuthLogin());
  };

  if (isPreload) {
    return null;
  }

  if (authLogin === null) {
    const activeRegister = location.pathname === "/register" ? "active" : "";
    const activeLogin = location.pathname !== "/register" ? "active" : "";
    return (
      <div>
        <header className="fixed-top">
          <Loading />
        </header>
        <div className="w-300px mx-auto mt-5">
          <div className="card shadow-sm">
            <div className="text-center py-2">
              <h2>Cash Flow App</h2>
            </div>
            <ul className="nav nav-pills mb-3">
              <li className="nav-item w-50 textcenter">
                <Link className={`nav-link ${activeLogin} btl`} to="/">
                  Login
                </Link>
              </li>
              <li className="nav-item w-50 textcenter">
                <Link
                  className={`nav-link ${activeRegister} btl`}
                  to="/register"
                >
                  Register
                </Link>
              </li>
            </ul>
            <Routes>
              <Route path="/*" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </Routes>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div>
        <header className="fixed-top">
          <Navigation authLogin={authLogin} onAuthSignOut={onAuthSignOut} />
          <Loading />
        </header>
        <main className="margin-main">
          <Routes>
            <Route path="/*" element={<NotFoundPage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/users/me" element={<ProfilePage />} />
            <Route path="/cash-flows/:id" element={<CashFlowsDetailPage />} />
            <Route
              path="/cash-flows/:id/edit"
              element={<CashFlowsUpdatePage />}
            />
            <Route path="/cash-flows/add" element={<CashFlowsAddPage />} />
            <Route
              path="/cash-flows/labels"
              element={<CashFlowsLabelsPage />}
            />
            <Route
              path="/cash-flows/stats/daily"
              element={<CashFlowsStatsDailyPage />}
            />
            <Route
              path="/cash-flows/stats/monthly"
              element={<CashFlowsStatsMonthlyPage />}
            />
          </Routes>
        </main>
      </div>
    </>
  );
}

export default App;
