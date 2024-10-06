import { Box, HStack, Select, Text, useColorModeValue, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import Problem from './Problem';
import { collection, getDocs } from 'firebase/firestore';
import { db, auth } from '../../Utils/firebase'; // Make sure to import your firebase config
import { doc, getDoc } from 'firebase/firestore';

interface Problem {
  number: number;
  name: string;
  difficulty: string;
  type: string;
  task: string;
}

const Problems = () => {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [userProblems, setUserProblems] = useState<{ [key: string]: number }>({});
  const [filteredProblems, setFilteredProblems] = useState<Problem[]>([]);

  // State for the select pickers
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedType, setSelectedType] = useState('');

  // Fetch problems from the Firestore "problems" collection
  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "problems"));
        const fetchedProblems: Problem[] = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          number: doc.data().number,
          name: doc.data().name,
          difficulty: doc.data().difficulty,
          type: doc.data().type,
          task: doc.data().task,
        }));
        setProblems(fetchedProblems);
        setFilteredProblems(fetchedProblems); // Initially set filtered problems to all problems
      } catch (err) {
        console.error("Error fetching problems: ", err);
      }
    };

    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        const userRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUserProblems(userData?.problems || {});
        }
      }
    };

    fetchProblems();
    fetchUserData();
  }, []);

  // Filter logic based on the selected difficulty, status, and type
  useEffect(() => {
    const filtered = problems.filter((problem) => {
      const matchesDifficulty =
        selectedDifficulty === '' || problem.difficulty === selectedDifficulty;
      const matchesType = selectedType === '' || problem.type === selectedType;

      // Status filter logic
      let matchesStatus = true;
      if (selectedStatus === 'attempted') {
        matchesStatus = userProblems.hasOwnProperty(problem.number);
      } else if (selectedStatus === 'new') {
        matchesStatus = !userProblems.hasOwnProperty(problem.number);
      } else if (selectedStatus === 'solved') {
        matchesStatus = userProblems[problem.number] >= 90;
      }

      return matchesDifficulty && matchesType && matchesStatus;
    });

    setFilteredProblems(filtered);
  }, [selectedDifficulty, selectedStatus, selectedType, problems, userProblems]);

  filteredProblems.sort((a, b) => a.number - b.number);
  const problem_jsx = filteredProblems.map((problem) => {
    const isAttempted = userProblems.hasOwnProperty(problem.number);
    return (
      <Problem
        key={problem.number}
        number={problem.number}
        name={problem.name}
        difficulty={problem.difficulty}
        type={problem.type}
        isAttempted={isAttempted}
        task={problem.task}
      />
    );
  });

  return (
    <>
      <Text fontSize="6xl">Problems</Text>
      <Box w='330px' h='3px' bgColor={useColorModeValue('black', 'gray.400')} boxShadow='2px 2px 5px gray' />

      <HStack mt={5} px={5} spacing={10}>
        {/* Difficulty Filter */}
        <Select placeholder='Difficulty' value={selectedDifficulty} onChange={(e) => setSelectedDifficulty(e.target.value)}>
          <option value='Easy'>Easy</option>
          <option value='Medium'>Medium</option>
          <option value='Hard'>Hard</option>
        </Select>

        {/* Status Filter */}
        <Select placeholder='Status' value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
          <option value='new'>New</option>
          <option value='attempted'>Attempted</option>
          <option value='solved'>Solved</option>
        </Select>

        {/* Type Filter */}
        <Select placeholder='Question Type' value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
          <option value='Array'>Array</option>
          <option value='String'>String</option>
          <option value='Hashmap'>Hashmap</option>
        </Select>
      </HStack>

      <VStack mt={5} spacing={0}>
        <HStack w="100%" justifyContent='space-between' px={6} mb={3}>
          <Text fontSize="2xl" w={'25%'} textAlign="center">Problem</Text>
          <Text fontSize="2xl" w={'25%'} textAlign="center">Difficulty</Text>
          <Text fontSize="2xl" w={'25%'} textAlign="center">Status</Text>
          <Text fontSize="2xl" w={'25%'} textAlign="center">Type</Text>
        </HStack>
        {problem_jsx}
      </VStack>
    </>
  );
};

export default Problems;