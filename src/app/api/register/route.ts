import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectToDB } from "@/utils/database";
import User from "@/models/user";

export async function POST(req: NextResponse) {
  try {
    const { email, username, password } = await req.json();

    await connectToDB();

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      email: email,
      username: username,
      password: hashedPassword,
      image: "avatar",
      banner: "banner",
      reviews: [],
      watchlist: [],
      readlist: [],
    });

    return NextResponse.json({ message: "User Registed" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Something  wrong" }, { status: 500 });
  }
}
