const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { python } = require('pythonia'); // Import Pythonia
const path = require('path');

const app = express();
const port = 3000;

// Enable CORS
app.use(cors());
app.use(bodyParser.json());

// Define the endpoint
app.post('/api/sum', async (req, res) => {
    const { num1, num2 } = req.body;

    try {
        // Import the Python module using Pythonia
        const math = python(path.join(__dirname, 'python_module.py')); // Path to your Python module

        // Call the Python function and wait for the result
        const result = await math.add_numbers(num1, num2);

        // Send the result back to the client
        res.json({ sum: result });
    } catch (err) {
        console.error('Error executing Python function:', err);
        res.status(500).json({ error: 'Error processing data' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
