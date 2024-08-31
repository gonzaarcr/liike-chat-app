import * as uuid from 'uuid'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { MessagesTable } from '../types/dynamo_obj.js';
import { Message } from '../types/message.js';

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  if (!event.body) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Invalid query parameter: 'id' is missing" }),
    };
  }

  const timestamp = new Date().toISOString();
  const data = JSON.parse(event.body);

  const message: Message = {
    messageId: uuid.v1(),
    content: data.content,
    createdAt: timestamp,
    senderUserId: data.senderUserId,
    groupId: data.groupId ?? "default",
    threadId: data.threadId,
  }
  await new MessagesTable().save(message);

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  };
}
