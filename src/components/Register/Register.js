import React, { useState } from "react";

const Register = ({ onRouteChange, loadUser, updateSignIn }) => {
  const [registername, setRegisterName] = useState("");
  const [registeremail, setRegisterEmail] = useState("");
  const [registerpassword, setRegisterPassword] = useState("");

  const onNameChange = (event) => {
    event.preventDefault();
    setRegisterName(event.target.value);
  };

  const onEmailChange = (event) => {
    event.preventDefault();
    setRegisterEmail(event.target.value);
  };

  const onPasswordChange = (event) => {
    event.preventDefault();
    setRegisterPassword(event.target.value);
  };

  const onSubmitRegister = () => {
    updateSignIn(true)
    return registername && registeremail && registerpassword // conditional to check if required fields are filled
      ? fetch("http://localhost:3000/register", { //if = true, then fetch API, post user data
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: registername,
            email: registeremail,
            password: registerpassword,
          }),
        })
          .then((res) => res.json())
          .then((user) => {
            if (user) {
              loadUser(user); //pass userdata to props to render in home
              onRouteChange("home"); //send route to home
            }
          })
      : null; //else null
  };

  return (
    <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
      <main className="pa4 black-80">
        <div className="measure">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f1 fw6 ph0 mh0">Register</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="name">
                Name
              </label>
              <input
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="text"
                name="name"
                id="name"
                onChange={onNameChange}
              />
            </div>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email-address">
                Email
              </label>
              <input
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="email"
                name="email-address"
                id="email-address"
                onChange={onEmailChange}
              />
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor="password">
                Password
              </label>
              <input
                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="password"
                name="password"
                id="password"
                onChange={onPasswordChange}
              />
            </div>
          </fieldset>
          <div className="">
            <input
              onClick={onSubmitRegister}
              className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
              type="submit"
              value="Register"
            />
          </div>
        </div>
      </main>
    </article>
  );
};

export default Register;
