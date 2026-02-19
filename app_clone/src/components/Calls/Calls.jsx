import Box from '@mui/material/Box'
import React from 'react'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import LinkIcon from '@mui/icons-material/Link';
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'
import ListItem from '@mui/material/ListItem'
import CallIcon from '@mui/icons-material/Call';
import PhoneCallbackIcon from '@mui/icons-material/PhoneCallback';
import PhoneMissedIcon from '@mui/icons-material/PhoneMissed';
import CallMadeIcon from '@mui/icons-material/CallMade';


function Calls() {
    const CallData = [
        { id: 1, name: "ram", time: "12 mins ago", type: "incoming", status: "missed call" },
        { id: 2, name: "sam", time: "15 mins ago", type: "outgoing", status: "connected" },
        { id: 3, name: "tom", time: "47 mins ago", type: "incoming", status: "connected" },
        { id: 4, name: "mom", time: "58 mins ago", type: "outgoing", status: "missed call" },
        { id: 5, name: "raj", time: "3 hours ago", type: "outgoing", status: "connected" },
        { id: 6, name: "bob", time: "yesterday", type: "incoming", status: "missed call" },
        { id: 7, name: "joe", time: "2 weeks ago", type: "incoming", status: "connected" }
    ]
    return (
        <Box sx={{ width: '100%', bgcolor: 'Background.paper' }}>
            <List>
                <ListItemButton>
                    <ListItemAvatar>
                        <Avatar sx={{ bgcolor: '#128c7e' }}>
                            <LinkIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary="Create a call link"
                        secondary="Share a link for your whattsapp call" />
                </ListItemButton>
                <Box sx={{ p: '2', bgcolor: '#f0f2f5' }}>
                    <Typography variant="subtitle2" color="textSecondary">Recent</Typography>
                </Box>
                {CallData.map((Call) => (
                    <ListItem key={Call.id}
                        secondaryAction={<CallIcon sx={{ color: '#075e54' }} />}>
                        <ListItemAvatar>
                            <Avatar sx={{ bgcolor: '#ccc' }}>
                                {Call.name[0]}
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={Call.name}
                            secondary={
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    {Call.type === "incoming" ?
                                        (Call.status === 'missed call' ? (
                                            <PhoneMissedIcon sx={{ color: 'red', fontSize: '16', mr: '0.5' }} />
                                        ) : (
                                            <PhoneCallbackIcon sx={{ color: 'green', fontSize: '16', mr: '0.5' }} />)
                                        ) : (
                                            <CallMadeIcon sx={{ color: 'green', fontSize: '16', mr: '0.5' }} />)}
                                    <Typography variant="caption" color="initial">
                                        {Call.time}
                                    </Typography>
                                </Box>
                            } />
                    </ListItem>
                ))}
            </List>
        </Box>
    )
}

export default Calls