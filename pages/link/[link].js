
import Layout from "../../components/Layout"
import clientAxios from "../../config/axios"
import {useState, useContext} from "react"
import appContext from "../../context/app/appContext"
import styled from "@emotion/styled"
import Link from "next/link"


const LoginContainer = styled.div`
width: 100%;
min-height: 70vh;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
h1{
  text-transform: uppercase;
  letter-spacing: 3px;
}
form{
  background: #fff;
  padding: 15px;
  box-shadow: 2px 2px 5px 0px rgb(0 0 0 / 20%);
  width: 90%;
  max-width: 350px;
  div{
    margin-bottom: 10px;
    label{
      display: block;
    }
    input{
      width: 100%;
      padding: 5px;
      margin-top: 8px;
    }
  }
}
`
const InputB = styled.input`
padding: 10px 25px;
border-radius: 3px;
font-size: 1rem;
color: #fff;
background: #ff6600;
font-weight: 700;
letter-spacing: 2px;
text-transform: uppercase;
border: none;
width: 100%;
margin-top: 25px;
`
const DowloadDiv = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
height: 50vh;
p{
  font-size: 1.2rem;
}
a{
  width: 100%;
  background: #ff6600;
  border: none;
  padding: 8px;
  border-radius: 3px;
  color: #fff;
  font-weight: 700;
  font-size: 1rem;
  width: 162px;
  text-align: center;
  cursor: pointer;
  &:hover{
    box-shadow: 3px 1px 9px 0px rgb(0 0 0 / 20%);
    background: #d85600;
  }
}
`
export async function getServerSideProps({params}) {
  const {link} = params
  const result = await clientAxios.get(`/api/link/${link}`)
  return{
    props: {
      link: result.data
    }
  }
}

export async function getServerSidePaths(){
  const links = await clientAxios.get("/api/link")
  return {
    paths: links.data.links.map(data=>({
      params: {link: data.url}
    })),
    fallback: true
  }  
}
// eslint-disable-next-line
export default ({link}) =>{
  const AppContext = useContext(appContext)
  const {getPassword, heavyFile, messageError} = AppContext

  const [formContainer, setFormContainer] = useState(link.password)

  const [pass, getPass] = useState("")

  
  const validatePass = async(e) =>{
    e.preventDefault()
    if(pass === ""){
      heavyFile("The Password is Required")
      return
    }
    const data = {
      pass
    }
    const awswer = await clientAxios.post(`/api/link/${link.link}`, data)
    if(awswer.data.msg){
      heavyFile(awswer.data.msg) 
    }
    if(awswer.data.validate){
      setFormContainer(false)
    }
  }
  const {file} = link
  return(
    <Layout>
      {formContainer? (
        <LoginContainer>
          <h2>The link is password protected</h2>
          <form
          onSubmit={e=>validatePass(e)}
          >
            <div>
            <label>Password</label>
            <input
            placeholder="Link Password"
            onChange={e=>getPass(e.target.value)}
            type="password"
            />
            </div>
            <InputB
            type="submit"
            value="Validate Password"
            />
            {messageError && <p>{messageError}</p>}
          </form>
        </LoginContainer>
      ):(
        <DowloadDiv>
          <h2>Download File</h2>
          {file ? (
          <Link href={`${process.env.backendURL}/api/file/${link.file}`}>
            {link.file && 
            (<a>Download Here</a>)}
          </Link>
          ) :(
            <p>Link Removed</p>
          ) }
        </DowloadDiv>
      )}
    </Layout>
  )
}