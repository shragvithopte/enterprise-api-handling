import { createContext, useContext } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NotificationContext = createContext({
  success: (msg: string) => {},
  error: (msg: string) => {},
  warning: (msg: string) => {},
});

export const NotificationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const success = (msg: string) => toast.success(msg);
  const error = (msg: string) => toast.error(msg);
  const warning = (msg: string) => toast.warning(msg);

  return (
    <NotificationContext.Provider
      value={{ success, error, warning }}
    >
      {children}
      <ToastContainer position="top-right" />
    </NotificationContext.Provider>
  );
};

export const useNotification = () =>
  useContext(NotificationContext);