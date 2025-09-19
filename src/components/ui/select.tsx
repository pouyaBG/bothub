import React from "react";
import { CaretDown, Check } from "phosphor-react";
import { cn } from "../../lib/utils";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps {
  value?: string;
  onChange?: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  className?: string;
}

const Select = React.forwardRef<HTMLButtonElement, SelectProps>(
  (
    {
      value,
      onChange,
      options,
      placeholder = "انتخاب کنید...",
      disabled = false,
      size = "md",
      fullWidth = true,
      className,
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const selectRef = React.useRef<HTMLDivElement>(null);

    const selectedOption = options.find(option => option.value === value);

    const sizes = {
      sm: "px-3 py-2 text-sm",
      md: "px-3 py-2.5 text-sm",
      lg: "px-4 py-3 text-base",
    };

    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelect = (optionValue: string) => {
      if (onChange) {
        onChange(optionValue);
      }
      setIsOpen(false);
    };

    return (
      <div
        ref={selectRef}
        className={cn("relative", fullWidth && "w-full", className)}
      >
        <button
          ref={ref}
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          className={cn(
            "flex items-center justify-between w-full bg-slate-700 border border-slate-600 rounded-lg text-white transition-all duration-200",
            "hover:border-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none",
            sizes[size],
            disabled && "opacity-50 cursor-not-allowed",
            isOpen && "border-blue-500 ring-2 ring-blue-500/20",
            fullWidth && "w-full"
          )}
          disabled={disabled}
        >
          <span className={selectedOption ? "text-white" : "text-slate-400"}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <CaretDown
            size={16}
            className={cn(
              "text-slate-400 transition-transform duration-200",
              isOpen && "rotate-180"
            )}
          />
        </button>

        {isOpen && (
          <div className="absolute z-50 w-full mt-1 bg-slate-700 border border-slate-600 rounded-lg shadow-lg max-h-60 overflow-auto">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => !option.disabled && handleSelect(option.value)}
                className={cn(
                  "flex items-center justify-between w-full px-3 py-2 text-right text-sm transition-colors",
                  "hover:bg-slate-600 focus:bg-slate-600 focus:outline-none",
                  option.disabled && "opacity-50 cursor-not-allowed",
                  value === option.value && "bg-blue-600 text-white"
                )}
                disabled={option.disabled}
              >
                <span>{option.label}</span>
                {value === option.value && (
                  <Check size={16} className="text-white" />
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";

export default Select;