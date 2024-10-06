import React, { useState, useEffect, useContext } from 'react';
import { Box, Text, Avatar, Stack, Heading, Spinner, Center, Container, HStack, Divider } from '@chakra-ui/react';
import { useColorModeValue } from '@chakra-ui/react';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../Utils/firebase'; // Assuming firebase.tsx is in the same directory
import { UserContext } from '../../Utils/UserContext';
import { onAuthStateChanged } from 'firebase/auth';

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // User is authenticated
        setAuthenticated(true);

        try {
          const userRef = doc(db, "users", user.uid);
          const userDoc = await getDoc(userRef);

          if (userDoc.exists()) {
            setProfileData(userDoc.data());
          } else {
            setError("No profile found for the current user.");
          }
        } catch (err) {
          setError("Error fetching profile data.");
        } finally {
          setLoading(false);
        }
      } else {
        // User is not authenticated
        setAuthenticated(false);
        setLoading(false);
        setError("User not authenticated");
      }
    });
    // Cleanup the listener on unmount
    return () => unsubscribe();
  }, []);
  const color = useColorModeValue('white', 'gray.900');
  const color1 = useColorModeValue('gray.300', 'gray.600');
  const color2 = useColorModeValue('gray.100', 'gray.500');
  let total = 0
  let count = 0
  const problems = Object.keys(profileData?.problems).map((problem, index) => {
    total += profileData.problems[problem]
    count += 1
    return (
      <Box key={problem} bgColor={index % 2 === 1 ? color1 : color2} p={3}>
        <Text fontSize='xl'>Problem {problem}: {profileData.problems[problem]}%</Text>
      </Box>
    );
  })
  const average = total/count
  return (
    <>
    {loading ? 
      <Center height="100vh">
          <Spinner size="xl" />
      </Center>
    
    : error?
      <Center height="100vh">
        <Text color="red.500" fontSize="xl">{error}</Text>
      </Center>
    
    : 
    <HStack py={6}>
      <Box
        maxW={'320px'}
        w={'full'}
        bg={color}
        boxShadow={'2xl'}
        rounded={'lg'}
        p={6}
        textAlign={'center'}>
        <Avatar
          size={'xl'}
          src={profileData?.photoURL}
          mb={4}
          pos={'relative'}
        />
        <Heading fontSize={'2xl'} fontFamily={'body'}>
          {profileData?.displayName}
        </Heading>
        <Text fontWeight={600} color={'gray.500'} mb={4}>
          {profileData?.email}
        </Text>
        <Stack align={'center'} justify={'center'} direction={'row'} mt={6}>
          <Text>
            Joined on: {profileData?.createdAt?.toDate().toLocaleDateString()}
          </Text>
        </Stack>
        <Box p={6}>
          <Text fontSize={'2xl'} fontWeight='bold' mb={2}>Average Score</Text>
          <Text fontSize={'xl'}>{average.toFixed(2)}%</Text>
        </Box>
      </Box>
      <Box 
        w='30vw'
        ml={10}
        >
        <Stack px={0} py={6}>
          <Text fontSize={'5xl'} fontWeight='bold' mb={2}>Problems Solved</Text>
          {problems}
        </Stack>
      </Box>
    </HStack>}
    </>
  );
};

export default Profile;
