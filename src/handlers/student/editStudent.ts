import { Request, Response } from "express";

import { EditStudentParams } from "../../params/student/editStudent";
import { editStudentById } from "../../dataaccess/student";
import User from "../../models/user";
import { editParentById } from "../../dataaccess/parent";

const SUCCESS_EDITED_STUDENT = "Student edited successfully";

const ERROR_FAILED_TO_EDIT_STUDENT = "Failed to edit student";

export default async function handleEditStudent(
  req: Request,
  res: Response,
  params: EditStudentParams
) {
  try {
    const user: User = req.body.user;
    const studentResponse = await editStudentById(
      user.centreId,
      params.studentId,
      params.studentFullName,
      params.studentContact
    );
    await editParentById(
      user.centreId,
      studentResponse.parentId,
      params.parentFullName,
      params.parentContact
    );

    res.status(201).json({
      message: SUCCESS_EDITED_STUDENT,
    });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: ERROR_FAILED_TO_EDIT_STUDENT, error: error.message });
  }
}
