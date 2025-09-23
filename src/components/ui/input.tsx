import React from "react";
import { cn } from "../../lib/utils";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  error?: string;
  helper?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onRightIconClick?: () => void;
  variant?: "default" | "filled" | "outlined";
  inputSize?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      label,
      error,
      helper,
      leftIcon,
      rightIcon,
      onRightIconClick,
      variant = "default",
      inputSize = "md",
      fullWidth = true,
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

    const baseStyles =
      "transition-all duration-200 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
      default: "border border-gray-600 bg-gray-800 text-white placeholder:text-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500",
      filled: "border-0 bg-gray-700 text-white placeholder:text-gray-300 rounded-lg focus:bg-gray-600",
      outlined: "border-2 border-gray-600 bg-transparent text-white placeholder:text-gray-300 rounded-lg focus:border-blue-500",
    };

    const sizes = {
      sm: "px-3 py-2 text-sm",
      md: "px-3 py-2.5 text-sm",
      lg: "px-4 py-2 text-base",
    };

    const iconSizes = {
      sm: "w-4 h-4",
      md: "w-5 h-5",
      lg: "w-6 h-6",
    };

    const getInputClasses = () => {
      let classes = cn(
        baseStyles,
        variants[variant],
        sizes[inputSize],
        fullWidth && "w-full"
      );

      if (leftIcon) {
        classes +=
          inputSize === "sm"
            ? " pr-9"
            : inputSize === "lg"
            ? " pr-12"
            : " pr-10";
      }
      if (rightIcon) {
        classes +=
          inputSize === "sm"
            ? " pl-9"
            : inputSize === "lg"
            ? " pl-12"
            : " pl-10";
      }

      if (error) {
        classes += " border-red-500 focus:border-red-500 focus:ring-red-500";
      }

      return classes;
    };

    return (
      <div className={fullWidth ? "w-full" : "inline-block"}>
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-gray-300 mb-2">
            {label}
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <div
              className={cn(
                "absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none",
                iconSizes[inputSize]
              )}>
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            className={cn(getInputClasses(), className)}
            {...props}
          />

          {rightIcon && (
            <div
              className={cn(
                "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400",
                onRightIconClick
                  ? "cursor-pointer hover:text-gray-300"
                  : "pointer-events-none",
                iconSizes[inputSize]
              )}
              onClick={onRightIconClick}>
              {rightIcon}
            </div>
          )}
        </div>

        {error && <p className="mt-1 text-sm text-red-400">{error}</p>}

        {helper && !error && (
          <p className="mt-1 text-sm text-gray-400">{helper}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
