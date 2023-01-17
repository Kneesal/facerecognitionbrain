import React, { useState } from "react";

const SignIn = ({ onRouteChange, loadUser, updateIncorrectSignIn, incorrectSignIn, updateSignIn}) => {
  const [signinemail, setSignInEmail] = useState("");
  const [signinpassword, setSignInPassword] = useState("");

  const onEmailChange = (event) => {
    event.preventDefault();
    setSignInEmail(event.target.value);
  };

  const onPasswordChange = (event) => {
    event.preventDefault();
    setSignInPassword(event.target.value);
  };

  const onSubmitSignIn = () => {
    updateSignIn()
    fetch("http://localhost:3000/signin", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: signinemail,
        password: signinpassword,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.id) {
          loadUser(data);
          onRouteChange("home");
        } 
        else {
          console.log(data)
          updateIncorrectSignIn()
        }
      })
  };
  return (
    <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
      <main className="pa4 black-80">
        <div className="measure">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f1 fw6 ph0 mh0">Sign In</legend>
            <p>{incorrectSignIn ? 'incorrect user or password!' : ''}</p>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email-address">
                Email
              </label>
              <input
                onChange={onEmailChange}
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="email"
                name="email-address"
                id="email-address"
              />
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor="password">
                Password
              </label>
              <input
                onChange={onPasswordChange}
                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="password"
                name="password"
                id="password"
              />
            </div>
          </fieldset>
          <div className="">
            <input
              onClick={onSubmitSignIn}
              className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
              type="submit"
              value="Sign in"
            />
          </div>
          <div className="lh-copy mt3">
            <p
              onClick={() => onRouteChange("register")}
              href="#0"
              className="f6 link dim black db pointer"
            >
              Register
            </p>
          </div>
        </div>
      </main>
    </article>
  );
};

export default SignIn;
