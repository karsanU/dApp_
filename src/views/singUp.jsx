import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { getTableSortLabelUtilityClass } from '@mui/material';

function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [singUpErr, setSingUpErr] = useState('');

  function handleOnChange(e, set) {
    set(e.target.value);
  }

  function handleSingUp() {
    (async function () {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;
        console.log(user);
      } catch (err) {
        setSingUpErr(err.toString());
      }
    })();
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
          width: 400,
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'white',
          mx: 'auto',
          my: 'auto',
        }}
        noValidate
        autoComplete='off'>
        <Box component='h1' sx={{ color: 'black' }}>
          Sign up
        </Box>
        <TextField
          size=''
          label='Name'
          id='filled-size-normal'
          value={name}
          onChange={(e) => {
            handleOnChange(e, setName);
          }}
        />
        <TextField
          label='Email'
          id='filled-size-normal'
          value={email}
          onChange={(e) => {
            handleOnChange(e, setEmail);
          }}
        />
        <TextField
          label='Password'
          type='password'
          id='filled-size-normal'
          value={password}
          onChange={(e) => {
            handleOnChange(e, setPassword);
          }}
        />
        {singUpErr && (
          <Box
            sx={{ m: 0, mx: 'auto', mb: 2, width: 250, color: 'red' }}
            component='p'>
            {singUpErr}
          </Box>
        )}
        <Button
          variant='outlined'
          sx={{ width: 250, height: 50, mx: 'auto' }}
          onClick={() => handleSingUp()}>
          Sign up
        </Button>
        <Link sx={{ mx: 'auto', my: 2 }} href='#' underline='hover'>
          {'Sing in'}
        </Link>
      </Box>
    </Container>
  );
}

export default SignUp;
