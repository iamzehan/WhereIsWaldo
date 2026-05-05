import React, { createContext, useState } from "react";

type ToastType = "success" | "error" | "info";

type Toast = {
  id: number;
  message: string;
  type: ToastType;
};

type ToastContextType = {
  toast: (message: string, type?: ToastType) => void;
};

const ToastContext = createContext<ToastContextType | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = (message: string, type: ToastType = "info") => {
    const id = Date.now();

    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}

      {/* Toast container */}
      {/* Toast container */}
<div
  className="
    fixed z-[9999]
    top-4 right-4
    left-4 right-4
    sm:left-auto sm:right-4
    flex flex-col gap-3
    pointer-events-none
  "
>
  {toasts.map((t) => (
    <div
      key={t.id}
      className={`
        toast
        pointer-events-auto
        px-4 py-3
        rounded-xl
        shadow-lg
        text-white
        text-xl 
        text-center sm:text-left
        w-full sm:w-auto
        max-w-md mx-auto sm:mx-0

        border border-white/10

        ${
          t.type === "success"
            ? "bg-green-600"
            : t.type === "error"
            ? "bg-red-600"
            : "bg-gray-900"
        }
      `}
    >
      {t.message}
    </div>
  ))}
</div>
    </ToastContext.Provider>
  );
}


export default ToastContext;