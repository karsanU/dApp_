import React, { useState, useEffect, useContext } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Panel from '../components/Panel';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { UserContext } from '../contexts';

import { useNavigate } from 'react-router-dom';

function App() {
  const defaultPlayers = new Map();
  for (let i = 0; i < 4; i++) {
    defaultPlayers.set(i, {
      id: i,
      name: `Player ${i}`,
      color: undefined,
    });
  }
  const [players, setPlayers] = useState(new Map(defaultPlayers));
  const { user, setUser } = useContext(UserContext);

  let navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate('/signin');
    }
  });
  useEffect(() => {
    if (user) {
      (async function () {
        const functions = getFunctions();
        const randomNumber = httpsCallable(functions, 'randomNumber');
        randomNumber({ text: 'yolo' }).then((result) => {
          // Read result of the Cloud Function.
          /** @type {any} */
          const data = result.data;
          console.log(data);
        });

        // const docRef = doc(db, 'users', user.uid);
        // const docSnap = await getDoc(docRef);
        // if (docSnap.exists()) {
        //   console.log('Document data:', docSnap.data());
        // } else {
        //   // doc.data() will be undefined in this case
        //   console.log('No such document!');
        // }
      })();
    }
  }, [user]);

  const [colors, setColors] = useState([
    '#DFFF00',
    '#FFBF00',
    '#FF7F50',
    '#DE3163',
  ]);

  function handleLogOut() {
    (async function () {
      try {
        await signOut(auth);
      } catch (err) {
        console.log(err);
      }
      setUser(null);
    })();
  }

  function renderPlayers() {
    const result = [];
    for (const [id, player] of players) {
      result.push(
        <Grid key={id} item xs={10} sm={5}>
          <Panel
            key={id}
            sx={{ display: 'flex', justifyContent: 'center' }}
            player={{ ...player }}
            colors={colors}
            setColors={setColors}
            setPlayers={setPlayers}
            players={players}
          />
        </Grid>
      );
    }
    return result;
  }

  return (
    <>
      <CssBaseline />
      <AppBar style={{ background: 'rgba(0, 0, 0, 0.87)' }}>
        <Toolbar color='white'>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='menu'
            sx={{ mr: 2 }}></IconButton>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            Game Lobby
          </Typography>
          <Button color='inherit' onClick={() => handleLogOut()}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth='md'>
        <Grid
          sx={{ mt: 8 }}
          container
          rowSpacing={5}
          columnSpacing={{ xs: 5 }}
          justifyContent='center'>
          {renderPlayers()}
        </Grid>
      </Container>
    </>
  );
}

export default App;
