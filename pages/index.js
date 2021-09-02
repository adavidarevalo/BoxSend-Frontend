
import React, {useContext, useEffect} from "react"
import Layout from "../components/Layout"
import authContext from "../context/auth/authContext"
import Link from "next/link"
import { css } from "@emotion/react"
import Dropzone from "../components/Dropzone"
import Alert from "../components/Alert"
import appContext from "../context/app/appContext"
import styled from "@emotion/styled"

const IndexDiv = styled.div`
background: white;
padding: 20px;
box-shadow: 0px 0px 6px 0px rgb(0 0 0 / 20%);
max-width: 850px;
width: 80%;
margin: 0 auto;
@media (min-width: 750px){
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 3rem;
  min-height: 400px;
}
`

const CointainerDiv = styled.div`
h2{
  color: #373636;
  font-size: 2.3rem;
  letter-spacing: 2px;
  line-height: 50px;
  margin-top: 15px;
}
p{
  font-size: 1.1rem;
  letter-spacing: 2px;
  line-height: 25px;
  span{
    color: #ff6600;
    font-weight: 700;
  }
}
a{
  font-size: 1.1rem;
  letter-spacing: 2px;
  line-height: 25px;
  color: #ff6600;
  &:hover{
    text-decoration: underline;
    color: #da5700;
  }
}
`
const LinkContainer = styled.div`
p{
  font-size: 1.2rem;
  span{
    font-weight: 700;
    color: #ff6600;
    font-size: 1.6rem;
  }
}
button{
  width: 100%;
  background: #ff6600;
  border: none;
  padding: 8px;
  border-radius: 3px;
  color: #fff;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  &:hover{
    box-shadow: 3px 1px 9px 0px rgb(0 0 0 / 20%);
    background: #d85600;
  }
}
`

const Container = styled.div`
display: flex;
justify-content: center;
align-items: center;
margin-top: 10px;
height: 80vh;
@media (max-width: 938px) {
  height: auto;
}
`


export default function Home() {
  const AuthContext = useContext(authContext)
  const {userAutentification} = AuthContext
  const AppContext = useContext(appContext)

  const {url} = AppContext
  useEffect(() => {
    const token = localStorage.getItem("BStoken")
    if(token){
      userAutentification()
    }
  }, [])
  return (
    <Layout>
      <div css={css`
      width: 100%;
      min-height: 80vh;
      display: flex;
      justify-content: center;
      align-items: center;
      `}>
        {url ?(
          <LinkContainer>
            <p><span>Your Link: </span>{`${process.env.frontendURL}/link/${url}`}</p>
            <button
            type="button"
            onClick={()=> navigator.clipboard.writeText(`${process.env.frontendURL}/link/${url}`)}
            >Copy Link</button>
          </LinkContainer>
        ):(
        <>
        <Container>
          <Alert/>
          <IndexDiv>
            <Dropzone />
            <CointainerDiv>
              <h2>Share files easily and privately</h2>
              <p><span>BoxSend</span > It allows you to share files with end-to-end encryption and a file that is deleted after it is downloaded. So you can keep what you share private and make sure your stuff doesn&apos;t stay online forever.</p>
              <Link href="/createAccount">Create an account for more benefits.</Link>
            </CointainerDiv>
          </IndexDiv>
        </Container>
        </>
        )}
      </div>
    </Layout>
  )
}
