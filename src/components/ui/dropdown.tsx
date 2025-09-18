import React, { useState, useRef, useEffect } from "react";
import { CaretDown, Check } from "phosphor-react";
import { cn } from "../../lib/utils";

export interface DropdownOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

export interface DropdownProps {
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

const Dropdown = React.forwardRef<HTMLButtonElement, DropdownProps>(
  (
    {
      options,
      value,
      onChange,
      placeholder = "انتخاب کنید",
      className,
      disabled = false,
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const selectedOption = options.find((option) => option.value === value);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);

    const handleToggle = () => {
      if (!disabled) {
        setIsOpen(!isOpen);
      }
    };

    const handleSelect = (optionValue: string) => {
      onChange(optionValue);
      setIsOpen(false);
    };

    return (
      <div ref={dropdownRef} className={cn("relative", className)}>
        <button
          ref={ref}
          type="button"
          onClick={handleToggle}
          disabled={disabled}
          className={cn(
            "w-full flex items-center justify-between px-4 py-2.5 text-right",
            "bg-white border border-slate-600 rounded-lg text-sm",
            "hover:border-slate-500",
            "transition-colors duration-200",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            isOpen && "shadow"
          )}>
          <div className="flex items-center gap-2">
            {selectedOption?.icon}
            <span
              className={cn(
                "text-gray-900",
                !selectedOption && "text-gray-500"
              )}>
              {selectedOption?.label || placeholder}
            </span>
          </div>
          <CaretDown
            size={16}
            className={cn(
              "text-gray-500 transition-transform duration-200",
              isOpen && "rotate-180"
            )}
          />
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-600 rounded-lg shadow-lg z-50 py-1 max-h-60 overflow-y-auto">
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className={cn(
                  "w-full px-4 py-2.5 text-right flex items-center justify-between",
                  "hover:bg-gray-50 transition-colors duration-150",
                  "text-sm text-gray-900"
                )}>
                <div className="flex items-center gap-2">
                  {option.icon}
                  <span>{option.label}</span>
                </div>
                {value === option.value && (
                  <Check size={16} className="text-blue-600" />
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }
);

Dropdown.displayName = "Dropdown";

export default Dropdown;
