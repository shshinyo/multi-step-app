import React from "react";
import { useForm, useFieldArray, FormProvider } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../store";
import { updateForm, nextStep, prevStep } from "../../store/slices/formSlice";
import FormInput from "../../components/form-input/FormInput";
import useSessionStorageForm from "../../hooks/useSessionStorageForm";
import removeIcon from "../../assets/remove.svg";
interface FormData {
  address: string;
  preferences: string;
  spouseName?: string;
  dependents: { name: string }[];
}

const Step2: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formData = useSelector((state: RootState) => state.form);
  const maritalStatus = formData.maritalStatus;

  const methods = useForm<FormData>({
    defaultValues: {
      address: formData.address || "",
      preferences: formData.preferences || "",
      spouseName: formData.spouseName || "",
      dependents:
        formData.dependents && formData.dependents.length > 0
          ? formData.dependents
          : [],
    },
    mode: "onChange",
  });

  useSessionStorageForm("step2-form", methods);

  const {
    handleSubmit,
    control,
    formState: { isValid, errors },
  } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "dependents",
  });

  const onSubmit = (data: FormData) => {
    dispatch(updateForm({ ...data }));
    dispatch(nextStep());
    navigate("/step3");
  };

  const handleBack = () => {
    dispatch(updateForm(methods.getValues()));
    dispatch(prevStep());
    navigate("/step1");
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-3xl p-6 mx-auto border border-solid rounded-md border-secondary bg-white dark:bg-gray-800 shadow-md space-y-4 transition-colors"
      >
        <label
          htmlFor="address"
          className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Address
        </label>
        <FormInput
          aria-describedby={errors.address ? "address-error" : undefined}
          aria-invalid={!!errors.address}
          aria-required="true"
          id="address"
          name="address"
          required
          aria-label="address"
          className="dark:text-white"
        />
        <label
          htmlFor="preferences"
          className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Preferences
        </label>
        <FormInput
          aria-describedby={
            errors.preferences ? "preferences-error" : undefined
          }
          aria-invalid={!!errors.preferences}
          aria-required="true"
          id="preferences"
          name="preferences"
          required
          aria-label="preferences"
          className="dark:text-white"
        />

        {maritalStatus === "married" && (
          <>
            <label
              htmlFor="spouseName"
              className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Spouse's Name
            </label>
            <FormInput
              aria-describedby={
                errors.spouseName ? "spouseName-error" : undefined
              }
              aria-invalid={!!errors.spouseName}
              aria-required="true"
              id="spouseName"
              name="spouseName"
              required
              className="dark:text-white"
            />
            <div className="mt-4">
              <h3 className="text-md font-semibold mb-2 text-gray-700 dark:text-gray-300">
                Dependents
              </h3>
              {fields.length > 0 && (
                <div className=" border border-gray-300 rounded-md bg-gray-50 dark:bg-gray-700 p-4 space-y-4">
                  {fields.map((field, index) => (
                    <div key={field.id} className="flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          <span>{`Dependent ${index + 1}`}</span>
                          <span className="ml-0.5 text-red-500">*</span>
                        </label>

                        <button
                          type="button"
                          className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-600 p-1"
                          onClick={() => remove(index)}
                          aria-label={`Remove dependent ${index + 1}`}
                        >
                          <img src={removeIcon} alt="" className="h-6 w-6" />
                        </button>
                      </div>

                      <FormInput
                        name={`dependents.${index}.name`}
                        id={`dependents.${index}.name`}
                        required
                        aria-required="true"
                        className="w-full dark:text-white"
                      />
                    </div>
                  ))}
                </div>
              )}
              <button
                type="button"
                className="text-positive-interactive  dark:text-green-600 text-sm font-bold mt-2"
                onClick={() => append({ name: "" })}
              >
                + Add Dependent
              </button>
            </div>
          </>
        )}

        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={handleBack}
            className="bg-gray-500 hover:bg-gray-700 text-white px-4 py-2 rounded transition-colors"
          >
            Back
          </button>
          <button
            type="submit"
            disabled={!isValid}
            className="bg-positive-interactive hover:bg-gray-700 disabled:bg-gray-300 text-white px-4 py-2 rounded disabled:cursor-not-allowed transition-colors"
          >
            Next
          </button>
        </div>
      </form>
    </FormProvider>
  );
};

export default Step2;
