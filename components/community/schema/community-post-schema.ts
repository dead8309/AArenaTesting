import * as y from "yup";

export const communityPostSchema = y.object({
  title: y.string().required(),
  content: y.string().required(),
  tags: y.array(y.string()).optional(),
});
