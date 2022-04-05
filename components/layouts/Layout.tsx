import { FC } from 'react';

import Head from 'next/head'
import { NavBar, SideBar } from '../ui';

import { Box } from '@mui/material'

interface Props {
  title?: string;
}

export const Layout: FC<Props> = ({ title = "OpenJira", children }) => {
  return (
    <Box sx={{
      flexFlow: 1
    }}>
      <Head>
        <title>{title}</title>
      </Head>
      <NavBar />
      <SideBar />

      <Box sx={{ padding: "10px 20px" }}>
        {children}
      </Box>
    </Box>
  )
}
