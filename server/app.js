const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { execFile } = require('child_process');
const path = require('path');

const app = express();
const port = 3000;

// Enable CORS
app.use(cors());
app.use(bodyParser.json());

// Define the endpoint
app.post('/api/sum', (req, res) => {
    const { num1, num2 } = req.body;

    // Path to the Python script
    const scriptPath = path.join(__dirname, 'python_module.py'); 

    // Execute the Python script with arguments
    execFile('python', [scriptPath, num1, num2], (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing Python script: ${stderr}`);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        // Send the result back to the client
        res.json({ sum: parseInt(stdout.trim()) });
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
