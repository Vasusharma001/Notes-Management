import React from 'react'

function Alert(props) {
    const capitalize = ()=>{
      let str=props.alert.type;
      if(str==="danger") return "Error";
      return str[0].toUpperCase()+str.slice(1);
    }
  return (
      <div style={{height:'50px'}}>
        {props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
        <strong>{capitalize(props.alert.type)}</strong> {props.alert.msg}
        </div>}
      </div>
  )
}

export default Alert