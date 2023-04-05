import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { join } from 'path';

const PORT = process.env.PORT_PROFILE_SERVICE || 4402;
const HOST = process.env.HOST_PROFILE_SERVICE || 'localhost';

const microserviceConfig: MicroserviceOptions ={
  transport: Transport.GRPC,
  options: {
    package: 'profile',
    protoPath: join(__dirname, '../../../apps/profile-service/profile.proto'),
    url: `${HOST}:${PORT}`,
    loader: { keepCase: true, arrays: true, objects: true },
  },
};

export default microserviceConfig;
