import grpc
from concurrent import futures
import sum_pb2 
import sum_pb2_grpc

class SumService(sum_pb2_grpc.SumServiceServicer):
    def AddNumbers(self, request, context):
        num1 = request.num1
        num2 = request.num2
        result = num1 + num2
        return sum_pb2.SumResponse(sum=result)

def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    sum_pb2_grpc.add_SumServiceServicer_to_server(SumService(), server)
    server.add_insecure_port('[::]:50051')
    server.start()
    print('Python gRPC server is running on port 50051...')
    server.wait_for_termination()

if __name__ == '__main__':
    serve()
