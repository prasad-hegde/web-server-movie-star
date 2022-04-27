import styled from "styled-components"
import { ReactSession } from 'react-client-session';
import userImage from '../assets/images/user.svg';
import { colors } from "../pallette";
import BookingList from "./BookingList";
const Container = styled.div`
display:flex;
flex-direction:column;
margin: 2rem 0px;
`
const Header = styled.div`
display:flex;
padding: 1rem 3rem;
background:${colors.transBlack};
align-items: center;
`
const LargeText = styled.div`
font-size:${({ fontSize }) => fontSize && fontSize};
font-size: 3rem;
text-transform: capitalize;
font-weight:200;
padding:0 1rem;
`
const MediumText = styled.div`
font-size:${({ fontSize }) => fontSize && fontSize};
font-size: 1rem;
font-weight:200;
`
const Item = styled.div`
display:flex;
margin: 1rem 0;
`
const SubHeader = styled.div`
background:${colors.browny};
padding: 0 3rem;
`
const Body = styled.div`
padding:2rem;
`
export default function Profile() {

    const userDetails = ReactSession.get('user');
    return (
        <Container>
            <Header>
                <img style={{width:'5rem',height:'5rem'}} src={userImage} alt="user image"/>
                <LargeText>{userDetails?.firstname+' '+userDetails?.lastname}</LargeText>
            </Header>
            <SubHeader>
                <Item>
                    <MediumText>{'Email: '+userDetails?.email}</MediumText>
                </Item>
                <Item>
                    <MediumText>{'Phone: '+userDetails?.mobilenumber}</MediumText>
                </Item>
            </SubHeader>
            <Body>
                <LargeText>My Bookings</LargeText>
                <BookingList email={userDetails?.email}></BookingList>
            </Body>
        </Container>
    )
}