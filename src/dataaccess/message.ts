import { Op } from "sequelize";

import Message from "../models/message";
import User from "../models/user";

async function createMessage(
  centreId: number,
  senderId: number,
  receiverId: number,
  content: string
): Promise<Message> {
  const sender = await User.findOne({
    where: { id: senderId },
  });
  const receiver = await User.findOne({
    where: { id: receiverId },
  });

  if (!receiver || !sender) {
    throw new Error(`Receiver not found`);
  }

  if (sender.centreId !== centreId || receiver.centreId !== centreId) {
    throw new Error(`Sender or receiver not from centre`);
  }

  return Message.create({
    centreId: centreId,
    senderId: senderId,
    receiverId: receiverId,
    content: content,
  });
}

async function getMessages(
  centreId: number,
  senderId: number,
  receiverId: number
): Promise<{ messages: Message[]; receiver: User }> {
  const sender = await User.findOne({
    where: { id: senderId },
  });
  const receiver = await User.findOne({
    where: { id: receiverId },
    attributes: { exclude: ["password"] },
  });

  if (!receiver || !sender) {
    throw new Error(`Receiver not found`);
  }

  if (sender.centreId !== centreId || receiver.centreId !== centreId) {
    throw new Error(`Sender or receiver not from centre`);
  }

  return {
    messages: await Message.findAll({
      where: {
        centreId: centreId,
        [Op.or]: [
          { senderId: senderId, receiverId: receiverId },
          { senderId: receiverId, receiverId: senderId },
        ],
      },
      order: [["createdAt", "ASC"]],
    }),
    receiver: receiver,
  };
}

async function getChats(userId: number) {
  try {
    const chats = await Message.findAll({
      where: {
        [Op.or]: [{ senderId: userId }, { receiverId: userId }],
      },
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: User,
          as: "sender",
          attributes: { exclude: ["password"] },
        },
        {
          model: User,
          as: "receiver",
          attributes: { exclude: ["password"] },
        },
      ],
    });

    const chatGroups: { [chatId: number]: { [key: string]: any }[] } = {};

    chats.forEach((chat) => {
      const otherPartyId =
        chat.senderId === userId ? chat.receiverId : chat.senderId;
      const otherParty = chat.senderId === userId ? chat.receiver : chat.sender;

      if (chatGroups[otherPartyId]) {
        chatGroups[otherPartyId].push({ chat: chat, otherParty: otherParty });
      } else {
        chatGroups[otherPartyId] = [{ chat: chat, otherParty: otherParty }];
      }
    });

    const collapsedChats = [];

    for (const [key, value] of Object.entries(chatGroups)) {
      collapsedChats.push(value[0]);
    }

    collapsedChats.sort((a, b) => {
      return b.chat.createdAt.getTime() - a.chat.createdAt.getTime();
    });

    return collapsedChats;
  } catch (error: any) {
    throw new Error(`Error fetching chats: ${error}`);
  }
}

export { createMessage, getMessages, getChats };
