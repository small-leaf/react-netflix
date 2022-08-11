import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import SignUp from './SignUp';

const LoginContainer = styled.div`
  position: relative;
  height: 100%;
  background: url('https://assets.nflxext.com/ffe/siteui/vlv3/c8c8a0ad-86d6-45f1-b21d-821afa4e5027/9cdb4c04-5266-4b2b-9711-e31768c29d8f/TW-en-20220801-popsignuptwoweeks-perspective_alpha_website_large.jpg') center no-repeat;
  background-size: cover;
`

const LoginBackground = styled.div``

const LoginLogo = styled.img`
  position: fixed;
  top: 15px;
  left: 0;
  width: 150px;
  object-fit: contain;
  padding-left: 20px;
  cursor: pointer;
`

const SignInButton = styled.button`
  position: fixed;
  right: 20px;
  top: 20px;
  padding: 10px 20px;
  font-size: 1rem;
  color: #fff;
  background-color: #e50914;
  border: none;
  outline: none;
  cursor: pointer;
`

const LoginGradient = styled.div`
  width: 100%;
  height: 100vh;
  z-index: 1;
  background: rgba(0, 0, 0, .4);
  background-image: linear-gradient(
    to top,
    rgba(0, 0, 0, .8) 0,
    rgba(0, 0, 0, 0) 60%,
    rgba(0, 0, 0, .8) 100%
  );
`

const LoginBody = styled.div`
  position: absolute;
  top: 30%;
  left: 0;
  right: 0;
  margin: 0 auto;
  /* left: 50%;
  transform: translate(-50%, -50%); */
  text-align: center;
  z-index: 1;
  color: #fff;
  padding: 20px;

  & > h1 {
    font-size: 3.125rem;
    margin-bottom: 20px;
  }

  & > h2 {
    font-size: 2rem;
    font-weight: 400;
    margin-bottom: 30px;
  }

  & > h3 {
    font-size: 1.3rem;
    font-weight: 400;
  }
`

const LoginFormContainer = styled.div`
  margin: 20px;
`

const LoginForm = styled.form``

const LoginInput = styled.input`
  position: relative;
  top: -1px;
  padding: 10px;
  outline-width: 0;
  height: 30px;
  width: 30%;
  border: none;
  max-width: 600px;
`

const LoginButton = styled.button`
  position: relative;
  top: -.25px;
  padding: 16px 20px;
  font-size: 1rem;
  font-weight: 600;
  color: #fff;
  background-color: #e50914;
  border: none;
  cursor: pointer;
`

function Login() {
  const [email, setEmail] = useState('');
  const [signIn, setSignIn] = useState(false);
  const history = useHistory();

  return (
    <LoginContainer>
      <LoginBackground>
        <LoginLogo
          onClick={() => history.push('/')}
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Logonetflix.png/800px-Logonetflix.png?20170904093427"
          alt="logo"
        />
        <SignInButton
          onClick={() => {
            setSignIn(true)
          }}
        >
          Sign in
        </SignInButton>
        <LoginGradient />
      </LoginBackground>
      <LoginBody> 
        {signIn ? (
          <SignUp email={email}/>
        ) : (
          <>
            <h1>Unlimited movies, TV shows, and more.</h1>
            <h2>Watch anywhere. Cancel anytime.</h2>
            <h3>Ready to watch? Enter your email to create or restart your membership.</h3>
            <LoginFormContainer>
              <LoginForm>
                <LoginInput
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={e => {
                    setEmail(e.target.value)
                  }}
                />
                <LoginButton
                  onClick={() => {
                    setSignIn(true)
                  }}
                >
                  GET STARTED
                </LoginButton>
              </LoginForm>
            </LoginFormContainer>
          </>
        )}
      </LoginBody>
    </LoginContainer>
  )
}

export default Login