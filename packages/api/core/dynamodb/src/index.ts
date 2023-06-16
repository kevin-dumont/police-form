import { DataMapper } from '@aws/dynamodb-data-mapper';
import DynamoDB from 'aws-sdk/clients/dynamodb';

export const getDataMapper = () => {
  const client = new DynamoDB({
    region: 'eu-west-1',
  });

  return new DataMapper({ client });
};
