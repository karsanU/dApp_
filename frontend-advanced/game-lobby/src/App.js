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
      id: i,
      name: `Player ${i}`,
      color: undefined,
    })
  }
  const [colors, setColors] = useState(['#DFFF00', '#FFBF00', '#FF7F50', '#DE3163'])
  const [players, setPlayers] = useState(new Map(defaultPlayers));

  function renderPlayers() {
    const result = []
    for (const [id, player] of players) {

      result.push(<Grid item xs={10} sm={5} >
        <Panel sx={{ display: 'flex', justifyContent: 'center'  }} key={id} player={{ ...player }} colors={colors} setColors={setColors} setPlayers={setPlayers} players={players} />
      </Grid >)
  }
  return result;
}

return (
  <>
    <CssBaseline />
    <Container maxWidth="lg">
      <Box component="h1">Game Lobby</Box>
      <Grid
        container
        rowSpacing={5} columnSpacing={{ xs: 5 }}
        justifyContent="center"
      >
        {renderPlayers()}
      </Grid>
    </Container>
  </>
);
}

export default App;
