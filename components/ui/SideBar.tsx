import { useContext } from 'react';

import { UIContext } from '../../context/ui';

import { Box, Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material"
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AnchorIcon from '@mui/icons-material/Anchor';

const menuItems: string[] = ["Inbox", "Starred", "Send Email", "Drafts"]

export const SideBar = () => {

  const { sideMenuOpen, closeSideMenu } = useContext(UIContext)

  return (
    <Drawer anchor="left"
      open={sideMenuOpen}
      onClose={closeSideMenu}
    >

      <Box sx={{
        width: 250
      }}>

        <Box sx={{
          padding: "5px 10px"
        }}>
          <Typography variant="h4">Menu</Typography>
        </Box>

        <List>
          {
            menuItems.map((text, index) => (
              <ListItem key={index}>
                <ListItemIcon>
                  {index % 2 ? (
                    <AccountBalanceIcon />
                  ) : (
                    <AnchorIcon />
                  )}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))
          }
        </List>
        <Divider />
        <List>
          {
            menuItems.map((text, index) => (
              <ListItem key={index}>
                <ListItemIcon>
                  {index % 2 ? (
                    <AccountBalanceIcon />
                  ) : (
                    <AnchorIcon />
                  )}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))
          }
        </List>
      </Box>

    </Drawer>
  )
}
