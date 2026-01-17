import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
    debug: true,
    session: { strategy: "jwt" },
    pages: { signIn: "/login" },
    providers: [
        CredentialsProvider({
            name: "Admin",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Lozinka", type: "password" },
            },
            async authorize(credentials) {
                const email = String(credentials?.email || "").toLowerCase().trim();
                const password = String(credentials?.password || "");

                const adminEmail = String(process.env.ADMIN_EMAIL || "").toLowerCase().trim();
                const adminHash = String(process.env.ADMIN_PASSWORD_HASH || "");

                console.log("LOGIN ATTEMPT:", { email, adminEmail, hasHash: !!adminHash });

                if (!adminEmail || !adminHash) return null;
                if (email !== adminEmail) return null;

                const ok = await bcrypt.compare(password, adminHash);
                console.log("PASSWORD OK?", ok);

                if (!ok) return null;

                return { id: "admin", email: adminEmail, name: "Admin" };
            },
        }),
    ],
};
