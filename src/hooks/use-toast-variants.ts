
import { toast as baseToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";

type ToastVariants = {
  success: (message: string) => void;
  error: (message: string) => void;
  info: (message: string) => void;
  warning: (message: string) => void;
}

// Enhanced toast with variant methods
export const toast: typeof baseToast & ToastVariants = Object.assign(
  {},
  baseToast,
  {
    success: (message: string) => {
      return baseToast({
        title: "Success",
        description: message,
        variant: "default",
        className: "bg-green-50 border-green-200 text-green-800",
      });
    },
    error: (message: string) => {
      return baseToast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
    },
    info: (message: string) => {
      return baseToast({
        title: "Info",
        description: message,
        className: "bg-blue-50 border-blue-200 text-blue-800",
      });
    },
    warning: (message: string) => {
      return baseToast({
        title: "Warning",
        description: message,
        className: "bg-yellow-50 border-yellow-200 text-yellow-800",
      });
    }
  }
);

export { useToast } from "@/hooks/use-toast";
