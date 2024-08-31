import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { UsersTable } from "../types/dynamo_obj.js";

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const message = await new UsersTable().get(event.pathParameters.id);

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  };
};
