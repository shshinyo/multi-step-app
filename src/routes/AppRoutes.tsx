import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

const Step1 = lazy(() => import("../pages/stepper/Step1"));
const Step2 = lazy(() => import("../pages/stepper/Step2"));
const Step3 = lazy(() => import("../pages/stepper/Step3"));
const Step4 = lazy(() => import("../pages/stepper/Step4"));
const Users = lazy(() => import("../pages/UserTable"));
const Home = lazy(() => import("../pages/stepper/Step1"));
const NotFound = lazy(() => import("../pages/NotFound"));

const AppRoutes = () => (
  <Suspense fallback={<div className="text-center py-10">Loading...</div>}>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/step1" element={<Step1 />} />

      <Route
        path="/step2"
        element={
          <ProtectedRoute>
            <Step2 />
          </ProtectedRoute>
        }
      />
      <Route
        path="/step3"
        element={
          <ProtectedRoute>
            <Step3 />
          </ProtectedRoute>
        }
      />
      <Route
        path="/step4"
        element={
          <ProtectedRoute>
            <Step4 />
          </ProtectedRoute>
        }
      />

      <Route path="/users" element={<Users />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Suspense>
);

export default AppRoutes;
