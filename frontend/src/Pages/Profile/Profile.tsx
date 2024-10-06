import React, { useState, useEffect, useContext } from 'react';
import { Box, Text, Avatar, Stack, Heading, Spinner, Center } from '@chakra-ui/react';
import { useColorModeValue } from '@chakra-ui/react';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../Utils/firebase'; // Assuming firebase.tsx is in the same directory
import { UserContext } from '../../Utils/UserContext';
import { onAuthStateChanged } from 'firebase/auth';

const Profile = () => {
  const [profileData, setProfileData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
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
    <Center py={6}>
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
      </Box>
    </Center>}
    </>
  );
};

export default Profile;
