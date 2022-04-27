import styled from "styled-components";
import {useNavigate } from "react-router-dom";
import { MovieCard } from "../commonStyle";
import { colors } from "../pallette";
import Spinner from "./Spinner";
import Error from "./Error";

const Container = styled.div`
display:flex;
flex-direction:column;
`
const Text = styled.div`
text-transform: capitalize;
`

const Title = styled(Text)`
font-weight: 700;
font-size:1.2rem;
`
const Subtitle = styled(Text)`
padding-top:0.5rem;
color:${colors.grey}
`
const Header = styled.div`
margin: 2rem 3.5rem;
display: flex;
align-items: center;
`
const Body = styled.div`
display: grid;
grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
margin: 0 2.5rem;
`
const CardWrap = styled.div`
display:flex;
flex-direction:column;
min-height: 22rem;
width: 15rem;
cursor:pointer;
`
const Details = styled.div`
margin: 1rem 1rem;
`
const Image = styled.img`
width: 100%;
height: 100%;
`

export default function MovieList({ list,loading,error }) {
    let navigate = useNavigate();

    function handleMovieClick(movie) {
        navigate(`movies/${movie.movie_id}`);
        // alert(movie.id+':'+movie.title);
    }

    if (loading) return <Spinner loading={loading} color={'white'} /> 
    if (error) return <Error/>
    return (
        <Container>
            <Header>
                <Title>now showing</Title>
            </Header>
            <Body>
                {list.map(movie => (
                    <CardWrap onClick={()=>handleMovieClick(movie)}>
                        <MovieCard><Image src={movie.image}></Image></MovieCard>
                        <Details>
                            <Title>{movie.title}</Title>
                            <Subtitle>{movie.genre}</Subtitle>
                        </Details>
                        
                    </CardWrap>
                    
                ))}
            </Body>
        </Container>
    )
}
