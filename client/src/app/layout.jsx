import { Toaster } from "react-hot-toast";
import "./globals.css";

import {AuthProvider} from "@/context/authContext";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <AuthProvider>
          <Toaster/>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
