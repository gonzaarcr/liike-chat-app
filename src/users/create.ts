import * as uuid from 'uuid'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { UsersTable } from '../types/dynamo_obj.js';

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
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
