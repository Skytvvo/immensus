import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { join } from 'path';

const microserviceConfig = (host: string, port: number| string, service: string): MicroserviceOptions => ({
  transport: Transport.GRPC,
  options: {
    package: service,
    protoPath: join(__dirname, `../../../apps/${service}-service/${service}.proto`),
    url: `${host}:${port}`,
    loader: { keepCase: true, arrays: true, objects: true },
  },
});

export default microserviceConfig;
