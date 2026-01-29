import { z } from "zod";

const nameRegex = /^[A-Za-zÀ-žČĆĐŠŽčćđšž .'’-]{2,60}$/;

export const rsvpSchema = z.object({
    status: z.enum(["YES", "NO"]),
    guests: z
        .array(z.string().trim().min(2).max(60))
        .min(1)
        .max(15)
        .transform((arr) =>
            arr.map((s) => s.trim()).filter(Boolean)
        )
        .refine((arr) => arr.every((n) => nameRegex.test(n)), {
            message: "Neispravan format imena.",
        }),
    message: z.string().trim().max(40).optional().default(""),
    //childrenCount: z.number().int().min(0).max(5).optional().default(0),
});
