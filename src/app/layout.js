import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { ThemeContextProvider } from "@/context/ThemeContext";
import ThemeProvider from "@/Providers/ThemeProvider";
import AuthProvider from "@/Providers/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "InsightInk - Blog App",
  description:
    "Explore captivating articles and insightful content on InsightInk, your destination for engaging blog posts. Dive into a world of knowledge and inspiration.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <ThemeContextProvider>
            <ThemeProvider>
              <div className="container">
                <div className="wrapper">
                  <Navbar />
                  {children}
                  <Footer />
                </div>
              </div>
            </ThemeProvider>
          </ThemeContextProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
