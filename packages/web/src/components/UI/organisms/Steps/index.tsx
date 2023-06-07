import {
  Box,
  Step,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  useSteps,
} from "@chakra-ui/react";
import { useSize } from "@chakra-ui/react-use-size";
import React, {
  PropsWithChildren,
  ReactElement,
  ReactNode,
  RefObject,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from "react";

export type Step = {
  title: string;
  step: ReactNode;
};

export type StepsProps = {
  children: ReactElement<StepsItemProps>[];
} & Pick<
  ReturnType<typeof useSteps>,
  "activeStep" | "setActiveStep" | "isCompleteStep"
>;

type StepContextType = {
  activeStep: number;
  isActiveStep: (title: string) => boolean;
  activeStepRef: RefObject<HTMLDivElement> | null;
};

const StepContext = createContext<StepContextType>({
  activeStep: 0,
  isActiveStep: () => false,
  activeStepRef: null,
});

export const Steps = ({
  activeStep,
  isCompleteStep,
  setActiveStep,
  children,
}: StepsProps) => {
  const currentStepRef = useRef<HTMLDivElement>(null);

  const currentStepSizes = useSize(currentStepRef);

  const getStepIndex = useCallback(
    (title: string) =>
      React.Children.toArray(children).findIndex(
        (step: any) => step.props.title === title
      ),
    [children]
  );

  const isActiveStep = useCallback(
    (title: string) => getStepIndex(title) === activeStep,
    [activeStep, getStepIndex]
  );

  useEffect(() => {
    const initialOverflow = document.body.style.overflowX;

    document.body.style.overflowX = "hidden";

    return () => {
      document.body.style.overflowX = initialOverflow;
    };
  }, []);

  return (
    <StepContext.Provider
      value={{ activeStep, isActiveStep, activeStepRef: currentStepRef }}
    >
      <Stepper size="md" index={activeStep}>
        {React.Children.map(children, (step, index) => (
          <Step
            key={index}
            onClick={() => {
              if (isCompleteStep(index)) {
                setActiveStep(index);
              }
            }}
          >
            <StepIndicator>
              <StepStatus
                complete={<StepIcon />}
                incomplete={<StepNumber />}
                active={<StepNumber />}
              />
            </StepIndicator>

            <StepTitle>{step.props.title}</StepTitle>

            <StepSeparator />
          </Step>
        ))}
      </Stepper>

      <Box
        position="relative"
        mt={16}
        marginLeft={-10}
        marginRight={-10}
        height={currentStepSizes?.height}
      >
        <Box
          transform={`translateX(-${activeStep * 100}%)`}
          transition="transform 0.5s ease"
          position="absolute"
          left={0}
          right={0}
          display="flex"
          h={currentStepSizes?.height}
        >
          {children}
        </Box>
      </Box>
    </StepContext.Provider>
  );
};

export type StepsItemProps = PropsWithChildren<{
  title: string;
}>;

Steps.Item = ({ title, children }: StepsItemProps) => {
  const { isActiveStep, activeStepRef } = useContext(StepContext);

  return (
    <Box minW="full" paddingLeft={10} paddingRight={10} position="relative">
      <Box
        position="absolute"
        display={isActiveStep(title) ? "none" : "block"}
        zIndex={1}
        top={0}
        left={0}
        right={0}
        bottom={0}
      />

      <Box
        minW="full"
        opacity={isActiveStep(title) ? "1" : "0"}
        transition="opacity 0.5s ease"
        ref={isActiveStep(title) ? activeStepRef : undefined}
      >
        {children}
      </Box>
    </Box>
  );
};
