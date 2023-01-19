import "./globals.css";
import Providers from "./Providers";
import Nav from "../comp/Nav";

import { Domine } from "@next/font/google";
// If loading a variable font, you don't need to specify the font weight
const domine = Domine({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={domine.className}>
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <Providers>
          <Nav />
          {children}
        </Providers>
      </body>
    </html>
  );
}
