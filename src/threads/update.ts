import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { ThreadsTable } from "../types/dynamo_obj.js";

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const data = JSON.parse(event.body);
  const response = await new ThreadsTable().edit(event.pathParameters.id, data)

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(response),
  };
};