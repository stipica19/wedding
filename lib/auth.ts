import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { dbConnect } from "@/lib/mongodb";
import User from "@/models/User";

// Centralizirani NextAuth config koji koriste i API ruta i server-komponente
export const authOptions: NextAuthOptions = {
    session: { strategy: "jwt" },
    pages: { signIn: "/login" },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                await dbConnect();

                const email = String(credentials?.email || "").toLowerCase().trim();
                const password = String(credentials?.password || "");

                if (!email || !password) return null;

                const user = await User.findOne({ email }).lean();
                if (!user) return null;

                const ok = await bcrypt.compare(password, (user as any).passwordHash);
                if (!ok) return null;

                return {
                    id: String((user as any)._id),
                    email: (user as any).email,
                    name: (user as any).name || "User",
                    role: (user as any).role || "user",
                } as any;
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = (user as any).id;
                token.role = (user as any).role;
            }
            return token;
        },
        async session({ session, token }) {
            (session as any).user.id = token.id;
            (session as any).user.role = token.role;
            return session;
        },
    },
};
