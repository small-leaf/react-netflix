import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { selectUser } from '../redux/reducers/userSlice';
import { auth } from '../firebase';
import Nav from '../component/Nav';
import Plans from '../component/Plans';

const ProfileContainer = styled.div`
  height: 100vh;
  color: white;
`

const ProfileBody = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  margin: 0 auto;
  padding-top: 8%;
  max-width: 800px;
`

const ProfileEditTitle = styled.h1`
  font-size: 60px;
  font-weight: 400;
  border-bottom: 1px solid #282c2d;
  margin-bottom: 20px;
`

const ProfileInfo = styled.div`
  display: flex;
`

const ProfileAvatar = styled.img`
  height: 100px;
`

const ProfileInfoDetail = styled.div`
  color: white;
  margin-left: 25px;
  flex: 1;
`

const ProfileEmail = styled.h2`
  background-color: gray;
  padding: 15px;
  font-size: 15px;
  padding-left: 20px;
`

const ProfilePlansTitle = styled.h3`
  border-bottom: 1px solid #282c2d;
  padding-bottom: 10px;
`

const ProfilePlans = styled.div`
  margin-top: 20px;
`

const SignOutButton = styled.button`
  padding: 10px 20px;
  font-size: 1rem;
  margin-top: 5%;
  width: 100%;
  color: #fff;
  background-color: #e50814;
  font-weight: 600;
  border: none;
  cursor: pointer;
`

function Profile() {
  const user = useSelector(selectUser);

  return (
    <ProfileContainer>
      <Nav />
      <ProfileBody>
        <ProfileEditTitle>Edit Title</ProfileEditTitle>
        <ProfileInfo>
          <ProfileAvatar
            src="https://occ-0-3594-325.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABbV2URr-qEYOrESG0qnP2787XsIxWTMBh7QfJwyqYxMAVFNyiXAqFeu16gI8yTxg3kLwF2mUDKmZGfwBEDd7722xskhYwAMwsBBe.png?r=bd7"
            alt="avatar"
          />
          <ProfileInfoDetail>
            <ProfileEmail>{user.email}</ProfileEmail>
            <ProfilePlans>
              <ProfilePlansTitle>Plans</ProfilePlansTitle>
              <Plans />
              <SignOutButton
                onClick={() => auth.signOut()}
              >
                Sign Out
              </SignOutButton>
            </ProfilePlans>
          </ProfileInfoDetail>
        </ProfileInfo>
      </ProfileBody>
    </ProfileContainer>
  )
}

export default Profile