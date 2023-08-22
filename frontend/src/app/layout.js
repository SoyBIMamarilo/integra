import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Integra Amarilo",
  description: "Proyecto integra amarilo",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <div id="modal-hook"></div>
        <div id="backdrop-hook"></div>
      </body>
    </html>
  );
}
