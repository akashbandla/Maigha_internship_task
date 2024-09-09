const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const PROTO_PATH = path.join(__dirname, 'sum.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
});
const sumProto = grpc.loadPackageDefinition(packageDefinition).SumService;

const client = new sumProto('localhost:50051', grpc.credentials.createInsecure());

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/api/sum', (req, res) => {
    const { num1, num2 } = req.body;

    client.AddNumbers({ num1, num2 }, (error, response) => {
        if (!error) {
            res.json({ sum: response.sum });
        } else {
            res.status(500).json({ error: 'Failed to communicate with gRPC server' });
        }
    });
});

const port = 3000;
app.listen(port, () => {
    console.log(`Node.js server is running on http://localhost:${port}`);
});
