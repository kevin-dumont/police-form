import { z } from "zod";

const base64Regex =
  /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;

const base64Schema = z.string().refine((value) => base64Regex.test(value), {
  message: "Must be a valid base64 string",
});

export const signaturesSchema = z.object({
  index: z.number(),
  signature: base64Schema,
});

export const signaturesFormSchema = z.object({
  signatures: z.array(signaturesSchema),
});

export type ISignaturesFormShema = z.infer<typeof signaturesFormSchema>;
