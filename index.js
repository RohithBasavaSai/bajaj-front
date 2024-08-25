const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Helper function to find the highest lowercase alphabet
function findHighestLowercase(alphabets) {
  const lowercases = alphabets.filter(char => char.toLowerCase() === char);
  return lowercases.length > 0 ? [lowercases[lowercases.length - 1]] : [];
}

app.all('/bfhl', (req, res) => {
  if (req.method === 'GET') {
    res.status(200).json({ operation_code: 1 });
  } else if (req.method === 'POST') {
    try {
      const data = req.body.data;
      if (!Array.isArray(data)) {
        throw new Error('Invalid data format. Must be an array.');
      }

      const userId = 'john_doe_17091999'; // Replace with actual user ID generation logic
      const email = 'john@xyz.com'; // Replace with actual email fetching logic
      const rollNumber = 'ABCD123'; // Replace with actual roll number fetching logic

      const numbers = data.filter(item => !isNaN(item));
      const alphabets = data.filter(item => typeof item === 'string');
      const highestLowercase = findHighestLowercase(alphabets);

      res.status(200).json({
        is_success: true,
        user_id: userId,
        email,
        roll_number: rollNumber,
        numbers,
        alphabets,
        highest_lowercase_alphabet: highestLowercase,
      });
    } catch (error) {
      console.error(error);
      res.status(400).json({ is_success: false, error: error.message });
    }
  } else {
    res.status(405).send('Method not allowed');
  }
});

app.listen(port, () => console.log(`Server listening on port ${port}`));