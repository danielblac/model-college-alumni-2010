import type { Metadata } from "next";
import "./globals.css";
import MUIDatePicker from "./material-ui-date/provider";
import MUIProvider from "./material-ui/provider";

export const metadata: Metadata = {
  title: "L.S.M.C.O class of 2010 ",
  description: "Alimini members form",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <MUIProvider>
          <MUIDatePicker>{children}</MUIDatePicker>
        </MUIProvider>
      </body>
    </html>
  );
}
