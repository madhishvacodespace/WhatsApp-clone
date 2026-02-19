import List from '@mui/material/List';

import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography'
import { chatData } from '../ChatData';


function ChatBox({onSelect, searchTerm=""}) {
    const filteredChats = chatData.filter((chat) =>
    chat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
return(
    <>
        <List sx={{ width: '100%', p: 0 }}>
      {filteredChats.map((chat) => (
        <React.Fragment key={chat.id}>
          <ListItemButton onClick={() => onSelect(chat)}>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: '#1a8d80ff' }}>{chat.name[0]}</Avatar>
            </ListItemAvatar>
            <ListItemText primary={chat.name} secondary={chat.msg} />
            <Typography variant="caption" sx={{ color: 'gray' }}>{chat.time}</Typography>
          </ListItemButton>
          <Divider variant="inset" component="li" />
        </React.Fragment>
      ))}
      
      {filteredChats.length === 0 && (
        <Typography sx={{ textAlign: 'center', mt: 5, color: 'gray' }}>
          No chats found
        </Typography>
      )}
    </List>
  
    </>

   
)
}
export default ChatBox