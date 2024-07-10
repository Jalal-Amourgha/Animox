import User from "@/models/user";
import { connectToDB } from "@/utils/database";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    const infos = await User.findOne({
      $or: [{ email: params.id }, { username: params.id }],
    }).populate("username");

    return new Response(JSON.stringify(infos), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch user infos", {
      status: 500,
    });
  }
};

export const PATCH = async (request, { params }) => {
  const {
    type,
    title,
    img,
    statu = "",
    score,
    id,
    note = "",
    createdAt,
    newImg,
  } = await request.json();

  try {
    await connectToDB();

    // Find the existing prompt by ID
    const userInfo = await User.findOne({
      $or: [{ email: params.id }, { username: params.id }],
    });

    if (!userInfo) {
      return new Response("User not found", { status: 404 });
    }

    if (type === "watchlist") {
      userInfo.watchlist.push({
        title: title,
        img: img,
        statu: statu,
        score: score,
        id: id,
        createdAt: createdAt,
      });
    } else if (type === "review") {
      userInfo.reviews.push({
        title: title,
        img: img,
        score: score,
        review: note,
        id: id,
        createdAt: createdAt,
      });
    } else if (type === "readlist") {
      userInfo.readlist.push({
        title: title,
        img: img,
        statu: statu,
        score: score,
        id: id,
        createdAt: createdAt,
      });
    } else if (type === "banner") {
      userInfo.banner = newImg;
    } else if (type === "avatar") {
      userInfo.image = newImg;
    }

    await userInfo.save();

    return new Response("Successfully updated the UserInfo", { status: 200 });
  } catch (error) {
    return new Response("Error Updating UserInfo", { status: 500 });
  }
};
