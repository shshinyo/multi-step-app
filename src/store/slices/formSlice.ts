import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserWorker } from "../../types";

export interface FormData {
  name: string;
  email: string;
  address: string;
  preferences: string;
  currentStep: number;
  maritalStatus: "single" | "married";
  dependents?: { name: string }[];
  workersPreferences?: UserWorker[];
  spouseName?: string;
  profilePhoto?: string;
}
const STEP_NUMBER = 4;

function loadStepFormData(): Partial<FormData> {
  if (typeof window === "undefined") return {};

  let step1 = {};
  let step2 = {};
  let step3 = {};
  const step1Raw = sessionStorage.getItem("step1-form");
  if (step1Raw) step1 = JSON.parse(step1Raw);

  const step2Raw = sessionStorage.getItem("step2-form");
  if (step2Raw) step2 = JSON.parse(step2Raw);

  const step3Raw = sessionStorage.getItem("step3-form");
  if (step3Raw) step3 = JSON.parse(step3Raw);

  const currentStep = sessionStorage.getItem("currentStep");

  return {
    ...step1,
    ...step2,
    ...step3,
    currentStep: currentStep ? +currentStep : 1,
  };
}

const initialState: FormData = {
  name: "",
  email: "",
  address: "",
  preferences: "",
  currentStep: 1,
  maritalStatus: "single",
  ...loadStepFormData(),
};

const ResetState: FormData = {
  name: "",
  email: "",
  address: "",
  preferences: "",
  currentStep: 1,
  maritalStatus: "single",
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    updateForm: (state, action: PayloadAction<Partial<FormData>>) => {
      return { ...state, ...action.payload };
    },
    nextStep: (state) => {
      if (state.currentStep < STEP_NUMBER) state.currentStep += 1;
    },
    prevStep: (state) => {
      if (state.currentStep > 1) state.currentStep -= 1;
    },
    setStep: (state, action) => {
      state.currentStep = action.payload;
    },
    resetForm: () => ResetState,
  },
});

export const { nextStep, prevStep, setStep, resetForm, updateForm } =
  formSlice.actions;

export default formSlice.reducer;
