import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import OpenAI from 'openai';
import secrets from './secrets.json' assert { type: 'json' };

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.get('/healthcheck', (req, res) => {
  res.send('Server is running');
});

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: secrets.open_ai,
});

// API endpoint for evaluating code
app.post('/evaluate-code', async (req, res) => {
    const { coding_language, task_description, user_input } = req.body;
  
    if (!coding_language || !task_description || !user_input) {
      return res.status(400).json({
        message: 'coding_language, task_description, and user_input are required.',
      });
    }
  
    try {
      // Create the prompt for OpenAI
      const prompt = `
  Assuming the following task:
  ${task_description}
  
  Rate the following code:
  
  \`\`\`
  ${user_input}
  \`\`\`
  
  Provide the results in the following JSON format:
  
  {
    "comments": 1-100,
    "time_complexity": 1-100,
    "storage_complexity": 1-100,
    "readability": 1-100,
    "overall": 1-100,
    "thoughts": "Your overall thoughts on the code. Write a sentence or two (feel free to write more if needed) for each topic. MAKE SURE THIS IS A STRING"
  }
  
  If the code is not doing the task that is required, deduct 35% points from all the scores, be very harsh if the code is not doing what the tasks asks it to do.
  Make sure to only provide the JSON response without any additional text, make sure the values in the JSON are either integers or strings NOTHING ELSE.
  `;
  
      // Call OpenAI API
      const completion = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0,
        max_tokens: 500,
      });
  
      const responseText = completion.choices[0].message.content.trim();
  
      // Attempt to parse the response as JSON
      let evaluation;
      try {
        evaluation = JSON.parse(responseText);
      } catch (err) {
        // If parsing fails, extract JSON content using regex
        const jsonMatch = responseText.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          evaluation = JSON.parse(jsonMatch[0]);
        } else {
          throw new Error('Failed to extract JSON from OpenAI response.');
        }
      }
  
      res.json(evaluation);
    } catch (error) {
      console.error('Error evaluating code:', error);
      res.status(500).json({ message: 'Error evaluating code', error: error.message });
    }
  });





// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});