import React from "react";
import { useFormContext, Controller } from "react-hook-form";

interface Props {
  name: string;
  type?: string;
  id: string;
  required?: boolean | string;
  minLength?: number | { value: number; message: string };
  pattern?: RegExp | { value: RegExp; message: string };
  defaultValue?: string;
  className?: string;
}

const FormInput: React.FC<Props> = ({
  name,
  type = "text",
  required = false,
  minLength,
  pattern,
  defaultValue = "",
  id,
  className = "",
  ...rest
}) => {
  const { control } = useFormContext();

  const getValidationRules = () => {
    const rules: Record<string, any> = {};

    if (required) {
      rules.required =
        typeof required === "string" ? required : `${name} is required`;
    }

    if (minLength) {
      rules.minLength =
        typeof minLength === "number"
          ? {
              value: minLength,
              message: `${name} must be at least ${minLength} characters`,
            }
          : minLength;
    }

    if (pattern) {
      rules.pattern =
        typeof pattern === "object" && !(pattern instanceof RegExp)
          ? pattern
          : {
              value: pattern,
              message: `Please enter a valid ${name.toLowerCase()}`,
            };
    }

    return rules;
  };

  return (
    <div className={`mb-4 ${className}`}>
      <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">
        <Controller
          name={name}
          control={control}
          defaultValue={defaultValue}
          rules={getValidationRules()}
          render={({ field, fieldState: { error } }) => (
            <>
              <input
                {...rest}
                id={id}
                {...field}
                className={` bg-input-default border border-transparent rounded-xl mt-1 block w-full px-3 py-2 shadow-sm focus:outline-none focus:border-transparent dark:text-gray-700  ${
                  error ? "border-red-500" : "border-gray-300"
                }`}
                type={type}
              />
              {error && (
                <p className="text-red-500 text-xs mt-1">{error.message}</p>
              )}
            </>
          )}
        />
      </label>
    </div>
  );
};

export default FormInput;
