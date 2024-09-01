import * as uuid from 'uuid'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { GroupsTable } from '../types/dynamo_obj';

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  if (!event.body) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Invalid query parameter: 'id' is missing" }),
    };
  }

  const timestamp = new Date().toISOString();
  const data = JSON.parse(event.body);

  const group: Group = {
    groupId: uuid.v1(),
    createdAt: timestamp,
    groupName: data.groupName,
    lastMessageAt: timestamp,
  }
  await new GroupsTable().save(group);

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(group),
  };
}
