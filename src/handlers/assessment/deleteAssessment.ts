import { Request, Response } from "express";

import { DeleteAssessmentParams } from "../../params/assessment/deleteAssessment";
import { deleteAssessment } from "../../dataaccess/assessment";
import User from "../../models/user";

const SUCCESS_DELETE_ASSESSMENT = "Assessment deleted successfully";

const ERROR_FAILED_TO_DELETE_ASSESSMENT = "Failed to delete assessment";

export default async function handleDeleteAssessment(
  req: Request,
  res: Response,
  params: DeleteAssessmentParams
) {
  try {
    const user: User = req.body.user;
    const response = await deleteAssessment(
      user.centreId,
      user.id,
      params.classId,
      params.assessmentId
    );

    res
      .status(201)
      .json({ message: SUCCESS_DELETE_ASSESSMENT, isDeleted: response });
  } catch (error: any) {
    res.status(500).json({
      message: ERROR_FAILED_TO_DELETE_ASSESSMENT,
      error: error.message,
    });
  }
}
