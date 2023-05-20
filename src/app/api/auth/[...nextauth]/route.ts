import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

const usersDB = [
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
  {
    name: "Jack Hammer",
    id: "3",
    email: "jack.hammer@email.com",
    image: "",
  },
];

const handler = NextAuth({
  providers: [
    Credentials({
      id: "account-switch",
      name: "Account Switch",
      credentials: {
        id: {
          label: "id",
          placeholder: "Enter id",
          type: "text",
          value: "",
        },
        email: {
          label: "email",
          placeholder: "Enter email",
          type: "email",
        },
      },
      authorize(credentials, req) {
        // Validate user
        /**
         * You can make an aditional request to your backend
         * to verify this user i.e get a new access/refresh token etc.
         *
         */

        const user = usersDB.find((user) => {
          return user.email === credentials?.email;
        });

        if (!user) throw new Error("Account not found!");

        // Verify Token
        /**
         * Ideally this would be an api call to your backend to verify the token
         */
        const isTokenValid = true;

        if (!isTokenValid) throw new Error("Token Invalid! Log in again");

        return {
          name: user.name,
          id: user.id,
          email: user.email,
          image: user.image,
        };
      },
    }),
  ],
});

export { handler as GET, handler as POST };
