import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import OpenAI from 'openai';
import rateLimit from 'express-rate-limit';
import { verifyFirebaseToken } from './firebase.js';

// Load environment variables
dotenv.config();

const app = express();

// Middleware
// const corsOptions = {
//   origin: 'https://codesensai.study/',  // Replace with your actual React app URL
//   optionsSuccessStatus: 200 // Some legacy browsers choke on 204
// };
app.use(cors());
app.use(express.json());

// Rate limiting middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 100 requests per windowMs
  message: { message: 'Too many requests from this IP, please try again later.' }
});

app.get('/healthcheck', (req, res) => {
  res.send('Server is running');
});

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_KEY,
});

// API endpoint for evaluating code
app.post('/evaluate-code', limiter, verifyFirebaseToken, async (req, res) => {
  const { coding_language, task_description, user_input } = req.body;

  if (!coding_language || !task_description || !user_input) {
    return res.status(400).json({
      message: 'coding_language, task_description, and user_input are required.',
    });
  }

  try {
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
    If the code is attempting to do the task and there is a small bug, don't be too harsh but dock some marks and put the problem and the solution in the comments.
    Make sure to only provide the JSON response without any additional text, make sure the values in the JSON are either integers or strings NOTHING ELSE.
    `;

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0,
      max_tokens: 500,
    });

    const responseText = completion.choices[0].message.content.trim();

    let evaluation;
    try {
      evaluation = JSON.parse(responseText);
    } catch (err) {
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
// Start the server and bind to 0.0.0.0 to allow external connections
const PORT = 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
