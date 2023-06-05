import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  IconButton,
  Tooltip,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import { ITravelerFormInput, TravelerForm } from "../TravelerForm";
import { TravelerCard } from "../../atoms/TravelerCard";

export type TravelerCardProps = {
  index: number;
  traveler: ITravelerFormInput;
  onDelete: () => void;
  onEditFinished: (data: ITravelerFormInput) => void;
  disabled?: boolean;
};

export const TravelerEditcard = ({
  index,
  onDelete,
  onEditFinished,
  traveler,
  disabled,
}: TravelerCardProps) => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  const disableTooltips = useBreakpointValue(
    { base: false, xs: true },
    { ssr: false }
  );

  return (
    <>
      <TravelerCard traveler={traveler} index={index}>
        <Tooltip label="Edit" hasArrow isDisabled={disableTooltips}>
          <IconButton
            size="sm"
            onClick={onOpen}
            aria-label="Edit"
            icon={<EditIcon />}
            disabled={disabled}
            tabIndex={disabled ? -1 : 0}
            colorScheme="gray"
          />
        </Tooltip>

        <Tooltip label="Delete" hasArrow isDisabled={disableTooltips}>
          <IconButton
            ml={2}
            size="sm"
            onClick={onDelete}
            aria-label="Delete"
            icon={<DeleteIcon />}
            disabled={disabled}
            tabIndex={disabled ? -1 : 0}
          />
        </Tooltip>
      </TravelerCard>

      <TravelerForm
        open={isOpen}
        onClose={onClose}
        onFinish={onEditFinished}
        defaultValues={traveler}
      />
    </>
  );
};
