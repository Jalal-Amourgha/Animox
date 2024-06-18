import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    email: {
      type: String,
      unique: [true, "Email already exists!"],
      required: [true, "Email is required!"],
    },
    username: {
      type: String,
      unique: [true, "Username already exists!"],
      required: [true, "Username is required!"],
    },
    password: {
      type: String,
    },
    banner: {
      type: String,
    },
    image: {
      type: String,
    },
    reviews: {
      type: Array,
    },
    watchlist: {
      type: Array,
    },
    readlist: {
      type: Array,
    },
  },
  { timestamps: true }
);

const User = models.User || model("User", UserSchema);
export default User;
