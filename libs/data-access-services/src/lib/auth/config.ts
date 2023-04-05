import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { join } from 'path';

const PORT = process.env.PORT_AUTHORIZATION_SERVICE || 4400;
const HOST = process.env.HOST_AUTHORIZATION_SERVICE || 'localhost';

const config: MicroserviceOptions ={
  transport: Transport.GRPC,
  options: {
    package: 'authentication',
    protoPath: join(__dirname, '../../../apps/authorization-service/src/authentication.proto'),
    url: `${HOST}:${PORT}`,
    loader: { keepCase: true, arrays: true, objects: true },
  },
};

export default config;
