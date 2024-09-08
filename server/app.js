const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { PythonShell } = require('python-shell');
const path = require('path');

const app = express();
const port = 3000;

// Enable CORS
app.use(cors());
app.use(bodyParser.json());

// Define the endpoint
app.post('/api/sum', (req, res) => {
    const { num1, num2 } = req.body;

    // PythonShell options to run Python code dynamically
    let options = {
        mode: 'text',
        pythonOptions: ['-c'], // Run Python code in a shell
        scriptPath: path.join(__dirname, ''), // Path to the Python module
        args: [num1, num2] // Arguments passed to the Python function
    };

    // Create PythonShell instance and run Python code
    PythonShell.runString(`
        from sum_module import add_numbers
        import sys
        result = add_numbers(int(sys.argv[1]), int(sys.argv[2]))
        print(result)
    `, options, (err, results) => {
        if (err) {
            console.error('Error executing Python function:', err);
            res.status(500).json({ error: 'Error processing data' });
            return;
        }

        // Send the result back to the client
        res.json({ sum: parseInt(results[0].trim()) });
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
