import { Controller, useFieldArray, useForm } from "react-hook-form";
import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Grid,
  GridItem,
  Text,
} from "@chakra-ui/react";

import { TravelerSignCard } from "../../molecules/TravelerSignCard";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ISignaturesFormShema,
  signaturesFormSchema,
} from "../../../../entities/signatureForm";
import { ITravelerShema } from "../../../../entities/traveler";
import { DeepPartial } from "../../../../types/utilities";

export type StepSignProps = {
  onPreviousClick: () => void;
  onFinish: (data: ISignaturesFormShema) => void;
  disabled?: boolean;
  initialValues?: DeepPartial<ISignaturesFormShema>;
  travelers: ITravelerShema[];
};

export const StepSign = ({
  onFinish,
  initialValues,
  onPreviousClick,
  disabled,
  travelers,
}: StepSignProps) => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ISignaturesFormShema>({
    defaultValues: initialValues,
    resolver: zodResolver(signaturesFormSchema),
  });

  const { fields } = useFieldArray({ control, name: "signatures" });

  const onSubmit = (data: ISignaturesFormShema) => {
    onFinish?.(data);
  };

  useEffect(() => {
    reset(initialValues);
  }, [initialValues]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Text mb={5} fontStyle="italic">
        These travelers have to sign to finish the process
      </Text>

      <Grid
        gap={6}
        templateColumns={{
          base: "1fr",
          md: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)",
        }}
      >
        {fields?.map((item, index) => (
          <GridItem key={item.id}>
            <Controller
              render={({ field }) => (
                <FormControl
                  id={`signatures.${index}`}
                  isInvalid={
                    !!errors.signatures?.[item.index]?.signature?.message
                  }
                >
                  <TravelerSignCard
                    traveler={travelers[field.value.index]}
                    index={field.value.index}
                    value={field.value.signature}
                    onChange={(signature) =>
                      field.onChange({ index, signature })
                    }
                  />
                  <FormErrorMessage>
                    {errors.signatures?.[item.index]?.signature?.message}
                  </FormErrorMessage>
                </FormControl>
              )}
              name={`signatures.${index}`}
              control={control}
            />
          </GridItem>
        ))}
      </Grid>

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
        >
          Finish registration
        </Button>
      </Flex>
    </form>
  );
};
