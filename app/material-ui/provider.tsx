"use client";

import { ThemeProvider, createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#00923F",
    },
  },
});

export default function MUIProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
