"use client";
import { baseButtonStyle, baseContainerStyle } from '@/constants';
import { motion, AnimatePresence } from 'framer-motion';

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'info' | 'warning' | 'danger';
  children?: React.ReactNode;
}

const Popup: React.FC<PopupProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirmation',
  message = 'Are you sure you want to proceed?',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  type = 'info',
  children
}) => {
  const getColorsByType = () => {
    switch (type) {
      case 'danger':
        return 'border-red-500/50 hover:border-red-500/75';
      case 'warning':
        return 'border-yellow-500/50 hover:border-yellow-500/75';
      default:
        return 'border-green-500/50 hover:border-green-500/75';
    }
  };

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-[2px] p-6"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className={`${baseContainerStyle} rounded-xl max-w-xl w-full flex flex-col`}
            onClick={e => e.stopPropagation()}
          >
            {children ? (
              children
            ) : (
              <>
                <div className="px-6 py-4 border-b border-[#888]/30">
                  <h2 className="text-xl font-medium text-[#FCFCFC]">{title}</h2>
                </div>
                <div className="p-6">
                  <p className="text-gray-300">{message}</p>
                </div>
                <div className="px-6 py-4 border-t border-[#888]/30">
                  <div className="flex justify-end gap-3">
                    <button 
                      onClick={onClose}
                      className={`${baseButtonStyle} flex items-center select-none px-4 py-2 text-[#FCFCFC] rounded-full text-sm`}
                    >
                      <span>{cancelText}</span>
                    </button>
                    {onConfirm && (
                      <button 
                        onClick={() => {
                          onConfirm();
                          onClose();
                        }}
                        className={`${baseButtonStyle} ${getColorsByType()} flex items-center select-none px-4 py-2 text-[#FCFCFC] rounded-full text-sm`}
                      >
                        <span>{confirmText}</span>
                      </button>
                    )}
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Popup;