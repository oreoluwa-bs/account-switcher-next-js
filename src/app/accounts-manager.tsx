import { User } from "next-auth";
import { ReactNode, createContext, useContext, useState } from "react";

const accountManager = createContext<{
  accounts: User[];
  addAccount: (account: User) => void;
}>({ accounts: [], addAccount: (v) => {} });

export default function AccountManagerProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [accounts, setAccounts] = useState<User[]>([
    // Default accounts
    {
      name: "John Done",
      id: "1",
      email: "john.doe@email.com",
      image: "",
    },
    {
      name: "Michael Jackson",
      id: "2",
      email: "michael.jackson@email.com",
      image: "",
    },
  ]);

  return (
    <accountManager.Provider
      value={{
        accounts,
        addAccount: (account) => {
          setAccounts((prev) => [...prev, account]);
        },
      }}
    >
      {children}
    </accountManager.Provider>
  );
}

export function useAccountManager() {
  return useContext(accountManager);
}
