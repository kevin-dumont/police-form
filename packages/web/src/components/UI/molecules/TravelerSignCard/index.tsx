import {
  Box,
  Button,
  Modal,
  Text,
  useDisclosure,
  Image,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  HStack,
} from "@chakra-ui/react";
import SignatureField from "../../atoms/SignatureField";
import { useSize } from "@chakra-ui/react-use-size";
import { useRef, useState } from "react";
import { TravelerCard } from "../../atoms/TravelerCard";
import { ITravelerFormInput } from "../TravelerForm";

export type TravelerSignCardProps = {
  index: number;
  value: string;
  traveler: ITravelerFormInput;
  onChange: (value: string) => void;
};

export const TravelerSignCard = ({
  traveler,
  index,
  value,
  onChange,
}: TravelerSignCardProps) => {
  const signContainerRef = useRef<HTMLDivElement>(null);

  const { isOpen, onClose, onOpen } = useDisclosure();

  const [currentValue, setCurrentValue] = useState<string>();

  const size = useSize(signContainerRef);

  const handleSave = () => void onChange?.(currentValue as string);

  return (
    <>
      <TravelerCard traveler={traveler} index={index}>
        <Button colorScheme="gray" onClick={onOpen}>
          Sign
        </Button>
      </TravelerCard>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="full"
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent display="flex" alignItems="center" animation={"unset"}>
          <ModalCloseButton />
          <ModalBody>
            <Box ref={signContainerRef}>
              <Text fontWeight="semibold" mt={10} mb={3}>
                Please to sign bellow :
              </Text>

              <SignatureField
                height={250}
                width={Math.min(size?.height ?? 350, 350)} // handle small screens
                onChange={setCurrentValue}
              />

              <HStack mt={3}>
                <Button onClick={onClose} mr={2} colorScheme="gray">
                  Cancel
                </Button>
                <Button onClick={handleSave} disabled={!currentValue}>
                  Save
                </Button>
              </HStack>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
