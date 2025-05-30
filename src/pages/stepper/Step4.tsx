import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import SuccessPopup from "../../components/SuccessPopup";
import { resetForm, setStep } from "../../store/slices/formSlice";
import { useNavigate } from "react-router-dom";
import { addUser } from "../../store/slices/usersSlice";
import { toast } from "react-toastify";

const Step4: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useSelector((state: RootState) => state.form);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setShowPopup(true);
    setIsSubmitting(false);
  };

  const handleBack = () => {
    dispatch(setStep(3));
    navigate("/step3");
  };

  const handleSaveAnother = () => {
    dispatch(
      addUser({
        ...form,
      }),
    );
    toast.success("User saved successfully");
    sessionStorage.clear();
    dispatch(resetForm());
    navigate("/step1");
  };

  const handleSubmitToTable = () => {
    dispatch(
      addUser({
        ...form,
      }),
    );
    toast.success("User saved successfully");
    sessionStorage.clear();
    dispatch(resetForm());
    navigate("/users");
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white shadow-md rounded-lg space-y-4  dark:bg-gray-800">
      <h1 className="text-2xl font-bold">Review Your Data</h1>

      <div className="space-y-2">
        <p>
          <strong>Name:</strong> {form.name}
        </p>
        <p>
          <strong>Email:</strong> {form.email}
        </p>
        <p>
          <strong>Address:</strong> {form.address}
        </p>
        <p>
          <strong>Marital Status:</strong> {form.maritalStatus}
        </p>

        {form.preferences && (
          <p>
            <strong>Preferences:</strong>{" "}
            {Array.isArray(form.preferences)
              ? form.preferences.join(", ")
              : form.preferences}
          </p>
        )}

        {form.spouseName && (
          <p>
            <strong>Spouse Name:</strong> {form.spouseName}
          </p>
        )}

        {Array.isArray(form.dependents) && form.dependents.length > 0 && (
          <div>
            <strong>Dependents:</strong>
            <ul className="list-disc list-inside">
              {form.dependents.map((dep, idx) => (
                <li key={idx}>{dep.name}</li>
              ))}
            </ul>
          </div>
        )}
        {Array.isArray(form.workersPreferences) &&
          form.workersPreferences.length > 0 && (
            <div>
              <strong>Workers Preferences:</strong>
              <ul className="list-disc list-inside">
                {form.workersPreferences.map((dep, idx) => (
                  <li key={idx}>{dep.name}</li>
                ))}
              </ul>
            </div>
          )}

        {form.profilePhoto && typeof form.profilePhoto === "string" && (
          <div>
            <strong>Profile Photo:</strong>
            <img
              src={form.profilePhoto}
              alt="Profile"
              className="w-32 h-32 object-cover rounded mt-2"
            />
          </div>
        )}
      </div>

      <div className="flex justify-between mt-6">
        <button
          type="button"
          onClick={handleBack}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors"
          aria-label="Go back to previous step"
        >
          Back
        </button>

        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className={`bg-positive-interactive text-white px-4 py-2 rounded hover:bg-gray-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors ${
            isSubmitting
              ? "bg-green-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
          aria-label="Submit form"
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </div>

      {showPopup && (
        <SuccessPopup
          onClose={() => setShowPopup(false)}
          onSubmitTotable={handleSubmitToTable}
          onAddAnother={handleSaveAnother}
        />
      )}
    </div>
  );
};

export default Step4;
