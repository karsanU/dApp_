import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleOnChange(e, set) {
    set(e.target.value);
  }

  return (
    <Container maxWidth='md' sx={{ display: 'flex' }}>
      <Box
        component='form'
        sx={{
          '& .MuiTextField-root': {
            mx: 'auto',
            mb: 2,
            width: 250,
          },
          width: 350,
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'white',
          mx: 'auto',
          my: 'auto',
        }}
        noValidate
        autoComplete='off'>
        <Box component='h1' sx={{ color: 'black' }}>
          Sign in
        </Box>
        <TextField
          label='Email'
          id='filled-size-normal'
          defaultValue=''
          value={email}
          onChange={(e) => {
            handleOnChange(e, setEmail);
          }}
        />
        <TextField
          label='Password'
          id='filled-size-normal'
          type='password'
          defaultValue=''
          value={password}
          onChange={(e) => {
            handleOnChange(e, setPassword);
          }}
        />
        <Button variant='outlined' sx={{ width: 250, height: 50, mx: 'auto' }}>
          Sign in
        </Button>
        <Link sx={{ mx: 'auto', my: 2 }} href='#' underline='hover'>
          {'Sing up'}
        </Link>
      </Box>
    </Container>
  );
}

export default SignIn;
