/**
 * @fileoverview gRPC-Web generated client stub for app
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck


import * as grpcWeb from 'grpc-web';

import * as upload_pb from './upload_pb';


export class UploadServiceClient {
  client_: grpcWeb.AbstractClientBase;
  hostname_: string;
  credentials_: null | { [index: string]: string; };
  options_: null | { [index: string]: any; };

  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; }) {
    if (!options) options = {};
    if (!credentials) credentials = {};
    options['format'] = 'text';

    this.client_ = new grpcWeb.GrpcWebClientBase(options);
    this.hostname_ = hostname;
    this.credentials_ = credentials;
    this.options_ = options;
  }

  methodInfoUpload = new grpcWeb.MethodDescriptor(
    '/app.UploadService/Upload',
    grpcWeb.MethodType.UNARY,
    upload_pb.UploadRequest,
    upload_pb.UploadResponse,
    (request: upload_pb.UploadRequest) => {
      return request.serializeBinary();
    },
    upload_pb.UploadResponse.deserializeBinary
  );

  upload(
    request: upload_pb.UploadRequest,
    metadata: grpcWeb.Metadata | null): Promise<upload_pb.UploadResponse>;

  upload(
    request: upload_pb.UploadRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: upload_pb.UploadResponse) => void): grpcWeb.ClientReadableStream<upload_pb.UploadResponse>;

  upload(
    request: upload_pb.UploadRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: upload_pb.UploadResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/app.UploadService/Upload',
        request,
        metadata || {},
        this.methodInfoUpload,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/app.UploadService/Upload',
    request,
    metadata || {},
    this.methodInfoUpload);
  }

}

