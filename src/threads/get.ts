import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { ThreadsTable } from "../types/dynamo_obj.js";

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const message = await new ThreadsTable().get(event.pathParameters.id);

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  };
};
