import Box from '@mui/material/Box';
import React, { useState, useEffect, useRef } from 'react';
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import SendSharpIcon from '@mui/icons-material/SendSharp';
import ListItemButton from '@mui/material/ListItemButton';
import Stack from '@mui/material/Stack';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

function Chatpage({ chat, onBack }) {
    
    // for messages
    const [inputText, setInputText] = useState("");
    const [Messages, setMessages] = useState([
        { id: 1, text: chat.msg, sender: 'them' }
    ]);
    // for send button
    const handlesend = () => {
        if (inputText.trim() !== "") {

            const now = new Date();         //to set time for the message
            const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });

            const newMessage = {
                id: Date.now(),
                text: inputText,
                time: timeString,
                sender: 'me'
            };
            setMessages([...Messages, newMessage]);
            setInputText("");
        }
    }
    //for scrolling
    const messageEndRef = useRef(null);
    const scrollToBottom = () => {
        messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }

    useEffect(() => {
        scrollToBottom();
    }, [Messages])
    // for deleting the the messages in the long  press with the option tab as delete and close
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedMsgId, setSelectedMsgId] = useState(null);

    const handleLongPress = (event, id) => {
        event.preventDefault();
        setAnchorEl(event.currentTarget);
        setSelectedMsgId(id)
    }

    const handleclose = () => {
        setAnchorEl(null);
        setSelectedMsgId(null);
    }

    const handleDelete = () => {
        const updateMessages = Messages.filter(msg => msg.id !== selectedMsgId);
        setMessages(updateMessages)
        handleclose();
    }
    // for uploading the image
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const now = new Date();
                const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
                const newImg = {
                    id: Date.now(),
                    text: "",
                    image: reader.result,
                    sender: 'me',
                    time: timeString,
                    type: 'image'

                }
                setMessages([...Messages, newImg]);
            };
            reader.readAsDataURL(file);
        }
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
            <AppBar position="fixed" color="primary" sx={{ bgcolor: '#0b8f80ff', left: '0', right: '0' }}>
                <ListItemButton>
                    <IconButton sx={{ color: 'white' }} onClick={onBack}>
                        <ArrowBackIcon />
                    </IconButton>
                    <Avatar>
                        {chat.name[0]}
                    </Avatar>
                    <Toolbar>
                        <Typography variant="h6" >
                            {chat.name}
                        </Typography>
                    </Toolbar>
                </ListItemButton>
            </AppBar>

            <Box sx={{
                flexGrow: '1', overflowY: 'auto', p: '2',
                display: 'flex', flexDirection: 'column', gap: '5',
                position: 'relative', height: 'calc(100vh - 124px)'
            }}>
                <Stack direction="column" spacing={2}>
                    {Messages.map((m) => (
                        <Paper
                            key={m.id}
                            onContextMenu={(e) => handleLongPress(e, m.id)}
                            sx={{
                                alignSelf: m.sender === 'me' ? 'flex-end' : 'flex-start',
                                bgcolor: m.sender === 'me' ? '#b33c3cff' : '#33bddfff', borderRadius: '5px',
                                p: m.type === 'image' ? 0.5 : 1.5, maxWidth: '75%', position: 'relative',
                                boxShadow: '1', mb: '1.5', wordBreak: 'break-word', minWidth: '80px', flexDirection: 'column',
                                whiteSpace: 'pre-wrap', overflowWrap: 'anywhere', cursor: 'pointer'
                            }}> {m.type === 'image' ? (
                                <img
                                    src={m.image}
                                    alt="sent"
                                    style={{ width: '100%', borderRadius: '8px', display: 'block' }} />
                            ) : (<Typography variant="body1" >
                                {m.text}
                            </Typography>)}
                            <Box sx={{
                                alignSelf: 'flex-end',
                                mt: m.type === 'image' ? 0.5 : 0,
                                display: 'flex',
                                alignItems: 'right'
                            }}>
                                <Typography variant="caption" sx={{ color: 'gray', fontSize: '10px' }}>
                                    {m.time || "12:00 PM"}
                                </Typography>
                                {m.sender === 'me' && (
                                    <Box sx={{ display: 'flex' }}>
                                        <span style={{ fontSize: '12px', color: '#34b7f1' }}>✔✔</span>
                                    </Box>
                                )}
                            </Box>

                        </Paper>
                    ))}
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleclose}>
                        <MenuItem onClick={handleDelete}><DeleteIcon /> Delete</MenuItem>
                        <MenuItem onClick={handleclose}><CloseIcon />close</MenuItem>
                    </Menu>
                    <div ref={messageEndRef} />
                </Stack>
            </Box>
            <Box sx={{
                display: 'flex', alignItems: 'center',
                bgcolor: 'white', bottom: '0',
                position: 'fixed', p: '1', width: '100%', boxSizing: 'border-box'
            }}><input
                    accept="image/*"
                    id="icon-btton-file"
                    type="file"
                    style={{ display: 'none' }}
                    onChange={handleImageUpload}
                />
                <label htmlFor="icon-btton-file">
                    <IconButton color="primary" component="span">
                        <AddPhotoAlternateIcon />
                    </IconButton>
                </label>
                <TextField placeholder="Type a message" variant="outlined"
                    size="small" fullWidth
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)

                    }
                    sx={{ borderRadius: '25px' }} />
                <IconButton color='primary' onClick={handlesend}>
                    <SendSharpIcon />
                </IconButton>

            </Box>
        </Box>
    )
}
export default Chatpage
