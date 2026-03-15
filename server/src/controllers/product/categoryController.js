import { Category } from "../../models/categorySchema";

export const getAllCategories = async (req, reply) => {
  try {
    const categories = await Category.find();
    if (!categories) {
      return reply.status(403).send({
        message: "Didn't fid any category",
      });
    }
    return reply.send(categories);
  } catch (error) {
    return reply.status(500).send({
      message: "An error occurred",
      error,
    });
  }
};
