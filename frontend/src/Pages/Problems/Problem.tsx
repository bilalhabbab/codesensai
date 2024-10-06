import { Flex, Text, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface ProblemProps {
  number: number;
  name: string;
  difficulty: string;
  type: string;
  isAttempted: boolean;
  task: string;
}

const Problem = ({ number, name, difficulty, type, isAttempted, task }: ProblemProps) => {
  let navigate = useNavigate();

  function navigateProblem() {
    // Pass the problem's task to the Solving page via state
    navigate('/solving', { state: { task, name, difficulty, type, number } });
  }

  const color1 = useColorModeValue('gray.300', 'gray.600');
  const color2 = useColorModeValue('gray.100', 'gray.500');

  return (
    <Flex flexDir="row" justifyContent='space-between' w="100%" bg={(number % 2 === 1) ? color1 : color2} p={3}>
      <Text fontSize="xl" w={'25%'} textAlign="center" onClick={navigateProblem} _hover={{ color: '#0048ff', cursor: 'pointer' }}>
        {number}. {name}
      </Text>
      <Text fontSize="xl" w={'25%'} textAlign="center" color={difficulty === 'Hard' ? "red.500" : difficulty === 'Medium' ? 'yellow.500' : 'green.500'}>
        {difficulty}
      </Text>
      <Text fontSize="xl" w={'25%'} textAlign="center">
        {isAttempted ? 'Attempted' : 'New'}
      </Text>
      <Text fontSize="xl" w={'25%'} textAlign="center">{type}</Text>
    </Flex>
  );
};

export default Problem;