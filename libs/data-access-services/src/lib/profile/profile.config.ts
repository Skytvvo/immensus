import microserviceConfig from "../microservice.config";

const PORT_PROFILE = process.env.PORT_PROFILE_SERVICE || 4402;
const HOST_PROFILE = process.env.HOST_PROFILE_SERVICE || 'localhost';
const PROFILE_NAME = 'profile';

export const profileConfig = microserviceConfig(HOST_PROFILE, PORT_PROFILE, PROFILE_NAME);


export const PROFILE_SERVICE_NAME = 'ProfileService';
