package service

import (
	"context"
	"fmt"

	pb "github.com/dojineko/grpc-web-poc/grpc/go"
)

type HelloServiceServer struct {
	pb.UnimplementedHelloServiceServer
}

func (*HelloServiceServer) SayHello(ctx context.Context, message *pb.HelloRequest) (*pb.HelloResponse, error) {
	return &pb.HelloResponse{
		Message: fmt.Sprint("Hello,", message.Name),
	}, nil
}
