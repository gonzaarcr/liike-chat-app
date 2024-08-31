import * as uuid from 'uuid'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { ThreadsTable } from '../types/dynamo_obj.js';

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  if (!event.body) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Invalid query parameter: 'id' is missing" }),
    };
  }

  const timestamp = new Date().toISOString();
  const data = JSON.parse(event.body);

  const thread: Thread = {
    createdAt: timestamp,
    threadId: uuid.v1(),
    threadName: data.threadName,
    groupId: data.groupId,
    color: data?.color ?? "blue",
    lastMessageAt: timestamp,
  }
  await new ThreadsTable().save(thread);

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(thread),
  };
}
