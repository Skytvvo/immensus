import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { join } from 'path';

const PORT = process.env.PORT_IAM_SERVICE || 4400;
const HOST = process.env.HOST_IAM_SERVICE || 'localhost';

const iamConfig: MicroserviceOptions ={
  transport: Transport.GRPC,
  options: {
    package: 'iam',
    protoPath: join(__dirname, '../../../apps/iam-service/iam.proto'),
    url: `${HOST}:${PORT}`,
    loader: { keepCase: true, arrays: true, objects: true },
  },
};

export default iamConfig;
