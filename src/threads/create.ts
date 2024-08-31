import * as uuid from 'uuid'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { ThreadsTable } from '../types/dynamo_obj.js';

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const timestamp = new Date().toISOString();
  const data = JSON.parse(event.body);

  const thread: Thread = {
    createdAt: timestamp,
    threadId: uuid.v1(),
    threadName: data.threadName,
    color: data?.color ?? "blue",
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
