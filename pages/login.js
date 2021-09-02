
import React, {useContext, useEffect} from "react"
import Layout from "../components/Layout"
import {useFormik} from "formik"
import * as Yup from "yup"
import authContext from "../context/auth/authContext"
import Alert from "../components/Alert"
import {useRouter} from "next/router"
import styled from "@emotion/styled"


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
background: #000000;
font-weight: 700;
letter-spacing: 2px;
text-transform: uppercase;
border: none;
width: 100%;
margin-top: 25px;
`

const Login = () =>{
  const AuthContext = useContext(authContext)
  const {loginSuccesful, message, authenticated} = AuthContext

  const router = useRouter()
  useEffect(() => {
    if(authenticated){
      router.push("/")
    }
  }, [authenticated])


  const formik = useFormik({
    initialValues: {
      email: "",
      password:"",
    },
    validationSchema: Yup.object({
      email: Yup.string()
                       .email("The invalid email")
                       .required("The email is required"),
      password: Yup.string()
                       .required("The password is required")
    }),
    onSubmit: valores =>{
      loginSuccesful(valores)
    }
  })
  return(
    <Layout>
      <LoginContainer>
        <h1>Login</h1>
        <form
        onSubmit={formik.handleSubmit}
        >
          <div>
            <label>Email</label>
            <input
            type="email"
            placeholder="Your Email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email ? (
              <div>
                <p>Error</p>
                <p>{formik.errors.email}</p>
              </div>
            ): null}
          </div>
          <div>
            <label>Password</label>
            <input
            type="password"
            placeholder="Your Password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password ? (
              <div>
                <p>Error</p>
                <p>{formik.errors.password}</p>
              </div>
            ): null}
          </div>
          <InputB
          type="submit"
          value="Login"
          />
          {message && <Alert/>}
        </form>
      </LoginContainer>
    </Layout>
  )
}

export default Login

//loginSuccesful