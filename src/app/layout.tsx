import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";

const lato = Lato({
  weight: ["100", "300", "400", "700", "900"],
  subsets: ["latin"],
  variable: "--font-lato",
});

export const metadata: Metadata = {
  title: "Apex Forum | India's Premium CA, CS & Legal Professional Community",
  description: "Connect with Chartered Accountants, Company Secretaries, Corporate Lawyers, and Governance Professionals. Join the largest verified network for finance, taxation, compliance, and regulatory affairs.",
  keywords: "CA community, CS network, Corporate Legal forum, Chartered Accountants India, Company Secretaries, Corporate Lawyers, Legal Advisors, FEMA compliance, SEBI LODR, regulatory affairs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${lato.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white font-sans text-gray-900 selection:bg-red-50 selection:text-red-700">
        {children}
      </body>
    </html>
  );
}
