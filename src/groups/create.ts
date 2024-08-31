import * as uuid from 'uuid'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { GroupsTable } from '../types/dynamo_obj.js';

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
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
