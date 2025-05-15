
import prisma from "../prisma";

export async function getAllComments() {
  return await prisma.comment.findMany();
}

export async function getCommentsBySection(sectionCRN: string) {
  return await prisma.comment.findMany({
    where: { sectionCRN },
  });
}

export async function createComment(data: {
  sectionCRN: string;
  authorId: number;
  title?: string;
  content: string;
  replyToCommentId?: number;
}) {
  return await prisma.comment.create({ data });
}

export async function updateComment(id: number, data: Partial<{
  title?: string;
  content?: string;
}>) {
  return await prisma.comment.update({
    where: { id },
    data,
  });
}

export async function deleteComment(id: number) {
  return await prisma.comment.delete({
    where: { id },
  });
}
