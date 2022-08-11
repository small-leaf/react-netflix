import { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from '../axios';

const RowContainer = styled.div`
  color: white;
  margin-left: 20px;
`

const Title = styled.h2``

const MoviePosterContainer = styled.div`
  display: flex;
  overflow-y: hidden;
  overflow-x: scroll;
  padding: 20px 20px 20px 0;

  &::-webkit-scrollbar {
    display: none;
  }
`

const MoviePoster = styled.img`
  max-height: 130px;
  object-fit: contain;
  margin-right: 10px;
  width: 100%;
  transition: transform 450ms;

  &:hover {
    transform: scale(1.2);
    opacity: 1;
  }
  &.large {
    max-height: 250px;
    
    &:hover {
      transform: scale(1.09);
      opacity: 1;
    }
  }
`

const IMAGE_BASE_URL = `https://images.tmdb.org/t/p/original/`;

function Row({ title, fetchUrl, isLargeRow = false }) {
  const [movies, setMovies] = useState();
  
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }

    fetchData();
  }, [fetchUrl])

  return (
    <RowContainer>
      <Title>
        {title}
      </Title>
      <MoviePosterContainer>
        {
          movies && movies.map(movie => (
            <MoviePoster
              className={`${isLargeRow && 'large'}`}
              key={movie.id}
              src={`${IMAGE_BASE_URL}${isLargeRow ? movie.poster_path : movie.backdrop_path }`}
              alt={movie.name}
            />
          ))
        }
      </MoviePosterContainer>
    </RowContainer>
  )
}

export default Row