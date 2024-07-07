import User from "@/models/user";
import { connectToDB } from "@/utils/database";

export const GET = async (request) => {
  try {
    await connectToDB();

    const users = await User.find({}).populate("username");

    console.log("ana jit", users);

    return new Response(JSON.stringify(users), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch user infos", {
      status: 500,
    });
  }
};
