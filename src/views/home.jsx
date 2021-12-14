import React, { useState, useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Panel from './components/Panel';
import { db } from './firebase';
import { collection, getDocs } from 'firebase/firestore';

function App() {
  const defaultPlayers = new Map();
  for (let i = 0; i < 4; i++) {
    defaultPlayers.set(i, {
      id: i,
      name: `Player ${i}`,
      color: undefined,
    });
  }
  const [colors, setColors] = useState([
    '#DFFF00',
    '#FFBF00',
    '#FF7F50',
    '#DE3163',
  ]);
  const [players, setPlayers] = useState(new Map(defaultPlayers));

  useEffect(() => {
    // Update the document title using the browser API
    (async function () {
      const docRef = collection(db, 'users');
      const collectionSnap = await getDocs(docRef);
      collectionSnap.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, ' => ', doc.data());
      });
    })();
  }, []);

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
      <Container maxWidth='md'>
        <Box component='h1'>Game Lobby</Box>
        <Grid
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
