import {useParams,useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FormElement, MovieCard } from "../commonStyle";
import { movieDetails } from "../mock";
import { colors } from "../pallette";
import Button from "./Button";
import useFetch from "../hooks/useFetch";
import { getAmovie } from "../api";
import Spinner from "./Spinner";

export const OneCard = ({data}) => {
    const CardHolder = styled.div`
    height: 25rem;
    width: 18rem;
    z-index:1;
    `
    const Container = styled.div`
    display:flex;
    position:relative;
    padding: 0 2.5rem;
    // background-size: cover;
    // background-position-y: -100%;
    // background-image:linear-gradient(#eb01a500,#eb01a500,#10242f),url(${data.image});
    `
    const Backgrond = styled.div`
    position:absolute;
    top:0;
    bottom:0;
    left:0;
    right:0;
    filter: blur(5px);
    background-size: cover;
    background-position-y: -100%;
    background-image:linear-gradient(#eb01a500,#eb01a500,#10242f),url(${data.image});
    `
    const DetailsWrap = styled.div`
    display:flex;
    flex-direction: column;
    margin: 1rem;
    padding: 1.5rem 0;
    flex: 1;
    z-index: 1;
    `
    const Title = styled.div`
    font-size:2rem;
    font-weight: 700;
    `
    const Details = styled.div`
    display:flex;
    flex-direction: column;
    padding-bottom:5rem;
    `
    const Chip = styled.div`
    display:flex;
    background: ${colors.duskyRed};
    padding: 0.2rem 0.5rem;
    margin: 0.5rem 0;
    border-radius: 0.2rem;
    font-weight: 700;
    width: fit-content;
    text-transform:uppercase;
    `
    const Plain = styled.div`
    margin: 0.5rem 0;
    `
    const Image = styled.img`
    width: 100%;
    height: 100%;
    `
    const navigate = useNavigate();
    return (
        <Container>
            <Backgrond></Backgrond>
            <CardHolder>
                <MovieCard fullHeight><Image src={data.image}/></MovieCard>
            </CardHolder>   
            <DetailsWrap>
                <Title>{data.title}</Title>
                <Details>
                    <Chip>{data.language}</Chip>
                    <Chip>{data.type}</Chip>
                    <Plain>{`${data.runtime} ☉ ${movieDetails.genre}`}</Plain>
                </Details>
                <FormElement>
                    <Button label="Book Tickets" position="end" onClick={()=>navigate(`/movies/select-show/${data.movie_id}`)}/>
                </FormElement>
            </DetailsWrap>
        </Container>
    )
}
export default function MoviePreview() {
    let params = useParams();
    const Container = styled.div`
    display:flex;
    flex-direction: column;
    `
    const About = styled.div`
    display:flex;
    flex-direction:column;
    padding:0 3.5rem;
    `
    const Title = styled.div`
    font-size:1.5rem;
    font-weight: 700;
    padding: 1rem 0;
    `
    const Details = styled.div`
    
    `

    const { data: movieDetails, loading, error } = useFetch(getAmovie(params.movieId));

    if (loading) return <Spinner  color={'white'}></Spinner>;
    return (
        <Container>
            <OneCard data={movieDetails}></OneCard>
            <About>
                <Title>About the movie</Title>
                <Details>{movieDetails.synopsis}</Details>
            </About>
        </Container>
    )
}