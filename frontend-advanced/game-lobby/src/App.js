import React, { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Panel from './components/Panel'

function App() {
  const defaultPlayers = new Map();
  for (let i = 0; i < 4; i++) {
    defaultPlayers.set(i, {
      name: `Player ${i}`,
      color: undefined,
    })
  }
  const [colors, setColors] = useState(['#DFFF00', '#FFBF00', '#FF7F50', '#DE3163'])
  const [players, setPlayers] = useState(defaultPlayers);
  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ bgcolor: '#cfe8fc' }}>
        <Box component="h1">Game Lobby</Box>
        <Grid
          container
          rowSpacing={5} columnSpacing={{ xs: 5 }}
          justifyContent="center"
        >
          {Array.from(players.keys()).map(key =>
            <Grid item xs={10} sm={5} >
              <Panel player={players.get(key)} colors={colors} setColors={setColors} setPlayers={setPlayers} players />
            </Grid>
          )}
        </Grid>
      </Container>
    </>
  );
}

export default App;
