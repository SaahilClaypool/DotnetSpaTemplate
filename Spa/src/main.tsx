import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useWeatherQuery, WeatherPage } from "./pages/weather";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: false,
        },
    },
});

const router = createBrowserRouter([
    {
        path: "/",
        element: <div className="bg-primary">Hello world!</div>,
    },
    {
        path: "/weather",
        element: <WeatherPage />
    }
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
        </QueryClientProvider>

    </React.StrictMode>,
);
