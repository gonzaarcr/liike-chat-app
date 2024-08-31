import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { GroupsTable } from "../types/dynamo_obj.js";

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const message = await new GroupsTable().get(event.pathParameters.id);

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  };
};
