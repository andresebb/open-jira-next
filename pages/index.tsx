import { useContext } from 'react'

import { UIContext } from '../context/ui'
import { Layout } from '../components/layouts'

import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'

import { Typography } from '@mui/material'

const HomePage: NextPage = () => {

  return (
    <Layout title="Home Page">
      <Typography variant="h1">Hola mundo</Typography>
    </Layout>
  )
}

export default HomePage
