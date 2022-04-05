import { useContext } from 'react';

import { UIContext } from '../../context/ui';

import { AppBar, IconButton, Toolbar, Typography } from '@mui/material'
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';

export const NavBar = () => {

  const { openSideMenu } = useContext(UIContext)

  return (
    <AppBar position='sticky' >
      <Toolbar>
        <IconButton onClick={openSideMenu} size="large" edge="start">
          <MenuOutlinedIcon />
        </IconButton>

        <Typography variant="h6">OpenJira</Typography>
      </Toolbar>
    </AppBar>
  )
}
