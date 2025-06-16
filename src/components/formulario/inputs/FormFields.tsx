import type { ChangeEvent } from "react";

interface FormFieldProps {
  label: string;
  id: string;
  name: string;
  type: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  autoComplete?: string;
  placeholder?: string;
}

function FormField({
  label,
  id,
  name,
  type,
  value,
  onChange,
  required = false,
  autoComplete,
  placeholder
}: FormFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium leading-6 text-gray-300">
        {label}
      </label>
      <div className="mt-2">
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          required={required}
          autoComplete={autoComplete}
          placeholder={placeholder}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
        />
      </div>
    </div>
  );
}

export default FormField;
