import { Request, Response } from "express";

import User from "../../models/user";
import { uploadAssessmentGrades } from "../../dataaccess/assessment";

const SUCCESS_UPLOADED_HOMEWORK_GRADES =
  "Homework grades uploaded successfully";

const ERROR_FAILED_TO_UPLOAD_HOMEWORK_GRADES =
  "Failed to upload homework grades";

export default async function handleUploadHomeworkGrades(
  req: Request,
  res: Response
) {
  try {
    const user = req.body.user as User;

    const { classId, assessmentName, total, data } = req.body;

    await uploadAssessmentGrades(
      user.centreId,
      classId,
      assessmentName,
      total,
      data
    );

    res.status(201).json({
      message: SUCCESS_UPLOADED_HOMEWORK_GRADES,
    });
  } catch (error: any) {
    res.status(500).json({
      message: ERROR_FAILED_TO_UPLOAD_HOMEWORK_GRADES,
      error: error.message,
    });
  }
}
