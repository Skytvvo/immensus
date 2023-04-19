import microserviceConfig from "../../microservice.config";

export const PORT_POST = process.env.PORT_POST_SERVICE || 4403;
export const HOST_POST = process.env.HOST_POST_SERVICE || 'localhost';
export const POST_NAME = 'post';

export const postConfig = microserviceConfig(HOST_POST, PORT_POST, POST_NAME)

export const POST_SERVICE_NAME = 'PostService';
