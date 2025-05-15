import prisma from "@/lib/prisma";

class CommentRepo {
  // Get all comments for a section
  async getComments(sectionCRN) {
    const comments = await prisma.comment.findMany({
      where: { sectionCRN},
      orderBy: { createdAt: "asc" },
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

  // Get all replies to a specific comment
  async getCommentReplies(commentId) {
    const replies = await prisma.comment.findMany({
      where: { replyToCommentId: commentId },
      orderBy: { createdAt: "asc" },
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

  // Add a new comment or reply
  async addComment(comment) {
    const newComment = await prisma.comment.create({
      data: {
        content: comment.content,
        createdAt: new Date(), // optional, Prisma will handle this if omitted
        authorId: comment.authorId,
        sectionCRN: comment.sectionCRN,
        replyToCommentId: comment.replyToCommentId || null,
      },
    });

    return newComment;
  }

  // Delete a comment and its replies
  async deleteComment(commentId) {
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
