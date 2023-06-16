import { z } from 'zod';

export const dateFormSchema = z
  .object({
    checkInDate: z.string().nonempty({ message: 'Start Date is required' }),
    checkOutDate: z.string().nonempty({ message: 'End Date is required' }),
  })
  .refine(
    (schema) => {
      if (!schema.checkInDate || !schema.checkOutDate) {
        return true;
      }

      return new Date(schema.checkOutDate) > new Date(schema.checkInDate);
    },
    { message: 'End Date must be after Start Date', path: ['checkOutDate'] },
  );

export type IDateFormSchema = z.infer<typeof dateFormSchema>;
