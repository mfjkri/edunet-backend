import { Request, Response } from "express";

import { EditAssessmentParams } from "../../params/assessment/editAssessment";
import { editAssessment } from "../../dataaccess/assessment";
import User from "../../models/user";

const SUCCESS_EDITED_ASSESSMENT = "Assessment edited successfully";

const ERROR_FAILED_TO_EDIT_ASSESSMENT = "Failed to edit assessment";

export default async function handleEditAssessment(
  req: Request,
  res: Response,
  params: EditAssessmentParams
) {
  try {
    const user: User = req.body.user;
    const response = await editAssessment(
      user.centreId,
      user.id,
      params.classId,
      params.assessmentId,
      params.name,
      params.total,
      params.score
    );

    res
      .status(201)
      .json({ message: SUCCESS_EDITED_ASSESSMENT, assessment: response });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: ERROR_FAILED_TO_EDIT_ASSESSMENT, error: error.message });
  }
}
