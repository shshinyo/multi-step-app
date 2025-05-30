import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { nextStep, prevStep, updateForm } from "../../store/slices/formSlice";
import { UserWorker } from "../../types";
import { useFetch } from "../../hooks/useFetch";
import { fetchWorkers } from "../../http-services/workers.service";

const Step3: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const selectedWorkers = useSelector(
    (state: any) => state.form.workersPreferences,
  );

  const workersSelection = selectedWorkers || [];
  const {
    isFetching,
    fetchedData: workers,
    error,
  } = useFetch(fetchWorkers, []);

  const toggleSelect = (id: number) => {
    const isSelected = workersSelection.some((w: UserWorker) => w.id === id);
    let updatedSelection: UserWorker[];

    if (isSelected) {
      updatedSelection = workersSelection.filter(
        (w: UserWorker) => w.id !== id,
      );
    } else {
      const workerToAdd = workers.find((w: UserWorker) => w.id === id);
      updatedSelection = workerToAdd
        ? [...workersSelection, workerToAdd]
        : workersSelection;
    }

    dispatch(updateForm({ workersPreferences: updatedSelection }));
  };

  const handleNext = () => {
    if (workersSelection.length === 0) return;
    dispatch(nextStep());
    sessionStorage.setItem(
      "step3-form",
      JSON.stringify({ workersPreferences: workersSelection }),
    );
    navigate("/step4");
  };

  const handleBack = () => {
    dispatch(prevStep());
    navigate("/step2");
  };

  const selectedIds = new Set(workersSelection.map((w: UserWorker) => w.id));

  if (isFetching) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600">
        Failed to load workers. Please try again.
      </div>
    );
  }

  return (
    <div className="max-w-3xl p-6 mx-auto border border-solid rounded-md border-secondary bg-white dark:bg-gray-800 shadow-md space-y-4 transition-colors">
      <div className="flex flex-wrap gap-4 justify-center">
        {workers.map((worker: UserWorker) => {
          const isSelected = selectedIds.has(worker.id);
          return (
            <div
              key={worker.id}
              role="worker-card"
              className={`relative w-56 p-3 rounded-lg shadow-md border transition hover:shadow-xl cursor-pointer
        ${
          isSelected
            ? "ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900"
            : "bg-white dark:bg-gray-800"
        }`}
              onClick={() => toggleSelect(worker.id)}
            >
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => toggleSelect(worker.id)}
                className="absolute top-2 right-2 w-4 h-4"
                onClick={(e) => e.stopPropagation()}
              />

              <div className="pt-3">
                <div className="flex items-center gap-3 card-E2E">
                  <img
                    src={`https://i.pravatar.cc/150?u=${worker.id}`}
                    alt={worker.name}
                    className="w-10 h-10 rounded-full object-cover border border-gray-300 dark:border-gray-700"
                  />
                  <h3 className="text-md font-semibold text-gray-800 dark:text-gray-200">
                    {worker.name}
                  </h3>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                  {worker.email}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                  📞 {worker.phone}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                  🌐 {worker.website}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 truncate">
                  🏢 {worker.company.name}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-between mt-6">
        <button
          type="button"
          onClick={handleBack}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors"
        >
          Back
        </button>
        <button
          type="button"
          onClick={handleNext}
          disabled={workersSelection.length === 0}
          className="bg-positive-interactive text-white px-4 py-2 rounded hover:bg-gray-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Step3;
