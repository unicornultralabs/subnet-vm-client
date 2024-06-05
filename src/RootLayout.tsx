import "react-toastify/dist/ReactToastify.css";
import "tailwindcss/tailwind.css";
import { ToastContainer } from "react-toastify";
import React, { Suspense } from "react";
import Providers from "./components/Providers";
import ErrorBoundary from "./components/ErrorBoundary";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ErrorBoundary>
      <Providers>
        <Suspense >
          <div className='h-screen w-full bg-amber-100'>
            {children}
          </div>
          </Suspense>
        <ToastContainer autoClose={5000} />
      </Providers>
    </ErrorBoundary>
  );
}
