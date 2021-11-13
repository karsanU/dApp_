import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function panel({ player, colors, setColors, players, setPlayers }) {
    const pickColorHandler = (color) => {
        setPlayers(new Map(players.set(player.id, { ...player, color })))
        setColors([...colors.filter(_color => !(_color === color))])
    }
    // render the individual color selectors 
    const renderColorPicker = (color) => {
        return <Box
            key={player.id + color}
            onClick={() => pickColorHandler(color)}
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
    }
    return (
        <Card sx={{ maxWidth: 400 }}>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div" sx={{ margin: 0 }}>
                    {player.name}
                </Typography>

            </CardContent>
            <CardContent sx={{ minHeight: 250, bgcolor: player.color ? player.color : '#DCDCDC' }}>
            </CardContent>

            <CardActions sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                {player.color ? <span> Your color is: </span> : <span> Choose your color: </span>}
                <Box>{player.color ? renderColorPicker(player.color, true) : colors.map((color) => {
                    return renderColorPicker(color)
                })} </Box>
            </CardActions>
        </Card >
    )
}

export default panel
