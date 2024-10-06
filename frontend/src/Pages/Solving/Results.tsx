import { Container, Box, Text, Heading, Spinner, useColorModeValue } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface EvaluationResponse {
  comments: number;
  time_complexity: number;
  storage_complexity: number;
  readability: number;
  overall: number;
  thoughts: string;
}

const Results = () => {
  const location = useLocation();
  const { code, task } = location.state || { code: '', task: '' };
  const [evaluation, setEvaluation] = useState<EvaluationResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const analyzeCode = async () => {
      try {
        const response = await fetch('http://localhost:5000/evaluate-code', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            coding_language: 'javascript', // Change as needed or make dynamic
            task_description: task,
            user_input: code,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch analysis from server');
        }

        const data: EvaluationResponse = await response.json();
        setEvaluation(data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching code evaluation. Please try again.');
        setLoading(false);
      }
    };

    analyzeCode();
  }, [code, task]);

  const bgColor = useColorModeValue('gray.100','gray.700');

  return (
    <>
    {loading ? 
        (<Container>
          <Spinner size="xl" />
          <Text>Analyzing code...</Text>
        </Container>)
      : error ?
        (<Container>
          <Text color="red.500">{error}</Text>
        </Container>)
      : !evaluation ?
        (<Container>
          <Text>No evaluation results available.</Text>
        </Container>)
      :
      (<>
      <Heading as="h2" size="lg" mb={4}>Evaluation Results</Heading>

      {/* Display the code */}
      <Box mb={4}>
        <Heading as="h3" size="md" mb={2}>Submitted Code</Heading>
        <Box whiteSpace="pre-wrap" bg={bgColor} p={4} borderRadius="md" border="1px solid gray">
          {code}
        </Box>
      </Box>

      {/* Display the task */}
      <Box mb={4}>
        <Heading as="h3" size="md" mb={2}>Task Description</Heading>
        <Box whiteSpace="pre-wrap" bg={bgColor} p={4} borderRadius="md" border="1px solid gray">
          {task}
        </Box>
      </Box>

      {/* Display the evaluation results */}
      <Box mb={4}>
        <Heading as="h3" size="md" mb={2}>Ratings</Heading>
        <Text><strong>Comments Rating:</strong> {evaluation.comments}/100</Text>
        <Text><strong>Time Complexity Rating:</strong> {evaluation.time_complexity}/100</Text>
        <Text><strong>Storage Complexity Rating:</strong> {evaluation.storage_complexity}/100</Text>
        <Text><strong>Readability Rating:</strong> {evaluation.readability}/100</Text>
        <Text><strong>Overall Rating:</strong> {evaluation.overall}/100</Text>
      </Box>

      {/* Display the evaluator's thoughts */}
      <Box>
        <Heading as="h3" size="md" mb={2}>SensAI's Thoughts</Heading>
        <Text>{evaluation.thoughts}</Text>
      </Box>
    </>)
  }
  </>
  );
};

export default Results;