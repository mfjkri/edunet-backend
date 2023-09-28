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
): Promise<Message[]> {
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

  return Message.findAll({
    where: {
      centreId: centreId,
      [Op.or]: [
        { senderId: senderId, receiverId: receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    },
    order: [["createdAt", "ASC"]],
  });
}

export { createMessage, getMessages };
