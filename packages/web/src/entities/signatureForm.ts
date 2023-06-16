import { z } from 'zod';

export const signaturesSchema = z.object({
  index: z.number(),
  signature: z.string({
    description: 'Must be a valid signature',
  }),
});

export const signaturesFormSchema = z.object({
  signatures: z.array(signaturesSchema),
});

export type ISignaturesFormShema = z.infer<typeof signaturesFormSchema>;
