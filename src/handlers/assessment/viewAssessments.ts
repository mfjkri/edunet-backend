import { Request, Response } from "express";

import { ViewAssessmentsParams } from "../../params/assessment/viewAssessments";
import { getAssessmentsByStudentId } from "../../dataaccess/assessment";
import User from "../../models/user";

const SUCCESS_VIEW_ASSESSMENTS = "Viewed assessments successfully";

const ERROR_FAILED_TO_VIEW_ASSESSMENTS = "Failed to view assessments";

export default async function handleViewAssessments(
  req: Request,
  res: Response,
  params: ViewAssessmentsParams
) {
  try {
    const user: User = req.body.user;
    const id = req.params.id;
    const classId = req.params.classId;
    const response = await getAssessmentsByStudentId(
      user.centreId,
      user.id,
      parseInt(classId),
      parseInt(id)
    );

    res.status(201).json({
      message: SUCCESS_VIEW_ASSESSMENTS,
      assessments: response,
    });
  } catch (error: any) {
    res.status(500).json({
      message: ERROR_FAILED_TO_VIEW_ASSESSMENTS,
      error: error.message,
    });
  }
}
