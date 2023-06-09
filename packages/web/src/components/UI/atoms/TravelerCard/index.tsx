import { PropsWithChildren } from 'react';
import { Box, Flex, HStack, Heading, Tag, Text } from '@chakra-ui/react';
import { countries } from 'countries-list';

import { calculateAge } from '../../../../services/numbers/calculateAge';
import { ITravelerShema } from '../../../../entities/traveler';

export type TravelerCardProps = PropsWithChildren<{
  index: number;
  traveler: ITravelerShema;
}>;

export const TravelerCard: React.FC<TravelerCardProps> = ({ traveler, index, children }) => {
  const age = calculateAge(traveler.dateOfBirth);

  return (
    <>
      <Box maxW="sm" borderWidth="1px" borderRadius="lg" height={150}>
        <Box p="4" alignItems="baseline">
          <HStack justifyContent="space-between">
            <Heading size="md"> Traveler {index + 1}</Heading>
            <Tag>{age >= 18 ? 'Adult' : 'Child'}</Tag>
          </HStack>
          <Text noOfLines={1} mt={4}>
            {countries[traveler.nationality].emoji} {traveler.firstName} {traveler.lastName}
          </Text>
          <Flex justifyContent="flex-end">{children}</Flex>
        </Box>
      </Box>
    </>
  );
};
