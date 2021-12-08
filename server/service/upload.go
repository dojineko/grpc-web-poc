package service

import (
	"context"
	"encoding/base64"
	"os"
	"path"
	"path/filepath"

	pb "github.com/dojineko/grpc-web-poc/grpc/go"
)

type UploadServiceServer struct {
	pb.UnimplementedUploadServiceServer
}

func (*UploadServiceServer) Upload(ctx context.Context, message *pb.UploadRequest) (*pb.UploadResponse, error) {
	uploadDir := "tmp/upload"
	if f, err := os.Stat(uploadDir); os.IsNotExist(err) || !f.IsDir() {
		os.Mkdir(uploadDir, 0777)
	}

	buff, _ := base64.StdEncoding.DecodeString(message.Data)
	filename := filepath.Base(message.Name)
	filepath := path.Join(uploadDir, filename)
	file, _ := os.Create(filepath)
	defer file.Close()
	file.Chmod(0555)
	file.Write(buff)
	filestat, _ := os.Stat(filepath)

	return &pb.UploadResponse{
		Name: filename,
		Size: filestat.Size(),
	}, nil
}
