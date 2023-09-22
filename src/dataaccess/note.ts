import Note from "../models/note";
import Student from "../models/student";
import Tutor from "../models/tutor";

async function createNote(
  centreId: number,
  userId: number,
  content: string
): Promise<Note> {
  try {
    return await Note.create({
      centreId: centreId,
      userId: userId,
      content: content,
    });
  } catch (error: any) {
    throw new Error(`Failed to create note: ${error.message}`);
  }
}

async function deleteNote(centreId: number, noteId: number): Promise<boolean> {
  try {
    const numDeletedRows = await Note.destroy({
      where: { centreId: centreId, id: noteId },
    });
    return numDeletedRows > 0;
  } catch (error: any) {
    throw new Error(`Failed to delete note: ${error.message}`);
  }
}

async function editNote(
  centreId: number,
  noteId: number,
  content: string
): Promise<Note> {
  try {
    const note = await Note.findOne({
      where: { centreId: centreId, id: noteId },
    });
    if (!note) {
      throw new Error(`Note with ID ${noteId} not found`);
    }

    note.content = content;
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
  deleteNote,
  editNote,
  getNoteById,
  getNotesByUserId,
  getNotesByStudentId,
  getNotesByTutorId,
};
