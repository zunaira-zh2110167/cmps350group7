
import prisma from "../prisma";

// Get all assessments
export async function getAllAssessments() {
  return await prisma.assessment.findMany();
}

export async function getAssessmentsBySection(sectionCRN: string) {
  return await prisma.assessment.findMany({
    where: { sectionCRN },
  });
}

export async function createAssessment(data: {
  sectionCRN: string;
  title: string;
  type: string;
  dueDate: Date;
  effortHours: number;
  weight: number;
  createdBy: number;
}) {
  return await prisma.assessment.create({ data });
}

export async function updateAssessment(id: number, data: Partial<{
  sectionCRN: string;
  title: string;
  type: string;
  dueDate: Date;
  effortHours: number;
  weight: number;
}>) {
  return await prisma.assessment.update({
    where: { id },
    data,
  });
}

export async function deleteAssessment(id: number) {
  return await prisma.assessment.delete({
    where: { id },
  });
}

export async function getAssessmentsCountByType() {
  return await prisma.assessment.groupBy({
    by: ['type'],
    _count: { type: true },
  });
}

export async function getWorkloadSummary() {
  return await prisma.assessment.groupBy({
    by: ['sectionCRN'],
    _sum: {
      effortHours: true,
      weight: true
    },
    _count: {
      _all: true
    }
  });
}

export async function getAllAssessmentTypes() {
  return await prisma.assessmentType.findMany();
}

export async function createAssessmentType(data: {
  id: string;
  label: string;
}) {
  return await prisma.assessmentType.create({ data });
}
