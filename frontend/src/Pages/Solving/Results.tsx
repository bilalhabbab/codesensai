import { Container, Box, Text, Heading, Spinner, useColorModeValue } from '@chakra-ui/react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { auth, db } from '../../Utils/firebase';
import { onAuthStateChanged } from 'firebase/auth';

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
  const { code, task, problemNumber  } = location.state || { code: '', task: '', problemNumber: '' };
  const [evaluation, setEvaluation] = useState<EvaluationResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [user_Id, setUser_Id]: any[] = useState(null);  // State to hold the current user's ID

  // Listen for authentication state and set the user ID
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser_Id(user.uid);  // Set the current user's ID
      } else {
        console.error("No user is signed in.");
      }
    });

    return () => unsubscribe();  // Clean up the listener when the component unmounts
  }, []);

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

        // After getting the evaluation, update the user's Firestore document
        await updateUserProblemScore(problemNumber, data.overall);
      } catch (error) {
        setError('Error fetching code evaluation. Please try again.');
        setLoading(false);
      }
    };

    analyzeCode();
  }, [code, task, problemNumber]);

  // Function to update the user's problems in Firestore
  const updateUserProblemScore = async (problemNumber: any, overallScore: any) => {
    if (!problemNumber) return;

    const userId = user_Id; // Replace with the actual user ID, possibly from authentication

    // Get the user's document reference
    const userRef = doc(db, 'users', userId);

    // Get the current data to prevent overwriting existing data
    const userSnapshot = await getDoc(userRef);

    if (userSnapshot.exists()) {
      const userData = userSnapshot.data();

      // Update the problems field by adding the new problem and score
      await updateDoc(userRef, {
        problems: {
          ...userData.problems, // Keep existing problems
          problemNumber: overallScore, // Add or update the current problem's score
        },
      });
    } else {
      console.error("User not found in Firestore.");
    }
  };


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
      {/* Display the evaluation results */}
      {console.log("READ ME", evaluation)}
      <Box mb={4}>
        <Text fontSize='6xl' fontWeight="bold" mb={2}>Ratings</Text>
        <Text mb={2} fontSize="3xl" fontWeight="bold">Overall Rating: {evaluation.overall}/100</Text>
        <Text>Comments Rating: {evaluation.comments || '0'}/100</Text>
        <Text>Time Complexity Rating: {evaluation.time_complexity || '0'}/100</Text>
        <Text>Storage Complexity Rating: {evaluation.storage_complexity || '0'}/100</Text>
        <Text>Readability Rating: {evaluation.readability || '0'}/100</Text>
      </Box>

      {/* Display the evaluator's thoughts */}
      <Box mb={8}>
        <Heading as="h3" size="md" mb={2}>SensAI's Thoughts</Heading>
        <Text>{evaluation.thoughts || 'No thoughts available.'}</Text>
      </Box>

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
    </>)
  }
  </>
  );
};

export default Results;