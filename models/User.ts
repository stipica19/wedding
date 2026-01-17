import mongoose, { Schema, InferSchemaType } from "mongoose";

const UserSchema = new Schema(
    {
        name: { type: String, default: "" },
        email: { type: String, required: true, unique: true, index: true },
        passwordHash: { type: String, required: true }, // bcrypt hash
        role: { type: String, enum: ["admin", "user"], default: "user" },
    },
    { timestamps: true }
);

export type USerDoc = InferSchemaType<typeof UserSchema>;

export default mongoose.models.User || mongoose.model("User", UserSchema);