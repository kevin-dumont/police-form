import { useForm } from "react-hook-form";
import {
  FormControl,
  FormLabel,
  VStack,
  FormErrorMessage,
  Input,
  Box,
  Flex,
  Button,
  Center,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ArrowForwardIcon } from "@chakra-ui/icons";

const schema = z.object({
  checkInDate: z.string().nonempty({ message: "Start Date is required" }),
  checkOutDate: z.string().nonempty({ message: "End Date is required" }),
});

export type ITravelDatesFormInput = {
  checkInDate: string;
  checkOutDate: string;
};

export type StepDatesFormProps = {
  onFinish: (data: ITravelDatesFormInput) => void;
  disabled?: boolean;
};

export function StepDatesForm({ onFinish, disabled }: StepDatesFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ITravelDatesFormInput>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: ITravelDatesFormInput) => {
    onFinish(data);
  };

  return (
    <Box mt={10}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Center>
          <VStack spacing="4" maxW={400} w="full">
            <FormControl id="checkInDate" isInvalid={!!errors.checkInDate}>
              <FormLabel>Check in date</FormLabel>
              <Input
                type="date"
                {...register("checkInDate", { disabled })}
                tabIndex={disabled ? -1 : 0}
              />
              <FormErrorMessage>{errors.checkInDate?.message}</FormErrorMessage>
            </FormControl>

            <FormControl id="checkOutDate" isInvalid={!!errors.checkOutDate}>
              <FormLabel>Check out Date</FormLabel>
              <Input
                type="date"
                {...register("checkOutDate", { disabled })}
                tabIndex={disabled ? -1 : 0}
              />
              <FormErrorMessage>
                {errors.checkOutDate?.message}
              </FormErrorMessage>
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
