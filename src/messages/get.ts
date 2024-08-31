import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { MessagesTable } from "../types/dynamo_obj";

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  if (!event.pathParameters?.id) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Invalid query parameter: 'id' is missing" }),
    };
  }

  const message = await new MessagesTable().get(event.pathParameters.id);

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  };
};
