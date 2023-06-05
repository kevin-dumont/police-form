import { useCallback, useState } from "react";
import {
  VStack,
  useDisclosure,
  Grid,
  Button,
  Text,
  GridItem,
  Flex,
} from "@chakra-ui/react";
import { AddIcon, ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { ITravelerFormInput, TravelerForm } from "../../molecules/TravelerForm";
import { TravelerEditcard } from "../../molecules/TravelerEditCard";

export type StepTravelersProps = {
  onChange?: (data: ITravelerFormInput[]) => void;
  disabled?: boolean;
  onPreviousClick: () => void;
};

export function StepTravelers({
  onChange,
  disabled,
  onPreviousClick,
}: StepTravelersProps) {
  const [travelers, setTravelers] = useState<ITravelerFormInput[]>([]);

  const { isOpen, onClose, onOpen } = useDisclosure();

  const handleFinishAdd = (data: ITravelerFormInput) => {
    const updatedTravelers = [...travelers, data];

    setTravelers(updatedTravelers);
  };

  const handleFinishEdit = (index: number, data: ITravelerFormInput) => {
    setTravelers((oldTraveler) =>
      oldTraveler.map((traveler, i) => (i === index ? data : traveler))
    );
  };

  const handleDelete = (index: number) => {
    setTravelers((oldTraveler) => oldTraveler.filter((_, i) => i !== index));
  };

  const handleNextClick = useCallback(() => {
    onChange?.(travelers);
  }, [travelers]);

  return (
    <>
      <Text marginTop={10} mb={5} fontStyle="italic">
        Thank you to register all travelers, children included.
      </Text>

      <Grid
        templateColumns={{
          base: "1fr",
          md: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)",
        }}
        gap={6}
      >
        {travelers.map((traveler, index) => (
          <GridItem>
            <TravelerEditcard
              key={index}
              index={index}
              traveler={traveler}
              onEditFinished={(data) => handleFinishEdit(index, data)}
              onDelete={() => handleDelete(index)}
              disabled={disabled}
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

      <TravelerForm
        open={isOpen}
        onClose={onClose}
        onFinish={handleFinishAdd}
      />

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
          onClick={handleNextClick}
          disabled={disabled}
          tabIndex={disabled ? -1 : 0}
          rightIcon={<ArrowForwardIcon />}
        >
          Next step
        </Button>
      </Flex>
    </>
  );
}
