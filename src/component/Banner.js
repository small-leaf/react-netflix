import { useEffect, useState } from 'react'
import styled from 'styled-components';
import axios from '../axios';
import requests from '../Requests';

const BannerContainer = styled.header`
  position: relative;
  background-size: cover;
  ${props => props.$backdrop && `
    background-Image: url('https://images.tmdb.org/t/p/original/${props.$backdrop}');
  `}
  background-position: center center;
  height: 448px;
  color: white;
  object-fit: contain;
`

const BannerContent = styled.div`
  margin-left: 30px;
  padding-top: 140px;
  height: 190px;
`

const BannerTitle = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  padding-bottom: .3rem;
`

const ButtonsContainer = styled.div``

const Button = styled.button`
  cursor: pointer;
  color: #fff;
  outline: none;
  border: none;
  font-weight: 700;
  border-radius: .2vw;
  padding-left: 2rem;
  padding-right: 2rem;
  margin-right: 1rem;
  padding-top: .5rem;
  background-color: rgba(51, 51, 51, .5);
  padding-bottom: .5rem;

  &:hover {
    color: #000;
    background-color: #e6e6e6;
    transition: all .2s;
  }
`

const BannerDescription = styled.h1`
  width: 45rem;
  line-height: 1.3;
  padding-top: 1rem;
  font-size: .8rem;
  max-width: 360px;
  height: 80px;
`
const BannerBottom = styled.div`
  height: 7.4rem;
  background-image: linear-gradient(
    180deg,
    transparent,
    rgba(37, 37, 37, .61),
    #111
  );
`

function Banner() {
  const [movie, setMovie] = useState([]);

  // 限制描述字數確保不會跑版
  const truncate = (string, n = 150) => {
    return string?.length > n ? string.substring(0, n - 1) + '...' : string
  }

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      )
      return request;
    }
    
    fetchData();
  }, [])

  return (
    <BannerContainer $backdrop={movie?.backdrop_path}>
      <BannerContent>
        <BannerTitle>
          {movie?.title || movie?.name || movie?.original_name}
        </BannerTitle>
        <ButtonsContainer>
          <Button>Play</Button>
          <Button>My List</Button>
        </ButtonsContainer>
        <BannerDescription>{truncate(movie?.overview)}</BannerDescription>
      </BannerContent>
      <BannerBottom></BannerBottom>
    </BannerContainer>
  )
}

export default Banner