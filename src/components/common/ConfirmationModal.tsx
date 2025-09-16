import React from 'react';
import { X, Check, Warning } from 'phosphor-react';
import Button from '../ui/button';

interface ConfirmationModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
  type?: 'warning' | 'info' | 'success';
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = 'تایید',
  cancelText = 'لغو',
  type = 'warning'
}) => {
  if (!isOpen) return null;

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <Check size={24} className="text-green-500" />;
      case 'info':
        return <Check size={24} className="text-blue-500" />;
      case 'warning':
      default:
        return <Warning size={24} className="text-amber-500" />;
    }
  };

  const getButtonVariant = () => {
    switch (type) {
      case 'success':
        return 'success' as const;
      case 'info':
        return 'primary' as const;
      case 'warning':
      default:
        return 'warning' as const;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-md">
      <div className="bg-slate-800 rounded-xl shadow-2xl border border-slate-700 max-w-md w-full mx-4 animate-in fade-in duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <div className="flex items-center space-x-3 space-x-reverse">
            {getIcon()}
            <h3 className="text-lg font-semibold text-white">{title}</h3>
          </div>
          <button
            onClick={onCancel}
            className="p-1 rounded-md hover:bg-slate-700/50 transition-colors"
          >
            <X size={20} className="text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-gray-300 leading-relaxed">{message}</p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-4 p-6 border-t border-slate-700">
          <Button
            variant="secondary"
            size="md"
            onClick={onCancel}
          >
            {cancelText}
          </Button>
          <Button
            variant={getButtonVariant()}
            size="md"
            onClick={onConfirm}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;