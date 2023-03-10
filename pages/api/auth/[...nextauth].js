import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import connectDB from "@/database/connection";
import User from "@/database/models/user";
import { compare } from "bcrypt";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials, req) {
        connectDB().catch((err) => {
          err: "Credentials Failed";
        });

        // Try to find the user
        const user = await User.findOne({ email: credentials.email });

        if (!user) {
          throw new Error("No user found with the email");
        }

        // Use check the password with the password provided
        const checkPassword = await compare(
          credentials.password,
          user.password
        );

        //  check password uniqueness
        if (!checkPassword || user.email !== credentials.email) {
          throw new Error("Password or Username mismatch");
        }

        // check if user is verified
        if (!user.isVerified) {
          throw new Error("Please verify your email address first");
        }

        return user;
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

  // All of this is just to add user information to be accessible for the app in the token/session
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = {
          _id: user._id,
          email: user.email,
          role: user.role,
          name: user.name
        };
      }
      return token;
    },
    // pass extra user info to sessions by passing it to the token here to get them in sync:
    session: async ({ session, token }) => {
      if (token) {
        session.user = token.user;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
export default NextAuth(authOptions);
