import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { MessagesTable } from "../types/dynamo_obj.js";

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult>  => {
  const messages = await new MessagesTable().getByThread(event.pathParameters.id, 10);

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(messages),
  };
};