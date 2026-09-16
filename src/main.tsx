import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router";
import { App } from "./app";
import { AppErrorComponent, NotFoundPage } from "@/lib/error-component";
import { HomePage } from "@/pages/home";
import { LoginPage } from "@/pages/login";
import { StudioPage } from "@/pages/studio";
import { WorkPage } from "@/pages/work";
import "./styles.css";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        errorElement: <AppErrorComponent />,
        children: [
          { path: "/", element: <HomePage /> },
          { path: "/login", element: <LoginPage /> },
          { path: "/studio", element: <StudioPage /> },
          { path: "/work/:projectId", element: <WorkPage /> },
          { path: "*", element: <NotFoundPage /> },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
