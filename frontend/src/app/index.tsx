import { RouterProvider, QueryProvider } from "./providers";
import { Toaster } from "react-hot-toast";

export const App = () => {
  return (
    <QueryProvider>
      <RouterProvider />
      <Toaster position="top-right" />
    </QueryProvider>
  );
};
