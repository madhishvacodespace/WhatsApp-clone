import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import ChatIcon from '@mui/icons-material/Chat';
import DonutLargeRoundedIcon from '@mui/icons-material/DonutLargeRounded';
import CallRoundedIcon from '@mui/icons-material/CallRounded';

 function SimpleBottomNavigation({LiveTab,setLiveTab}) {
  

  return (
    <Box sx={{ width: '100vw', ml:'0'}}
    position='fixed'
    bottom='0'
    margin={'0'}>
      <BottomNavigation
      sx={{bgcolor:'#107a6eff'}}
        showLabels
        value={LiveTab}
        onChange={(event, newValue) => {
          setLiveTab(newValue);
        }}
      >
        <BottomNavigationAction sx={{color:'#25e01eff'}} label="Chats" icon={<ChatIcon sx={{color:'#00ffc8ff'}}/>} />
        <BottomNavigationAction sx={{color:'#25e01eff'}} label="Status" icon={<DonutLargeRoundedIcon  sx={{color:'#00ffc8ff'}} />} />
        <BottomNavigationAction sx={{color:'#25e01eff'}} label="Calls" icon={<CallRoundedIcon  sx={{color:'#00ffc8ff'}} />} />
      </BottomNavigation>
    </Box>
  );
}
export default SimpleBottomNavigation
