import { Request, Response } from "express";

import { createAssessment } from "../../dataaccess/assessment";
import { AddAssessmentParam } from "../../params/assessment/addAssessment";
import User from "../../models/user";

const SUCCESS_CREATED_ASSESSMENT = "Assessment created successfully";

const ERROR_FAILED_TO_CREATE_ASSESSMENT = "Failed to create assessment";

export default async function handleAddAssessment(
  req: Request,
  res: Response,
  params: AddAssessmentParam
) {
  try {
    const user = req.body.user as User;

    const response = await createAssessment(
      user.centreId,
      user.id,
      params.classId,
      params.studentId,
      params.name,
      params.total,
      params.score
    );

    res
      .status(201)
      .json({ message: SUCCESS_CREATED_ASSESSMENT, assessment: response });
  } catch (error: any) {
    res.status(500).json({
      message: ERROR_FAILED_TO_CREATE_ASSESSMENT,
      error: error.message,
    });
  }
}
