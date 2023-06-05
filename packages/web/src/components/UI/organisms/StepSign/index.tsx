import { useForm } from "react-hook-form";

import { Button, Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import { ITravelerFormInput } from "../../molecules/TravelerForm";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { calculateAge } from "../../../../services/numbers/calculateAge";
import { TravelerSignCard } from "../../molecules/TravelerSignCard";

interface FormData {
  signatures?: string[];
}

export type StepSignProps = {
  onPreviousClick: () => void;
  onFinish: () => void;
  disabled?: boolean;
  travelers?: ITravelerFormInput[];
};

export const StepSign = ({
  // onFinish,
  travelers,
  onPreviousClick,
  disabled,
}: StepSignProps) => {
  const { handleSubmit } = useForm<FormData>();

  const onSubmit = () =>
    // data: FormData
    {
      // onFinish(data);
    };

  const adults = travelers
    ?.map((traveler, index) => ({ ...traveler, index }))
    ?.filter(({ dateOfBirth }) => calculateAge(dateOfBirth) >= 18);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Text marginTop={10} mb={5} fontStyle="italic">
        These travelers have to sign to finish the process
      </Text>

      <Grid
        templateColumns={{
          base: "1fr",
          md: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)",
        }}
        gap={6}
      >
        {adults?.map(({ index, ...traveler }) => (
          <GridItem key={index}>
            <TravelerSignCard
              index={index}
              traveler={traveler}
              value=""
              onChange={() => null}
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
