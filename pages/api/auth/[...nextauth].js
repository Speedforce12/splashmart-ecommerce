import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth"
import connectDB from "@/database/connection";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials, req) {
        connectDB().catch((err) => {
          err: "Credentials Failed";
        });

        const result = await Users.findOne({ email: credentials.email });

        if (!result) {
          throw new Error("No user Found with that email, Please Register");
        }

        const checkPassword = await compare(
          credentials.password,
          result.password
        );

        //  check password uniqueness
        if (!checkPassword || result.email !== credentials.email) {
          throw new Error("Password or Username mismatch");
        }

        return result;
      },
    }),
    // ...add more providers here
  ],
  pages: {
    signIn: "/auth/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
export default NextAuth(authOptions);