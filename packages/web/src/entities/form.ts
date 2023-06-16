import { z } from 'zod';

import { travelerFormSchema } from './travelerForm';
import { dateFormSchema } from './dateForm';

export const formSchema = travelerFormSchema.and(dateFormSchema);

export type IFormSchema = z.infer<typeof formSchema>;
