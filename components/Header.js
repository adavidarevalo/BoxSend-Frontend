
import React, {useContext} from "react"
import Link from "next/link"
import authContext from "../context/auth/authContext"
import appContext from "../context/app/appContext"
import {css} from "@emotion/react"
import styled from "@emotion/styled"
import {useRouter} from "next/router"
//modal
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Image from 'next/image'
import logo from "../public/logo.png"
import menu from "../public/menu.svg"


const HeaderContainer = styled.div`
width: 90%;
margin: 0 auto;
display: flex;
justify-content: space-between;
padding: 15px;
`

const LogoDiv = styled.div`
display:flex;
align-items: baseline;
cursor: pointer;
h2{
  font-family: Roboto;
  font-weight: 300;
  margin: 0;
  span{
    font-weight: 700;
  }
}
`

const Options = styled.div`
display: flex;
button{
  padding: 13px 15px;
  background: black;
  color: white;
  margin-block: 10px;
  border: none;
  border-radius: 3px;
  letter-spacing: 2px;
  font-weight: 700;
  cursor: pointer;
  &:hover{
    box-shadow: 3px 1px 9px 0px rgb(0 0 0 / 20%);
    background: #1f1f1f;
  }
}
@media (max-width: 600px) {
  display: none;
}
`

const LoginB= styled.a`
margin-right: 15px;
padding: 13px 25px;
border-radius: 3px;
font-size: 1rem;
color: #fff;
background: #ff6600;
font-weight: 700;
letter-spacing: 2px;
text-transform: uppercase;
cursor: pointer;
text-align: center;
&:hover{
  box-shadow: 3px 1px 9px 0px rgb(0 0 0 / 20%);
  background: #d85600;
}
`
const CreateAccountB = styled.a`
padding: 13px 25px;
border-radius: 3px;
font-size: 1rem;
color: #fff;
background: #000000;
font-weight: 700;
letter-spacing: 2px;
text-transform: uppercase;
cursor: pointer;
text-align: center;
&:hover{
  box-shadow: 3px 1px 9px 0px rgb(0 0 0 / 20%);
  background: #1f1f1f;
}
`

//modal
const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'center',
    paddingTop: "71px",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: "100%",
    background: "#5c6575",
    display: "flex",
    flexDirection: "column",
  },
}));



const Header = () =>{
  const router = useRouter()
  const AuthContext = useContext(authContext)
  const {user, logOut} = AuthContext
  const AppContext = useContext(appContext)
  const {clearState} = AppContext
  const redirecting = () =>{
    router.push("/")
    clearState()
  }
  //modal
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return(
    <header>
      <HeaderContainer>
        <LogoDiv
        onClick={()=>redirecting()}
        >
          <h2>Box<span>Send</span></h2>
          <Image 
          src={logo}
          alt="Logo BoxSend"
          width="40px"
          height="40px"
          />

        </LogoDiv>
        <div css={css`
        margin-top: 20px;
        @media (min-width: 600px) {
          display: none;
        }
        `}>
          <Image 
          src={menu}
          alt="Icon Menu"
          onClick={handleOpen}
          width={22}
          height={22}
          /> 
        </div>
        <Modal
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            {user ? (
          <>
            <p
            css={css`
                text-align: center;
                margin-right: 0px;
            `}
            >Hi <span
            css={css`
            font-weight: 700;
            `}
            >{user.name}</span></p>
            <Link href="/login" passHref>
              <CreateAccountB
              onClick={()=>logOut()}
              >Log Out</CreateAccountB>
            </Link>
          </>
          ): (
          <>
            <Link href="/login" passHref>
              <LoginB css={css`
              margin-right: 0px;
              `}>Login</LoginB>
            </Link>
            <Link href="/createAccount" passHref>
              <CreateAccountB>Create Account</CreateAccountB>
            </Link>
          </>
          )}
          </div>
        </Fade>
      </Modal>




        <Options>
          {user ? (
          <>
            <p
            css={css`
            margin-right: 15px;
            `}
            >Hi <span
            css={css`
            font-weight: 700;
            `}
            >{user.name}</span></p>
            <Link href="/login" passHref>
              <button
              onClick={()=>logOut()}
              >Log Out</button>
            </Link>
          </>
          ): (
          <>
            <Link href="/login" passHref>
              <LoginB>Login</LoginB>
            </Link>
            <Link href="/createAccount" passHref>
              <CreateAccountB>Create Account</CreateAccountB>
            </Link>
          </>
          )}
        </Options>
      </HeaderContainer>
    </header>
  )
}

export default Header