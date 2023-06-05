import {
  Box,
  Button,
  Heading,
  Text,
  useBoolean,
  useSteps,
} from "@chakra-ui/react";
import {
  ITravelDatesFormInput,
  StepDatesForm,
  StepDatesFormProps,
} from "../../UI/organisms/StepDatesForm";
import { useState } from "react";
import { ITravelerFormInput } from "../../UI/molecules/TravelerForm";
import {
  StepTravelers,
  StepTravelersProps,
} from "../../UI/organisms/StepTravelers";
import { Steps } from "../../UI/organisms/Steps";
import { StepSign, StepSignProps } from "../../UI/organisms/StepSign";

const steps = [{ title: "Dates" }, { title: "Travelers" }, { title: "Sign" }];

export function TravelerFormPage() {
  const [hasBegin, setHasBegin] = useBoolean();

  const { activeStep, setActiveStep, isCompleteStep, goToNext, goToPrevious } =
    useSteps({
      index: 0,
      count: steps.length,
    });

  const [formState, setFormState] = useState<
    Partial<ITravelDatesFormInput> & {
      travelers?: ITravelerFormInput[];
    }
  >({});

  const onDateChange: StepDatesFormProps["onFinish"] = (dates) => {
    setFormState((state) => ({ ...state, ...dates }));
    goToNext();
  };

  const onTravelersChange: StepTravelersProps["onChange"] = (travelers) => {
    setFormState((state) => ({ ...state, travelers }));
    goToNext();
  };

  const onSignFinished: StepSignProps["onFinish"] = () => {};

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

      {hasBegin && (
        <Steps
          activeStep={activeStep}
          isCompleteStep={isCompleteStep}
          setActiveStep={setActiveStep}
        >
          <Steps.Item title="Dates">
            <StepDatesForm
              onFinish={onDateChange}
              disabled={activeStep !== 0}
            />
          </Steps.Item>
          <Steps.Item title="Travelers">
            <StepTravelers
              onChange={onTravelersChange}
              disabled={activeStep !== 1}
              onPreviousClick={goToPrevious}
            />
          </Steps.Item>
          <Steps.Item title="Sign">
            <StepSign
              travelers={formState.travelers}
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
