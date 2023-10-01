import Note from "../models/note";
import Student from "../models/student";
import Tutor from "../models/tutor";
import User from "../models/user";

async function createNote(
  centreId: number,
  userId: number,
  creatorId: number,
  title: string,
  content: string
): Promise<Note> {
  try {
    return await Note.create({
      centreId: centreId,
      userId: userId,
      creatorId: creatorId,
      title: title,
      content: content,
    });
  } catch (error: any) {
    throw new Error(`Failed to create note: ${error.message}`);
  }
}

async function createNoteByStudentId(
  centreId: number,
  studentId: number,
  creatorId: number,
  title: string,
  content: string
): Promise<Note> {
  try {
    const student = await Student.findOne({
      where: { centreId: centreId, id: studentId },
    });
    if (!student) {
      throw new Error(`Student with ID ${studentId} not found`);
    }
    return await createNote(
      centreId,
      student.userId,
      creatorId,
      title,
      content
    );
  } catch (error: any) {
    throw new Error(`Failed to create note: ${error.message}`);
  }
}

async function createNoteByTutorId(
  centreId: number,
  tutorId: number,
  creatorId: number,
  title: string,
  content: string
): Promise<Note> {
  try {
    const tutor = await Tutor.findOne({
      where: { centreId: centreId, id: tutorId },
    });
    if (!tutor) {
      throw new Error(`Tutor with ID ${tutorId} not found`);
    }
    return await createNote(centreId, tutor.userId, creatorId, title, content);
  } catch (error: any) {
    throw new Error(`Failed to create note: ${error.message}`);
  }
}

async function deleteNote(
  centreId: number,
  userId: number,
  noteId: number
): Promise<boolean> {
  try {
    const numDeletedRows = await Note.destroy({
      where: { centreId: centreId, id: noteId, creatorId: userId },
    });
    return numDeletedRows > 0;
  } catch (error: any) {
    throw new Error(`Failed to delete note: ${error.message}`);
  }
}

async function editNote(
  centreId: number,
  userId: number,
  noteId: number,
  title: string,
  content: string
): Promise<Note> {
  try {
    const note = await Note.findOne({
      where: { centreId: centreId, id: noteId, creatorId: userId },
    });
    if (!note) {
      throw new Error(`Note with ID ${noteId} not found`);
    }

    if (note.content) {
      note.content = content;
    }

    if (note.title) {
      note.title = title;
    }

    await note.save();
    await note.reload();

    return note;
  } catch (error: any) {
    throw new Error(`Failed to update note: ${error.message}`);
  }
}

async function getNoteById(centreId: number, noteId: number): Promise<Note> {
  try {
    const note = await Note.findOne({
      where: { centreId: centreId, id: noteId },
    });

    if (!note) {
      throw new Error(`Note with ID ${noteId} not found`);
    }

    return note;
  } catch (error: any) {
    throw new Error(`Failed to get note: ${error.message}`);
  }
}

async function getNotesByUserId(
  centreId: number,
  userId: number
): Promise<Note[]> {
  try {
    return await Note.findAll({
      where: { centreId: centreId, userId: userId },
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: User,
          as: "creator",
          attributes: ["id", "fullName"],
        },
      ],
    });
  } catch (error: any) {
    throw new Error(`Failed to get note: ${error.message}`);
  }
}

async function getNotesByStudentId(
  centreId: number,
  studentId: number
): Promise<Note[]> {
  try {
    const student = await Student.findOne({
      where: { centreId: centreId, id: studentId },
    });
    if (!student) {
      throw new Error(`Student with ID ${studentId} not found`);
    }

    return await getNotesByUserId(centreId, student.userId);
  } catch (error: any) {
    throw new Error(`Failed to get note: ${error.message}`);
  }
}

async function getNotesByTutorId(
  centreId: number,
  tutorId: number
): Promise<Note[]> {
  try {
    const tutor = await Tutor.findOne({
      where: { centreId: centreId, id: tutorId },
    });
    if (!tutor) {
      throw new Error(`Tutor with ID ${tutorId} not found`);
    }

    return await getNotesByUserId(centreId, tutor.userId);
  } catch (error: any) {
    throw new Error(`Failed to get note: ${error.message}`);
  }
}

export {
  createNote,
  createNoteByStudentId,
  createNoteByTutorId,
  deleteNote,
  editNote,
  getNoteById,
  getNotesByUserId,
  getNotesByStudentId,
  getNotesByTutorId,
};
