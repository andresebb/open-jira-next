import { useContext } from 'react'

import { Layout } from '../components/layouts'
import { UIContext } from '../context/ui'

import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'

import { Card, CardContent, CardHeader, Grid, Typography } from '@mui/material'



const HomePage: NextPage = () => {

  return (
    <Layout title="Home - Open jira">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Card sx={{
            height: "calc(100vh - 100px)"
          }}>
            <CardHeader title="Pendientes" />

            <CardContent>

            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{
            height: "calc(100vh - 100px)"
          }}>
            <CardHeader title="En Progreso" />
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{
            height: "calc(100vh - 100px)"
          }}>
            <CardHeader title="Completadas" />
          </Card>
        </Grid>
      </Grid>
    </Layout>
  )
}

export default HomePage
