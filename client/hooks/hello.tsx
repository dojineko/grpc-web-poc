import { HelloServiceClient } from '../../grpc/js/HelloServiceClientPb'
import { HelloRequest } from '../../grpc/js/hello_pb';

export const useHello = (host = 'http://localhost:8080') => {
  const sayHello = async (name: string) => {
    const enableDevTools = window.__GRPCWEB_DEVTOOLS__ || (() => {});
    const client = new HelloServiceClient(host)
    enableDevTools([ client ]);
    const req = new HelloRequest()
    req.setName(name)

    const res = await client.sayHello(req, null)
    return res.getMessage()
  }

  return { sayHello }
}
