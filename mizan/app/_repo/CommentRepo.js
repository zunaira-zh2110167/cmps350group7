import { PrismaClient } from "@prisma/client";
import userRepo from "./UserRepo";

const prisma = new PrismaClient();

class CommentRepo {
  async getComments(sectionCRN) {
    const comments = await prisma.comment.findMany({
      where: { sectionCRN, replyToCommentId: null },
      orderBy: { date: "asc" },
      include: {
        author: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    return comments.map((comment) => ({
      ...comment,
      authorName: `${comment.author.firstName} ${comment.author.lastName}`,
    }));
  }

  async getCommentReplies(commentId) {
    const replies = await prisma.comment.findMany({
      where: { replyToCommentId: commentId },
      orderBy: { date: "asc" },
      include: {
        author: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    return replies.map((reply) => ({
      ...reply,
      authorName: `${reply.author.firstName} ${reply.author.lastName}`,
    }));
  }

  async addComment(comment) {
    const newComment = await prisma.comment.create({
      data: {
        content: comment.content,
        date: new Date(),
        createdDate: new Date().toISOString().split("T")[0],
        authorId: comment.authorId,
        sectionCRN: comment.sectionCRN,
        replyToCommentId: comment.replyToCommentId || null,
      },
    });

    return newComment;
  }

  async deleteComment(commentId) {
    // Delete all replies first
    await prisma.comment.deleteMany({
      where: {
        OR: [
          { id: commentId },
          { replyToCommentId: commentId },
        ],
      },
    });
  }
}

export default new CommentRepo();
