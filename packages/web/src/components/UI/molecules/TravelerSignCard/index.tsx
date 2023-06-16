import { useRef, useState } from 'react';
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
} from '@chakra-ui/react';
import { useSize } from '@chakra-ui/react-use-size';

import SignatureField from '../../atoms/SignatureField';
import { TravelerCard } from '../../atoms/TravelerCard';

import { ITravelerShema } from '../../../../entities/traveler';
import { EditIcon } from '@chakra-ui/icons';

export type TravelerSignCardProps = {
  index: number;
  traveler: ITravelerShema;
  value: string;
  onChange: (value: string) => void;
};

export const TravelerSignCard = ({ index, traveler, value, onChange }: TravelerSignCardProps) => {
  const signContainerRef = useRef<HTMLDivElement>(null);

  const { isOpen, onClose, onOpen } = useDisclosure();

  const [signature, setSignature] = useState<string>('');

  const size = useSize(signContainerRef);

  const handleSave = () => {
    onChange?.(signature);
    onClose();
  };

  return (
    <>
      <TravelerCard traveler={traveler} index={index}>
        {value && <Image src={value} maxHeight={14} />}
        {!value && (
          <Button colorScheme="gray" onClick={onOpen} mt={5} size="sm" leftIcon={<EditIcon />}>
            Sign
          </Button>
        )}
      </TravelerCard>

      <Modal isOpen={isOpen} onClose={onClose} size="full" motionPreset="slideInBottom">
        <ModalOverlay />
        <ModalContent display="flex" alignItems="center" animation={'unset'}>
          <ModalCloseButton />
          <ModalBody>
            <Box ref={signContainerRef}>
              <Text fontWeight="semibold" mt={10} mb={3}>
                Please to sign bellow :
              </Text>

              <SignatureField
                height={250}
                width={Math.min(size?.height ?? 350, 350)} // handle small screens
                onChange={setSignature}
              />

              <HStack mt={3}>
                <Button onClick={onClose} mr={2} colorScheme="gray">
                  Cancel
                </Button>
                <Button onClick={handleSave} disabled={!signature}>
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
