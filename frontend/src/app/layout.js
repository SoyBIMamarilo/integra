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
      <head>
        <meta name="title" content="Integra Site BIM Amarilo" />
        <meta name="description" content="Site to Count Quantity" />
        <meta name="keywords" content="BIM,Amarilo,Viewer,Autodesk" />
        <meta name="robots" content="noindex, nofollow" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="language" content="English" />
        <meta name="author" content="Amarilo" />
        <link rel="stylesheet" type="text/css" href="https://developer.api.autodesk.com/modelderivative/v2/viewers/7.*/style.css" />
        <link rel="icon" type="image/x-icon" href="https://amarilo.com.co/images/logo-white.svg" />
      </head>

      <body className={inter.className}>{children}</body>

    </html>
  );
}
