import { UploadServiceClient } from '../../grpc/js/UploadServiceClientPb'
import { UploadRequest } from '../../grpc/js/upload_pb';

export const useUpload = (host = 'http://localhost:8080') => {
  const upload = async (name: string, size: number, data: string) => {
    const enableDevTools = window.__GRPCWEB_DEVTOOLS__ || (() => {});
    const client = new UploadServiceClient(host)
    enableDevTools([ client ]);
    const req = new UploadRequest()
    req.setName(name)
    req.setSize(size)
    req.setData(data)
    const res = await client.upload(req, null)
    return {
      name: res.getName(),
      size: res.getSize(),
    }
  }

  return { upload }
}
