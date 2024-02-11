import { domains } from "@/config/domains";
import * as y from "yup";

const domainsEnum = domains.map((domain) => domain.id);

export const postVideoSchema = y.object({
  url: y.string().url().required(),
  domain: y.string().oneOf(domainsEnum).required(),
});
