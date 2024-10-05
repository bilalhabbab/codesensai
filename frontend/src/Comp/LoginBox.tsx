import React from 'react'
import {
    Box,
    Button,
    Container,
    Divider,
    HStack,
    Stack,
    Text,
    VisuallyHidden,
    useColorModeValue,
  } from '@chakra-ui/react'
import { GoogleIcon } from '../Pages/Login/ProviderIcons'

export const LoginBox = (props: any) => {
    let logGoogleUser = props.logGoogleUser
    return (
          <Container maxW="full" py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }} margin="0px">
            <Stack spacing="8">
              <Box
                py={{ base: '0', sm: '8' }}
                px={{ base: '4', sm: '10' }}
                bg={{ base: 'transparent', sm: 'bg.surface' }}
                boxShadow={{ base: 'none', sm: 'md' }}
                borderRadius={{ base: 'none', sm: 'xl' }}
                bgColor={useColorModeValue('white', 'gray.700')}
              >
                <Stack spacing="6">
                  <Stack spacing="6">
                    <HStack>
                      <Divider />
                      <Text fontSize="5vh" whiteSpace="nowrap" color="black">
                        Log In
                      </Text>
                      <Divider />
                    </HStack>
                    <HStack justifyContent="center">
                      <Text fontSize="3vh" whiteSpace="nowrap" color="red">
                        To enjoy all of our cool features ✌️
                      </Text>
                    </HStack>
                    <HStack />
                    <HStack />
                    <Button
                      key={"Google"} flexGrow={1}
                      backgroundColor="gray.200"
                      onClick={logGoogleUser}
                      minH="8vh"
                      >
                      <VisuallyHidden>
                        Log in with Google
                      </VisuallyHidden>
                        <GoogleIcon boxSize="3.5vh"/>
                    </Button>
                  </Stack>
                </Stack>
              </Box>
            </Stack>
          </Container>
      )}
      