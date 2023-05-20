"use client";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import AccountManagerProvider from "./accounts-manager";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <AccountManagerProvider>{children}</AccountManagerProvider>
    </SessionProvider>
  );
}
