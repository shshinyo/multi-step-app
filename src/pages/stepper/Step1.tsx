import React, { useRef, useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateForm, nextStep } from "../../store/slices/formSlice";
import { RootState } from "../../store";
import FormInput from "../../components/form-input/FormInput";
import useSessionStorageForm from "../../hooks/useSessionStorageForm";
import { toast } from "react-toastify";
import removeIcon from "../../assets/remove.svg";

export interface step1FormData {
  name: string;
  email: string;
  maritalStatus: "single" | "married";
  profilePhoto: string;
}

const Step1: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { name, email, maritalStatus, profilePhoto } = useSelector(
    (state: RootState) => state.form,
  );

  const methods = useForm<step1FormData>({
    defaultValues: {
      name,
      email,
      maritalStatus: maritalStatus || "single",
      profilePhoto: profilePhoto || "",
    },
    mode: "onChange",
  });

  useSessionStorageForm("step1-form", methods);

  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
    setValue,
  } = methods;

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(
    profilePhoto || null,
  );

  useEffect(() => {
    setImagePreview(profilePhoto || null);
  }, [profilePhoto]);

  const onSubmit = (data: step1FormData) => {
    dispatch(updateForm({ ...data }));
    dispatch(nextStep());
    navigate("/step2");
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast.error("Only image files are allowed");
        fileInputRef.current!.value = "";
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImagePreview(base64String);
        setValue("profilePhoto", base64String, { shouldValidate: true });
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
      setValue("profilePhoto", "", { shouldValidate: true });
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    setValue("profilePhoto", "", { shouldValidate: true });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-3xl p-6 border border-solid rounded-md border-secondary mx-auto dark:bg-gray-800 shadow-md  space-y-4 transition-colors"
      >
        <label
          htmlFor="name"
          className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Name
        </label>
        <FormInput
          aria-describedby={errors.name ? "name-error" : undefined}
          aria-invalid={!!errors.name}
          aria-required="true"
          name="name"
          required
          minLength={2}
          id="name"
          className=" dark:text-white"
        />
        <label
          htmlFor="email"
          className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Email
        </label>
        <FormInput
          aria-describedby={errors.email ? "email-error" : undefined}
          aria-invalid={!!errors.email}
          aria-required="true"
          name="email"
          id="email"
          type="email"
          required
          pattern={/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i}
          className="dark:text-white"
        />

        {/* Profile Photo */}
        <div>
          <label
            htmlFor="file"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Profile Photo
          </label>
          <input
            type="file"
            id="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
            className="block w-full text-sm text-gray-500 dark:text-gray-400
            cursor-pointer file:cursor-pointer
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-green-50 dark:file:bg-positive-interactive-dark
              file:text-positive-interactive dark:file:text-white
              "
          />
          {imagePreview && (
            <div className="mt-2 flex items-center space-x-4">
              <img
                src={imagePreview}
                alt="Preview"
                className="h-16 w-16 rounded-full object-cover"
              />
              <button
                type="button"
                onClick={removeImage}
                className="text-sm text-red-600 hover:underline dark:text-red-400"
              >
                <img src={removeIcon} alt="" className="h-6 w-6" />
              </button>
            </div>
          )}
        </div>

        {/* Marital Status */}
        <div>
          <span className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Marital Status
          </span>
          <label className="inline-flex items-center mr-4 cursor-pointer dark:text-white">
            <input
              type="radio"
              value="single"
              {...register("maritalStatus", {
                required: "Please select your marital status.",
              })}
              className="form-radio checked:bg-positive-interactive checked:border-positive-interactive focus:border-positive-interactive focus:ring-positive-interactive focus:!bg-positive-interactive"
            />
            <span className="ml-2">Single</span>
          </label>
          <label className="inline-flex items-center cursor-pointer dark:text-white">
            <input
              type="radio"
              value="married"
              {...register("maritalStatus", {
                required: "Please select your marital status.",
              })}
              className="form-radio checked:bg-positive-interactive checked:border-positive-interactive focus:border-positive-interactive focus:ring-positive-interactive focus:!bg-positive-interactive"
            />
            <span className="ml-2">Married</span>
          </label>
          {errors.maritalStatus && (
            <p className="text-red-500 text-xs mt-1">
              {errors.maritalStatus.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="bg-positive-interactive text-white px-4 py-2 rounded  transition-colors hover:bg-gray-700"
        >
          Next
        </button>
      </form>
    </FormProvider>
  );
};

export default Step1;
