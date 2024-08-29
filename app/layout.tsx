import type { Metadata } from "next";
import "./globals.css";
import MUIDatePicker from "./material-ui-date/provider";
import MUIProvider from "./material-ui/provider";

export const metadata: Metadata = {
  title: "Model College 2010 Class",
  description: "Alimini members form",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="/icon?<generated>"
          type="image/<generated>"
          sizes="<generated>"
        />
        <link
          rel="apple-touch-icon"
          href="/apple-icon?<generated>"
          type="image/<generated>"
          sizes="<generated>"
        />
      </head>
      <body>
        <MUIProvider>
          <MUIDatePicker>{children}</MUIDatePicker>
        </MUIProvider>
      </body>
    </html>
  );
}
