import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/context/auth-context";
import { AuthGate } from "@/components/auth/auth-gate";
import { Footer } from "@/components/common/footer";

export const metadata: Metadata = {
  title: "CineMood - AI Movie Discovery",
  description: "Production-ready cinematic AI-powered movie discovery and recommendation platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="antialiased">
      <body className="min-h-screen bg-[#0f0f0f] text-white">
        <AuthProvider>
          <AuthGate>
            <div className="min-h-screen">{children}</div>
            <Footer />
          </AuthGate>
        </AuthProvider>
      </body>
    </html>
  );
}
