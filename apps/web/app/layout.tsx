import "@repo/design-system/styles/globals.css";
import { DesignSystemProvider } from "@repo/design-system";
import { fonts } from "@repo/design-system/lib/fonts";
import type { ReactNode } from "react";
import { TRPCReactProvider } from "./trpc/react";
type RootLayoutProperties = {
  readonly children: ReactNode;
};

const RootLayout = ({ children }: RootLayoutProperties) => (
  <html lang="en" className={fonts} suppressHydrationWarning>
    <body>
      <TRPCReactProvider>
        <DesignSystemProvider>{children}</DesignSystemProvider>
      </TRPCReactProvider>
    </body>
  </html>
);

export default RootLayout;
