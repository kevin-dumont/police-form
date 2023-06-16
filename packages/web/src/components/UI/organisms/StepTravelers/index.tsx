import {
  VStack,
  useDisclosure,
  Grid,
  Button,
  Text,
  GridItem,
  Flex,
  Alert,
  AlertIcon,
  AlertTitle,
} from '@chakra-ui/react';
import { AddIcon, ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { TravelerForm } from '../../molecules/TravelerForm';
import { TravelerEditcard } from '../../molecules/TravelerEditCard';

import { travelerFormSchema, ITavelerFormSchema } from '../../../../entities/travelerForm';
import { ITravelerShema } from '../../../../entities/traveler';

export type StepTravelersProps = {
  onChange: (data: ITavelerFormSchema) => void;
  disabled?: boolean;
  onPreviousClick: () => void;
  initialValues: Partial<ITavelerFormSchema>;
};

export function StepTravelers({ onChange, disabled, onPreviousClick, initialValues }: StepTravelersProps) {
  const { isOpen, onClose, onOpen } = useDisclosure();

  const { handleSubmit, control, formState } = useForm<ITavelerFormSchema>({
    resolver: zodResolver(travelerFormSchema),
    defaultValues: initialValues,
  });

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: 'travelers',
  });

  const handleFinishAdd = (data: ITravelerShema) => {
    append(data);
    onClose();
  };

  return (
    <>
      <form onSubmit={handleSubmit(onChange)}>
        <Text mb={5} fontStyle="italic">
          Thank you to register all travelers, children included.
        </Text>

        {formState.errors.travelers?.message && (
          <Alert status="error" mb={3}>
            <AlertIcon />
            <AlertTitle>{formState.errors.travelers?.message}</AlertTitle>
          </Alert>
        )}

        <Grid
          templateColumns={{
            base: '1fr',
            md: 'repeat(2, 1fr)',
            lg: 'repeat(3, 1fr)',
          }}
          gap={6}
        >
          {fields.map((field, index) => (
            <GridItem key={field.id}>
              <Controller
                control={control}
                name={`travelers.${index}`}
                defaultValue={field}
                render={({ field }) => (
                  <TravelerEditcard
                    key={index}
                    index={index}
                    traveler={field.value}
                    onEditFinished={(data) => update(index, data)}
                    onDelete={() => remove(index)}
                    disabled={disabled}
                  />
                )}
              />
            </GridItem>
          ))}

          <GridItem>
            <Button
              disabled={disabled}
              tabIndex={disabled ? -1 : 0}
              onClick={onOpen}
              height={150}
              fontSize={22}
              w="full"
              colorScheme="gray"
            >
              <VStack>
                <AddIcon />
                <Text>Add traveler</Text>
              </VStack>
            </Button>
          </GridItem>
        </Grid>

        <TravelerForm open={isOpen} onClose={onClose} onFinish={handleFinishAdd} />

        <Flex justifyContent="space-between">
          <Button
            mt={10}
            onClick={onPreviousClick}
            disabled={disabled}
            tabIndex={disabled ? -1 : 0}
            colorScheme="gray"
            leftIcon={<ArrowBackIcon />}
          >
            Previous step
          </Button>

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
    </>
  );
}
