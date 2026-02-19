import { useState } from 'react'
import Box from '@mui/material/Box';
import './App.css'
import Typography from '@mui/material/Typography'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import SimpleBottomNavigation from './components/Bottom/Bottom';
import ChatBox from './components/Chat/Chat';
import Chatpage from './components/Chatpage/Chatpage';
import Status from './components/Status/Status';
import Calls from './components/Calls/Calls';
import { chatData } from './components/ChatData';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function App() {
  const [CurrentTab, setCurrentTab] = useState(0)
  const [selectedChat, setselectedChat] = useState(null)

  const [searchTerm, setSearchTerm] = useState("");

  const filteredChats = chatData.filter((chat) =>
    chat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const [myStatuses, setMyStatuses] = useState([]);

  const handleStatusUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newStatus = {
          id: Date.now,
          image: reader.result,
          time: "just now"
        };
        setMyStatuses([newStatus, ...myStatuses])
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>

      <Box width={'100vw'}
        height={'100vh'}
        display={'flex'}
        flexDirection={'column'}
        overflow={'hidden'}
      >{!selectedChat && (
        <AppBar position="fixed" color="primary" sx={{ bgcolor: '#107569ff' }}>
          <Toolbar sx={{
            display: 'flex', flexDirection: 'column',
            justifyContent: 'space-between', alignItems: 'flex-start', paddingBottom: '16px',
            paddingTop: '16px'
          }}>
            <>
              {CurrentTab === 0 ? (
                <>
                  <Typography variant="h6" sx={{ mb: '2', minWidth: 'fit-content', mr: 2, flexGrow: '1' }} >
                    WHATTSAPP
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="Search..."
                    variant="standard"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                      disableUnderline: true,
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon sx={{ color: 'white' }} />
                        </InputAdornment>
                      ),
                      sx: { color: 'white', bgcolor: 'rgba(255,255,255,0.2)', borderRadius: '5px', px: 1 }
                    }}
                  /></>) : (<Typography variant="h6" sx={{ width: '100%', textAlign: 'left' }}>
                    {CurrentTab === 1 ? "STATUS" : "CALLS"}
                  </Typography>)}
            </>

          </Toolbar>

        </AppBar>
      )}
        <Box sx={{
          mt: '100px', height: 'calc(100vh - 120px)',
          overflowY: 'auto', flexGrow: '1', display: 'flex', p: '0',
          paddingBottom: '60px', flexDirection: 'column', width: '100%',
          overflowX: 'hidden',
          bgcolor: '#ffffffff'
        }}
        >
          {selectedChat ? (
            <Chatpage chat={selectedChat} onBack={() => setselectedChat(null)} />
          ) : (
            <>{CurrentTab === 0 && <ChatBox onSelect={(chat) => setselectedChat(chat)} searchTerm={searchTerm} />}</>
          )}
          
          {CurrentTab === 1 && <Status myStatuses={myStatuses} />}
          {CurrentTab === 2 && <Calls />}
        </Box>
        {!selectedChat &&
          <SimpleBottomNavigation
            LiveTab={CurrentTab}
            setLiveTab={setCurrentTab} />}
      </Box>
    </>
  )
}

export default App
