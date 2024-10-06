import { Container } from '@chakra-ui/react';
import React from 'react';
import { useLocation } from 'react-router-dom';

const Results = () => {
  const location = useLocation();
  const { code } = location.state || { code: '' };

  return (
    <Container whiteSpace="pre-wrap">{code}</Container>
  );
};

export default Results;