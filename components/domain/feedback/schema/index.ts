import * as y from 'yup';

export const createFeedbackSchema = y.object({
    content: y.string().min(3).max(1000).required("Feedback is required"),
    domain: y.string().required(),
})