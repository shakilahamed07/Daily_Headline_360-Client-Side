import { StrictMode} from "react";
import { createRoot } from "react-dom/client";
import "../index.css";
import { RouterProvider } from "react-router";
import { router } from "./Router/Router";
import AuthProvider from "./Context/AuthProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AOS from "aos";
import "aos/dist/aos.css";

AOS.init({
  duration: 800, // animation duration in ms
  offset: 200, // offset (px) from the original trigger point
  once: true, // whether animation should happen only once
});

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router}></RouterProvider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
