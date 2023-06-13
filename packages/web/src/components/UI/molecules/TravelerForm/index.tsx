import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormErrorMessage,
  Box,
  Textarea,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";

import { CountrySelect } from "../../atoms/CountrySelect";
import { ITravelerShema, travelerSchema } from "../../../../entities/traveler";

type TravelerFormProps = {
  onFinish: (data: ITravelerShema) => void;
  defaultValues?: ITravelerShema;
  open: boolean;
  onClose: () => void;
};

export function TravelerForm({
  onFinish,
  defaultValues,
  open,
  onClose,
}: TravelerFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ITravelerShema>({
    resolver: zodResolver(travelerSchema),
    defaultValues,
  });

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  const onSubmit = (data: ITravelerShema) => {
    onFinish(data);
    onClose();
    reset();
  };

  return (
    <Modal
      isOpen={open}
      onClose={onClose}
      size="full"
      motionPreset="slideInBottom"
    >
      <ModalOverlay />
      <ModalContent display="flex" alignItems="center" animation={"unset"}>
        <ModalHeader maxW={400}>
          {defaultValues ? "Edit traveler" : "Add traveler"}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6} maxW={400}>
          <Box>
            <form onSubmit={handleSubmit(onSubmit)}>
              <VStack spacing="4">
                <FormControl id="firstName" isInvalid={!!errors.firstName}>
                  <FormLabel>First Name</FormLabel>
                  <Input type="text" {...register("firstName")} size="md" />
                  <FormErrorMessage>
                    {errors.firstName?.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl id="lastName" isInvalid={!!errors.lastName}>
                  <FormLabel>Last Name</FormLabel>
                  <Input type="text" {...register("lastName")} />
                  <FormErrorMessage>
                    {errors.lastName?.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl id="nationality" isInvalid={!!errors.nationality}>
                  <FormLabel>Nationality</FormLabel>
                  <CountrySelect {...register("nationality")} />
                  <FormErrorMessage>Nationality is required</FormErrorMessage>
                </FormControl>

                <FormControl id="dateOfBirth" isInvalid={!!errors.dateOfBirth}>
                  <FormLabel>Date of Birth</FormLabel>
                  <Input type="date" {...register("dateOfBirth")} />
                  <FormErrorMessage>
                    {errors.dateOfBirth?.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl
                  id="placeOfBirth"
                  isInvalid={!!errors.placeOfBirth}
                >
                  <FormLabel>Place of Birth</FormLabel>
                  <Input type="text" {...register("placeOfBirth")} />
                  <FormErrorMessage>
                    {errors.placeOfBirth?.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl
                  id="fullHomeAddress"
                  isInvalid={!!errors.fullHomeAddress}
                >
                  <FormLabel>Full Home Address</FormLabel>
                  <Textarea {...register("fullHomeAddress")} />
                  <FormErrorMessage>
                    {errors.fullHomeAddress?.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl id="phone" isInvalid={!!errors.phone}>
                  <FormLabel>Phone</FormLabel>
                  <Input type="tel" {...register("phone")} />
                  <FormErrorMessage>{errors.phone?.message}</FormErrorMessage>
                </FormControl>

                <FormControl id="email" isInvalid={!!errors.email}>
                  <FormLabel>Email</FormLabel>
                  <Input type="email" {...register("email")} />
                  <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
                </FormControl>
              </VStack>
            </form>
          </Box>
        </ModalBody>

        <ModalFooter>
          <Button onClick={onClose} mr={3} colorScheme="gray">
            Cancel
          </Button>
          <Button onClick={handleSubmit(onSubmit)}>Save</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
