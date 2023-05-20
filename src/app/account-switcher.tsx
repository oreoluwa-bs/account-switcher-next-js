"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { useAccountManager } from "./accounts-manager";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { Session } from "next-auth";

export function AccountSwitcher({ session }: { session?: Session | null }) {
  const { accounts } = useAccountManager();

  const currentAccount = accounts.find(
    (account) => account.name === session?.user?.name
  );

  return (
    <Select
      defaultValue={currentAccount?.id}
      onValueChange={async (value) => {
        const account = accounts.find((account) => account.id === value);
        if (!account) throw new Error("Account not found!");

        try {
          const result = await signIn("account-switch", { ...account });
        } catch (error) {
          console.log(error);
        }
      }}
    >
      <SelectTrigger className="w-[180px]" autoFocus>
        <SelectValue placeholder="Select an account" />
      </SelectTrigger>
      <SelectContent>
        {accounts.length < 1 ? (
          <p className="text-center">
            <Link href="/login" className="text-sm underline">
              Login
            </Link>
          </p>
        ) : (
          <>
            {accounts.map((account) => {
              return (
                <SelectItem key={account.id} value={account.id}>
                  {account.name}
                </SelectItem>
              );
            })}
          </>
        )}
      </SelectContent>
    </Select>
  );
}
