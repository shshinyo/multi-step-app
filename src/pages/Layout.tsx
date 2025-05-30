import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import Wizard from "../components/stepsWizard";
import useSaveStepToSessionStorage from "../hooks/useSaveStepToSessionStorage";
import DarkModeToggle from "../components/DarkModeToggle";
import AppRoutes from "../routes/AppRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Layout = () => {
  const location = useLocation();
  const step = useSelector((state: RootState) => state.form.currentStep);
  useSaveStepToSessionStorage("currentStep", step);

  const showWizard = useMemo(
    () =>
      ["/", "/step1", "/step2", "/step3", "/step4"].includes(location.pathname),
    [location.pathname],
  );

  return (
    <div className="min-h-screen bg-card-secondary dark:bg-gray-900 text-black dark:text-white p-4 transition-colors">
      <div className="flex justify-end mb-4">
        <DarkModeToggle />
      </div>
      {showWizard && <Wizard order={step} />}
      <AppRoutes />
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};
