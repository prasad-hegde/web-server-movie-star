import styled from "styled-components"
import {fetchBookingById } from "../../api"
import useFetch from "../../hooks/useFetch"
import Spinner from "../Spinner"
import QRCode from "react-qr-code";
import GenericPdfDownloader from "../downloadPDF";
import Error from "../Error";


const Container = styled.div`
display:flex;
flex-direction:column;
width: 23rem;
padding: 1rem;
margin: auto;
position:relative;
overflow: hidden;
flex-direction: column-reverse;
`
const Title = styled.div`
font-size: 1.5rem;
padding:0.5rem 1rem;
text-align:center;

`

const Image = styled.img`
width: 100%;
height: 100%;
`

const Item = styled.div`
display:flex;
padding:0.5rem 1rem;
margin:0.5rem 0;
flex-wrap: wrap;
font-weight: 700;
justify-content: space-between;`

const Text = styled.div`
`
const QRContainer = styled.div`
background: white;
padding: 0.5rem;
margin:1rem auto;
`

const Backgrond = styled.div`
position:absolute;
top:0;
bottom:0;
left:0;
right:0;
filter: blur(5px);
background-size: cover;
z-index:-2;

background-image:linear-gradient(#112530,#11253008,#112530),url(${({ image }) => image && image});
// background:black;
`
const moment = require('moment');

export default function Ticket({bookingId}) {
    const { data: ticketData, loading, error } = useFetch(fetchBookingById(bookingId));
    const thisTicket = ticketData;

    if (loading) {
        return(<Spinner loading={loading} color={'white'} />)
    }
    const movieTitle = thisTicket?.movie?.title;
    const moviePoster = thisTicket?.movie?.image;
    const venue = thisTicket?.booking?.venue;
    const location = thisTicket?.booking?.location;
    const time = moment(thisTicket?.booking?.showTime).format('MMMM Do YYYY, h:mm:ss a');
    const seats = thisTicket?.booking?.seatNo;
    const seatTotal = thisTicket?.booking?.seatTotal;

    if (error) {
        return (<Container id="ticket" >
            <Error msg={'No Record Found'}></Error>
        </Container>);
    }

    return (
        <>
        <Container id="ticket" >
            <Backgrond image={moviePoster}></Backgrond>
            <Title>{movieTitle}</Title>
            <QRContainer>
                <QRCode size="125" value="https://webserver-movie-star.herokuapp.com" /></QRContainer>
            <Item>
                <Text>Venue</Text>
                <Text>{venue}</Text>
            </Item>
            <Item>
                <Text>Location</Text>
                <Text>{location}</Text>
            </Item>
            <Item>
                <Text>Show Time</Text>
                <Text>{time}</Text>
            </Item>
            <Item>
                <Text>Total Seats</Text>
                <Text>{seatTotal}</Text>
            </Item>
            <Item>
                <Text>Seat Number</Text>
                <Text>{seats?.join(',')}</Text>
            </Item>
        </Container>
            <GenericPdfDownloader rootElementId={'ticket'} downloadFileName="ticket"></GenericPdfDownloader>
        </>
            

    )
}