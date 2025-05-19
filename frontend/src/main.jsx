import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom"; //import these modules
import './index.css'
import Homepage from './page/Homepage';

const router = createBrowserRouter([
  {
    path: "/", // Home route
    element: <Homepage/>, // Render the App component
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);