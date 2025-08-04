import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import { v2 as cloudinary } from "cloudinary";
import { getRevicerScoketId, io } from "../libs/socket.js";

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;
    const messages = await Message.find({
      $or: [
        { senderId: senderId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: senderId },
      ],
    });

    return res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessages controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getUsersForSidebar = async (req, res) => {
  try {
    const LoggedInUser = req.user._id;
    const filteredUsers = await User.find({
      _id: { $ne: LoggedInUser },
    }).select("-password");
    return res.status(200).json(filteredUsers);
  } catch (error) {
    console.log("Error in getMessages controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { id: receiverId } = req.params;
    const { text, image } = req.body;

    const senderId = req.user._id;
    let immageUrl;

    if (image) {
      const uploadToCloudinary = await cloudinary.uploader.upload(image);
      immageUrl = uploadToCloudinary.secure_url;
    }

    const message = await Message.create({
      senderId,
      receiverId,
      text,
      image: immageUrl,
    });

    await message.save();
    
    const reciverSocketId = getRevicerScoketId(receiverId);
    
    if (reciverSocketId) {
      io.to(reciverSocketId).emit("newMessage", message);
    }

    return res.status(200).json(message);
  } catch (error) {
    console.log("Error in getMessages controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
