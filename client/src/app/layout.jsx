import { Toaster } from "react-hot-toast";
import "./globals.css";
import { AuthProvider } from "@/context/authContext";

export const metadata = {
  title: "VoyageAI — AI Travel Planner",
  description: "Plan your trip with AI",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-zinc-50 text-zinc-900 antialiased">
        <AuthProvider>
          <Toaster
            position="top-center"
            toastOptions={{
              style: {
                borderRadius: "10px",
                background: "#18181b",
                color: "#fafafa",
                fontSize: "14px",
              },
            }}
          />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}