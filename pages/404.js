import React from 'react'
import Header from '../components/Header'
import styled from '@emotion/styled'

const Container = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
height: 80vh;
img{
    width: 100px;
}
h1{
    text-align: center;
}
`

export default function Custom404() {
    return (
        <>
          <Header/>
          <Container>
            <img src='https://www.svgrepo.com/show/144183/sad.svg'/>
            <h1>404 - Page Not Found</h1>
          </Container>
        </>
    )
  }