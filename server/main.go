package main

import (
	"fmt"
	"log"
	"net"

	pb "github.com/dojineko/grpc-web-poc/grpc/go"
	"github.com/dojineko/grpc-web-poc/server/service"
	"google.golang.org/grpc"
	"google.golang.org/grpc/reflection"
)

func main() {
	port := 50051
	listenPort, err := net.Listen("tcp", fmt.Sprintf(":%d", port))
	if err != nil {
		log.Fatalln(err)
	}
	server := grpc.NewServer()
	// enable reflection
	reflection.Register(server)
	pb.RegisterHelloServiceServer(server, &service.HelloServiceServer{})
	pb.RegisterUploadServiceServer(server, &service.UploadServiceServer{})
	fmt.Printf("🐈 gRPC Server is ready! (Port: %d)\n", port)
	server.Serve(listenPort)
}
