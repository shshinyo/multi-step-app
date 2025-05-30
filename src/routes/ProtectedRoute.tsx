import { useLocation, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { toast } from "react-toastify";
import { useRef } from "react";

const stepRequirements = {
  step2: (form: RootState["form"]) => form.name && form.email,
  step3: (form: RootState["form"]) =>
    form.name && form.email && form.address && form.preferences?.length,
  step4: (form: RootState["form"]) =>
    form.name &&
    form.email &&
    form.address &&
    form.preferences?.length &&
    form.workersPreferences?.length,
};

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const form = useSelector((state: RootState) => state.form);
  const location = useLocation();
  const step = location.pathname.replace("/", "");
  const toastId = useRef<any>(null);

  const isAllowed =
    stepRequirements[step as keyof typeof stepRequirements]?.(form);

  if (!isAllowed) {
    setTimeout(() => {
      if (!toast.isActive(toastId.current || ""))
        toastId.current = toast.error(
          "Please complete the previous steps before proceeding.",
          { toastId: "step-protection" },
        );
    }, 100);

    return <Navigate to={"/step1"} replace />;
  }

  return children;
};

export default ProtectedRoute;
