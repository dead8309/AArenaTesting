import * as y from "yup"

export const createResourceSchema = y.object({
    title: y.string().min(3).max(100).required(),
    content: y.string().optional(),
    url: y.string().url().required(),
    domain: y.string().required()
})