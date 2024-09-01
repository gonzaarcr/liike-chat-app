import { ApiGatewayManagementApi } from "@aws-sdk/client-apigatewaymanagementapi";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

export const connectHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const connectionId = event.requestContext.connectionId;
  console.log(`connectionId: ${connectionId}`);

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  };
};

export const disconnectHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const connectionId = event.requestContext.connectionId;
  console.log(`connectionId: ${connectionId}`);

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  };
};

export const helloHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  return await sendMessage(event);
};

export const sendMessage = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  console.log(JSON.stringify(event));
  const { message } = JSON.parse(event.body!);
  const domain = event.requestContext.domainName
  const stage = event.requestContext.stage
  const connectionId = event.requestContext.connectionId
  const callbackUrlForAWS = `https://${domain}/${stage}`
  console.log(`Message from ${connectionId}: ${message}`);

  sendToClient(connectionId!, message, callbackUrlForAWS);

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  };
};

const sendToClient = async (connectionId: string, message: string, url: string) => {
  const apiGatewayManagementApi = new ApiGatewayManagementApi({ endpoint: url });

  await apiGatewayManagementApi.postToConnection({
    ConnectionId: connectionId,
    Data: message,
  });
};