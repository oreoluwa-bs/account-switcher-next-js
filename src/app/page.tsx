import { getServerSession } from "next-auth";
import { AccountSwitcher } from "./account-switcher";

export default async function Home() {
  const session = await getServerSession();

  return (
    <main className="container">
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="text-center mb-4">
          {session ? `Currently Signed in as ${session.user?.name}` : null}
        </div>
        <AccountSwitcher session={session} />
      </div>
    </main>
  );
}
