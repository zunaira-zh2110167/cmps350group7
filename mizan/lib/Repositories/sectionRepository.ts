
import prisma from "../prisma";

export async function getAllSections() {
  return await prisma.section.findMany();
}

export async function getSectionsByInstructor(instructorId: number) {
  return await prisma.section.findMany({
    where: { instructorId },
  });
}
