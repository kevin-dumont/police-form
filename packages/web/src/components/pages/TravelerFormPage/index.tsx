import {
  Box,
  Button,
  Center,
  HStack,
  Heading,
  Spinner,
  Text,
  useBoolean,
  useSteps,
} from "@chakra-ui/react";
import { CheckCircleIcon, WarningIcon } from "@chakra-ui/icons";
import { useMemo, useState } from "react";

import {
  StepDatesForm,
  StepDatesFormProps,
} from "../../UI/organisms/StepDatesForm";
import {
  StepTravelers,
  StepTravelersProps,
} from "../../UI/organisms/StepTravelers";
import { Steps } from "../../UI/organisms/Steps";
import { StepSign, StepSignProps } from "../../UI/organisms/StepSign";
import { IFormSchema } from "../../../entities/form";
import { calculateAge } from "../../../services/numbers/calculateAge";
import { ITravelerShema } from "../../../entities/traveler";
import { buildTravelerFormOutput } from "../../../services/builders/traveler-form";
import { createTravelerForm } from "../../../services/http-requests/traveler-form/create";

const travelerToSignature = (traveler: ITravelerShema, index: number) => ({
  traveler,
  index,
  signature: traveler.signature,
});

const isAdult = ({ traveler }: { traveler: ITravelerShema }) =>
  calculateAge(traveler.dateOfBirth) >= 18;

export type IFormInput = Partial<IFormSchema>;

export function TravelerFormPage() {
  const [hasBegin, setHasBegin] = useBoolean();
  const [hasFinished, setHasFinished] = useBoolean();
  const [hasError, setHasError] = useBoolean();
  const [isSending, setIsSending] = useBoolean();

  const { activeStep, setActiveStep, isCompleteStep, goToNext, goToPrevious } =
    useSteps({
      index: 0,
      count: 3,
    });

  const [formState, setFormState] = useState<IFormInput>({});

  const onDateChange: StepDatesFormProps["onFinish"] = (dates) => {
    setFormState((state) => ({ ...state, ...dates }));
    goToNext();
  };

  const onTravelersChange: StepTravelersProps["onChange"] = (travelerForm) => {
    setFormState((state) => ({ ...state, ...travelerForm }));
    goToNext();
  };

  const onSignFinished: StepSignProps["onFinish"] = ({ signatures }) => {
    const formInput = {
      ...formState,
      travelers: formState.travelers?.map((traveler, index) => ({
        ...traveler,
        signature: signatures.find((sign) => sign.index === index)?.signature,
      })),
    } as IFormSchema;

    setFormState(formInput);

    setIsSending.on();

    createTravelerForm(buildTravelerFormOutput(formInput))
      .then(setHasFinished.on)
      .catch(setHasError.on)
      .finally(setIsSending.off);
  };

  const initialDatesValues = useMemo(
    () => ({
      checkInDate: formState.checkInDate,
      checkOutDate: formState.checkOutDate,
    }),
    [formState.checkInDate, formState.checkOutDate]
  );

  const initialTravelersValues = useMemo(
    () => ({
      travelers: formState.travelers,
    }),
    [formState.travelers]
  );

  const initialSignatureValues = useMemo(
    () => ({
      signatures: formState.travelers
        ?.map(travelerToSignature)
        .filter(isAdult)
        .map(({ index, signature }) => ({
          index,
          signature,
        })),
    }),
    [formState.travelers]
  );

  if (hasFinished) {
    return (
      <Center h="100vh">
        <HStack>
          <CheckCircleIcon color="green.500" fontSize="2xl" />
          <Text fontWeight="semibold" fontSize="2xl">
            Thanks for your submitting!
          </Text>
        </HStack>
      </Center>
    );
  }

  if (hasError) {
    return (
      <Center h="100vh">
        <HStack>
          <WarningIcon color="red.500" fontSize="2xl" />
          <Text fontWeight="semibold" fontSize="2xl">
            Thanks for your submitting!
          </Text>
        </HStack>
      </Center>
    );
  }

  if (isSending) {
    return (
      <Center h="100vh">
        <HStack>
          <Spinner size="xl" />
        </HStack>
      </Center>
    );
  }

  return (
    <Box maxWidth={900} margin="auto" p={6}>
      <Box marginBottom={30} marginTop={30}>
        <Heading mb={10}>Registration form</Heading>

        {!hasBegin && (
          <>
            <Text>Dear guest,</Text>

            <Text mt={5}>
              We kindly ask you to fill out a quick registration form, which is
              required by French law (Article R. 611-42).
              <br /> Your cooperation helps us ensure a smooth stay for
              everyone.
            </Text>

            <Text mt={5}>Thank you very much!</Text>

            <Button mt={10} onClick={setHasBegin.on}>
              Begin
            </Button>
          </>
        )}
      </Box>

      {hasBegin && !hasFinished && (
        <Steps
          activeStep={activeStep}
          isCompleteStep={isCompleteStep}
          setActiveStep={setActiveStep}
        >
          <Steps.Item title="Dates">
            <StepDatesForm
              initialValues={initialDatesValues}
              onFinish={onDateChange}
              disabled={activeStep !== 0}
            />
          </Steps.Item>

          <Steps.Item title="Travelers">
            <StepTravelers
              initialValues={initialTravelersValues}
              onChange={onTravelersChange}
              disabled={activeStep !== 1}
              onPreviousClick={goToPrevious}
            />
          </Steps.Item>

          <Steps.Item title="Sign">
            <StepSign
              initialValues={initialSignatureValues}
              travelers={formState.travelers ? formState.travelers : []}
              onPreviousClick={goToPrevious}
              onFinish={onSignFinished}
              disabled={activeStep !== 2}
            />
          </Steps.Item>
        </Steps>
      )}
    </Box>
  );
}
