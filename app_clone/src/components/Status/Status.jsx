import React from 'react'
import { useState } from 'react'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'
const StatusData = [
    { id: 1, name: 'Ram', time: '3 mins ago', image: '' },
    { id: 2, name: 'Sam', time: '6 mins ago', image: '' },
    { id: 3, name: 'Tom', time: '8 mins ago', image: '' },
    { id: 4, name: 'raj', time: '5 mins ago', image: '' },
    { id: 5, name: 'mom', time: '6 hours ago', image: '' },
    { id: 6, name: 'dad', time: '7 hours ago', image: '' },
    { id: 7, name: 'bro', time: '11 hours ago', image: '' },

]
function Status() {

    const [myStatuses, setMyStatuses] = useState([]);
    const now = new Date(); 
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });

    const handleStatusUpload = (e) => {
        const file = e.target.files[0]
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const newStatus = {
                    id: Date.now,
                    image: reader.result,
                    time: timeString
                };
                setMyStatuses([newStatus, ...myStatuses])
            };
            reader.readAsDataURL(file);
        }
    };
    return (
        <Box sx={{ width: '100%', bgcolor: 'background.paper' }} >
            <Box sx={{ p: '2', bgcolor: '#f0f2f5' }} >

                <Typography>
                    My Status
                </Typography>
            </Box>
            <List>
                <input
                    accept="image/*"
                    id="status-upload"
                    type="file"
                    style={{ display: 'none' }}
                    onChange={handleStatusUpload}
                />
                <label htmlFor="status-upload">
                    <ListItemButton>
                        <ListItemAvatar>
                            <Box sx={{ position: 'relative' }}>


                                <Avatar sx={{ width: '50', height: '50' }}>
                                    {myStatuses.length > 0 ? (
                                        <img src={myStatuses[0].image} style={{ width: '100%', borderRadius: '50%' }} />
                                    ) : "M"}
                                </Avatar>
                                <AddCircleIcon
                                    sx={{
                                        bottom: '0', right: '0', bgcolor: 'white',
                                        position: 'absolute', borderRadius: '50%', fontSize: '20', color: '#25D366'
                                    }}
                                />

                            </Box>
                        </ListItemAvatar>
                        <ListItemText primary="My status"
                            secondary={myStatuses.length > 0 ? myStatuses[0].time : "Tap to add status update"} />
                    </ListItemButton>
                </label>
            </List>
            <Box sx={{ p: '2', bgcolor: '#f0f2f5' }} >
                <Typography>
                    Recent updates
                </Typography>
            </Box>

            {StatusData.map((status) => (
                <React.Fragment>
                    <ListItemButton key={status.id}>
                        <ListItemAvatar>
                            <Avatar sx={{
                                width: '50', height: '50', border: '2px solid #25D366',
                                p: '2px', bgcolor: 'transparent'
                            }}>
                                <Avatar sx={{ width: '100%', height: '100%' }}>
                                    {status.name[0]}
                                </Avatar>

                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={status.name} secondary={status.time} />
                    </ListItemButton>
                </React.Fragment>
            ))}
        </Box>
    )
}

export default Status