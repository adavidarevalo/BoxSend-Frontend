
import React, {useState, useCallback, useContext} from "react"
import {useDropzone} from "react-dropzone"
import { css } from '@emotion/react'
import styled from "@emotion/styled"
import appContext from "../context/app/appContext"
import DeleteForm from "./DeleteForm"
import authContext from "../context/auth/authContext"

const DropzoneContainer = styled.div`
width: 100%;
height: 100%;
border: 1px dashed gray;
background: #f4f7fa;
div{
  width: 100%;
  height: 100%;
  background: none;
  min-height: 300px;
}
button{
  padding: 10px 25px;
  width: 70%;
  border: none;
  border-radius: 3px;
  background: #0f5aa7;
  color: #fff;
  font-weight: 700;
  font-size: 1rem;
  letter-spacing: 3px;
  cursor: pointer;
  &:hover{
    box-shadow: 3px 1px 9px 0px rgb(0 0 0 / 20%);
    background: #0e4b8a;
  }
}
`
const ContainerDiv = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
p{
  font-size: 1.3rem;
}
`

const PHovver = styled.p`
display: flex;
justify-content: center;
align-items: center;
min-height: 250px;
font-size: 1.5rem;
color: #2e2e2e;
`
const LiContainer = styled.li`
list-style: none;
background: #fff;
margin: 0 auto;
border-radius: 3px;
box-shadow: 2px 3px 7px 0px rgb(0 0 0 / 20%);
padding: 10px;
p{
  margin: 0;
  font-weight: 700;
}
`
const Container = styled.div`
width: 80% !important;
margin: 0 auto;
h2{
  text-align: center;
  letter-spacing: 2px;
}
ul{
  list-style: none;
  padding: 0;
}
button{
  width: 100%;
  margin-bottom: 25px;
}
`

const Dropzone = () =>{
  const AppContext = useContext(appContext)
  const {heavyFile, UploadFile, loading, createLink} = AppContext
  const AuthContext = useContext(authContext)
  const {authenticated} = AuthContext

  const onDropAccepted = useCallback(async (acceptedFiles)=>{
    const formData = new FormData();
    formData.append("file", acceptedFiles[0])
    UploadFile(formData, acceptedFiles[0].path)
  }, [])

  const onDropRejected = () =>{
    heavyFile("Could not upload, limit is 1MB, get a free account to upload larger files.")
  }


  const {getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({onDropAccepted, onDropRejected, maxSize: 1000000})

  const files = acceptedFiles.map(data=>(
    <LiContainer key={data.lastModified}>
      <p>{data.path}</p>
      <p css={css`
        font-weight: 400 !important;
        color: gray;
      `}>{(data.size / Math.pow(1024, 2)).toFixed(2)} MB</p>
    </LiContainer>
  ))

  return(
    <DropzoneContainer>
      {acceptedFiles.length > 0 ? (
        <Container>
          <h2>Files</h2>
          <ul>
            {files}
          </ul>
          {authenticated && <DeleteForm/>}
          {loading ? <p>Loading...</p> :(
              <button
              onClick={()=> createLink() }
              >Create Link</button>
          )}
        </Container>
      ) : (
      <div {...getRootProps({className: "dropzone"})}>
        <input {...getInputProps()} css={css`
          width: 100%;
          height: 100%;
        `}/>
        {
          isDragActive ? <PHovver>Drop the file</PHovver>:(
            <ContainerDiv>
              <p>Dropzone Here</p>
              <button>Select File</button>
            </ContainerDiv>
          )
        }
      </div>
      )}
    </DropzoneContainer>
  )
}

export default Dropzone