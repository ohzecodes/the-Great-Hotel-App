import React from "react";
import { Link, Redirect } from "react-router-dom";
// Redirect
const LoginApp = (props) => {
  // console.log(props);
  let { user } = props;
  console.log(Object.keys(props.user).length);
  if (Object.keys(props.user).length !== 0)
    return (
      <>
        <Redirect
          to={{
            pathname: "/",
            state: user,
          }}
        />
        ;
      </>
    );
  else return <>PrivateScreen</>;
};

export default LoginApp;
