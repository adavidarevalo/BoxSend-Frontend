
import React, {useState, useContext} from "react"
import appContext from "../context/app/appContext"
import styled from "@emotion/styled"
import {css} from "@emotion/react"

const Select = styled.div`
label{
  display:block;
}
select{
  width: 100%;
  padding: 7px;
  border-radius: 3px;
  margin-top: 9px;
}
`
const Form = styled.form`
div{
margin: 0 auto !important;
min-height: 72px!important;
}
`

const DeleteForm = () =>{
  const [enablePassword, setEnablePassword] = useState(false)
  const AppContext = useContext(appContext)
  const {getPassword, getDowloads} = AppContext
  return(
    <Form>
      <Select>
        <label>Delete After</label>
        <select
        onChange={e=>getDowloads(e.target.value)}
        >
          <option selected disabled value="">--Select--</option>
          <option value="1">1 Download</option>
          <option value="5">5 Downloads</option>
          <option value="10">10 Downloads</option>
          <option value="15">15 Downloads</option>
        </select>
      </Select>
      <div>
        <label>Create Password</label>
        <input
        type="checkbox"
        onChange={()=> setEnablePassword(!enablePassword)}
        />
        {enablePassword && (
          <input
          type="password"
          onChange={e=> getPassword(e.target.value)}
          css={css`
          display: block;
          border-radius: 3px;
          margin-top: 9px;
          border: 1px solid gray;
          width: 100%;
          padding: 7px;
          `}
          />
        )}
      </div>
    </Form>
  )
}

export default DeleteForm