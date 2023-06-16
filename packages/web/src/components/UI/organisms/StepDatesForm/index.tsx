import { useForm } from 'react-hook-form';
import { FormControl, FormLabel, VStack, FormErrorMessage, Input, Box, Flex, Button, Center } from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import { zodResolver } from '@hookform/resolvers/zod';

import { IDateFormSchema, dateFormSchema } from '../../../../entities/dateForm';

export type StepDatesFormProps = {
  onFinish: (data: IDateFormSchema) => void;
  disabled?: boolean;
  initialValues: Partial<IDateFormSchema>;
};

export function StepDatesForm({ onFinish, disabled, initialValues }: StepDatesFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IDateFormSchema>({
    resolver: zodResolver(dateFormSchema),
    defaultValues: initialValues,
  });

  return (
    <Box>
      <form onSubmit={handleSubmit(onFinish)}>
        <Center>
          <VStack spacing="4" maxW={400} w="full">
            <FormControl id="checkInDate" isInvalid={!!errors.checkInDate}>
              <FormLabel>Check in date</FormLabel>
              <Input type="date" {...register('checkInDate', { disabled })} tabIndex={disabled ? -1 : 0} />
              <FormErrorMessage>{errors.checkInDate?.message}</FormErrorMessage>
            </FormControl>

            <FormControl id="checkOutDate" isInvalid={!!errors.checkOutDate}>
              <FormLabel>Check out Date</FormLabel>
              <Input type="date" {...register('checkOutDate', { disabled })} tabIndex={disabled ? -1 : 0} />
              <FormErrorMessage>{errors.checkOutDate?.message}</FormErrorMessage>
            </FormControl>
          </VStack>
        </Center>

        <Flex justifyContent="flex-end">
          <Button
            mt={10}
            type="submit"
            disabled={disabled}
            tabIndex={disabled ? -1 : 0}
            rightIcon={<ArrowForwardIcon />}
          >
            Next step
          </Button>
        </Flex>
      </form>
    </Box>
  );
}
