import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { ThreadsTable } from "../types/dynamo_obj";

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult>  => {
  if (!event.pathParameters?.id) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Invalid query parameter: 'id' is missing" }),
    };
  }

  const messages = await new ThreadsTable().getByGroup(event.pathParameters.id, 10);

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(messages),
  };
};