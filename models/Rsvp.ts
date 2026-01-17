import mongoose, { Schema, InferSchemaType } from "mongoose";

const RsvpSchema = new Schema(
    {
        // YES = dolazimo, NO = ne dolazimo
        status: {
            type: String,
            enum: ["YES", "NO"],
            required: true,
            index: true,
        },

        // multi input -> spremamo kao array stringova
        guests: {
            type: [String],
            required: true,
            validate: {
                validator: (arr: string[]) => Array.isArray(arr) && arr.length > 0,
                message: "Mora biti barem jedno ime gosta.",
            },
        },

        // opcionalna poruka
        message: {
            type: String,
            default: "",
            maxlength: 500,
        },

        // opcionalno: metadata (korisno za admin)
        ip: { type: String, default: "" },
        userAgent: { type: String, default: "" },
    },
    {
        timestamps: true, // createdAt / updatedAt
    }
);

// Tip koji možeš koristiti u TS-u
export type RsvpDoc = InferSchemaType<typeof RsvpSchema>;

// Spriječi "Cannot overwrite model once compiled" u dev modu
export default mongoose.models.Rsvp || mongoose.model("Rsvp", RsvpSchema);
