import * as uuid from 'uuid'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { UsersTable } from '../types/dynamo_obj';

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  if (!event.body) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Invalid query parameter: 'id' is missing" }),
    };
  }

  const timestamp = new Date().toISOString();
  const data = JSON.parse(event.body);

  const user: User = {
    userId: uuid.v1(),
    profileImageUrl: "url",
    createdAt: timestamp,
    dateOfBirth: timestamp,
    userName: data.userName,
  }
  await new UsersTable().save(user);

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  };
}
