
import React, {useContext} from "react"
import Layout from "../components/Layout"
import {useFormik} from "formik"
import * as Yup from "yup"
import authContext from "../context/auth/authContext"
import Alert from "../components/Alert"
import styled from "@emotion/styled"
import {css} from "@emotion/react"

const CreateDiv = styled.div`
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

const CreateAccount = () =>{
  // eslint-disable-next-line
  const AuthContext = useContext(authContext)
  const {createUser, message} = AuthContext
  // eslint-disable-next-line
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password:"",
      passwordComprovation:""
    },
    validationSchema: Yup.object({
      name: Yup.string()
                       .required("The name is required"),
      email: Yup.string()
                       .email("The invalid email")
                       .required("The email is required"),
      password: Yup.string()
                       .required("The password is required")
                       .min(6, "The password needs at least 6 characters"), 
      passwordComprovation: Yup.string()
                                                    .required("The password is required")
                                                    .oneOf([Yup.ref("password"), null], "The password does not match")
    }),
    onSubmit: valores =>{
      createUser(valores)
    }
  })
  return(
    <Layout>
      <CreateDiv>
        <h1>Create Account</h1>
        <form
        onSubmit={formik.handleSubmit}
        >
          {message&& <Alert/> }
          <div>
            <label>Name</label>
            <input
            type="text"
            placeholder="Your Name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            />
            {formik.touched.name && formik.errors.name ? (
              <div>
                <p css={css`
                color: red;
                `}>{formik.errors.name}</p>
              </div>
            ): null}
          </div>
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
                <p css={css`
                color: red;
                `}>{formik.errors.email}</p>
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
                <p css={css`
                color: red;
                `}>{formik.errors.password}</p>
              </div>
            ): null}
          </div>
          <div>
            <label>Password Comprovation</label>
            <input
            type="password"
            placeholder="Your Password Comprovation"
            name="passwordComprovation"
            value={formik.values.passwordComprovation}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            />
            {formik.touched.passwordComprovation && formik.errors.passwordComprovation ? (
              <div>
                <p css={css`
                color: red;
                `}>{formik.errors.passwordComprovation}</p>
              </div>
            ): null}
          </div>
          <InputB
          type="submit"
          value="Create Account"
          />
        </form>
      </CreateDiv>
    </Layout>
  )
}

export default CreateAccount