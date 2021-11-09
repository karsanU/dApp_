import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function panel({ player, colors, setColors, setPlayers }) {
    const pickColorHandler = (color) => {

    }
    return (
        <Card sx={{ maxWidth: 400 }}>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {player.name}
                </Typography>

            </CardContent>
            <CardContent sx={{ minHeight: 250, bgcolor: player.color }}>
            </CardContent>

            <CardActions>
                {colors.map(color => {
                    return <Box onClick={pickColorHandler(color)}
                        component="button"
                        sx={{
                            padding: 2,
                            bgcolor: color,
                            borderRadius: '50%',
                            border: 'none',
                            '&:hover': {
                                opacity: [0.5],
                                cursor: 'pointer',
                            },
                        }}>
                    </Box>
                })}
            </CardActions>
        </Card>
    )
}

export default panel
