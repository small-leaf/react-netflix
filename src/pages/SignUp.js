import { useEffect, useRef } from 'react'
import styled from 'styled-components';
import { auth } from '../firebase';

const SignUpContainer = styled.div`
  max-width: 300px;
  padding: 70px;
  margin: 0 auto;
  background: rgba(0, 0, 0, .85);
`

const SignUpForm = styled.form`
  display: grid;
  flex-direction: column;
`

const SignUpTitle = styled.h1`
  text-align: left;
  margin-bottom: 25px;
`

const SignUpInput = styled.input`
  outline-width: 0;
  height: 40px;
  margin-bottom: 14px;
  border-radius: 5px;
  border: none;
  padding: 5px 15px;
`

const SignUpButton = styled.button`
  padding: 16px 20px;
  font-size: 1rem;
  color: #fff;
  border-radius: 5px;
  background-color: #e50914;
  font-weight: 600;
  border: none;
  cursor: pointer;
  margin-top: 20px;
`

const SignUpOther = styled.h4`
  text-align: left;
  margin-top: 30px;
  color: gray;
`

const SignUpNow = styled.span`
  color: white;

  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`

function SignUp({ email }) {  
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const register = e => {
    e.preventDefault();

    auth.createUserWithEmailAndPassword(
      emailRef.current.value,
      passwordRef.current.value
    ).then(authUser => {
      console.log('authUser', authUser)
    }).catch(err => {
      alert(err.message)
    })
  }

  const signIn = e => {
    e.preventDefault();

    auth.signInWithEmailAndPassword(
      emailRef.current.value,
      passwordRef.current.value
    ).then(authUser => {
      console.log(authUser)
    }).catch(err => {
      alert(err.message)
    })
  }

  useEffect(() => {
    emailRef.current.value = email;
  }, [email])

  return (
    <SignUpContainer>
      <SignUpForm>
        <SignUpTitle>Sign In</SignUpTitle>
        <SignUpInput
          ref={emailRef}
          placeholder="Email"
          type="email"
        />
        <SignUpInput
          ref={passwordRef}
          placeholder="Password"
          type="password"
        />
        <SignUpButton
          onClick={signIn}
          type="submit"
        >
          Sign In
        </SignUpButton>
        <SignUpOther>
          <span>New to Netflix? </span>
          <SignUpNow
            onClick={register}
          >
            Sign up now.
          </SignUpNow>
        </SignUpOther>
      </SignUpForm>
    </SignUpContainer>
  )
}

export default SignUp