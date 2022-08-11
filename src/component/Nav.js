import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

const NavContainer = styled.div`
  position: fixed;
  top: 0;
  padding: 20px;
  width: 100%;
  height: 30px;
  z-index: 1;

  &.nav_black {
    background-color: #111;
  }

  // Animations
  transition-timing-function: ease-in;
  transition: all .5s;
`

const NavContent = styled.div`
  display: flex;
  justify-content: space-between;
`

const Logo = styled.img`
  position: fixed;
  left: 0;
  width: 80px;
  object-fit: contain;
  padding-left: 20px;
  padding-top: 5px;
  cursor: pointer;
`

const Avatar = styled.img`
  position: fixed;
  cursor: pointer;
  right: 20px;
  width: 30px;
`

function Nav() {
  const [isShow, setIsShow] = useState(false);
  const history = useHistory();


  const transitionNavBar = () => {
    if (window.scrollY > 100) {
      setIsShow(true);
    } else {
      setIsShow(false);
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', transitionNavBar);
    return () => {
      window.removeEventListener('scroll', transitionNavBar);
    }
  }, [])

  return (
    <NavContainer className={`${isShow && 'nav_black'}`}>
      <NavContent>
        <Logo
          onClick={() => history.push('/')}
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Logonetflix.png/800px-Logonetflix.png?20170904093427"
          alt="logo"
        />
        <Avatar
          onClick={() => history.push('/profile')}
          src="https://occ-0-3594-325.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABbV2URr-qEYOrESG0qnP2787XsIxWTMBh7QfJwyqYxMAVFNyiXAqFeu16gI8yTxg3kLwF2mUDKmZGfwBEDd7722xskhYwAMwsBBe.png?r=bd7"
          alt="avatar"
        />
      </NavContent>
    </NavContainer>
  )
}

export default Nav