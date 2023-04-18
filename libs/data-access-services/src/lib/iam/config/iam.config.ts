import microserviceConfig from "../../microservice.config";

export const PORT_IAM = process.env.PORT_IAM_SERVICE || 4400;
export const HOST_IAM = process.env.HOST_IAM_SERVICE || 'localhost';
export const NAME_IAM = 'iam';

export const iamConfig = microserviceConfig(HOST_IAM, PORT_IAM, NAME_IAM);

export const IAM_SERVICE_NAME = 'IamService';
