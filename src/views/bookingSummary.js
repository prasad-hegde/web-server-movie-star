import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";

import styled from "styled-components"
import { book, fetchBooking } from "../api";
import { FormElement } from "../commonStyle";
import Button from "../components/Button";
import { colors } from "../pallette";
import { ReactSession } from 'react-client-session';
import { useState } from "react";
import TextArea from "../components/TextArea";
import Confirmation from "./confirmation";
import Spinner from "../components/Spinner";
import Ticket from "../components/Ticket";
import Payment from "../components/Payment"
import { sendEmail } from "../utils";
import { ACTIONS } from "../redux/actions";
import useFetch from "../hooks/useFetch";


const Container = styled.div`
display:flex;
flex-direction:column;
padding: 1rem 2.5rem;
margin: 1rem 0;
align-self: center;
min-width: 50vw;
`

const Title = styled.div`
font-size:1.5rem;
font-weight:700;
margin: 1rem 0;
padding: 1rem;
background:${colors.browny};
`;

const Text = styled.div`

`
const Item = styled.div`
display:flex;
padding:0.5rem 1rem;
margin:0.5rem 0;
flex-wrap: wrap;
justify-content: space-between;
${({bordered})=>bordered&&`border-bottom:1px solid #ffffff3b;border-top:1px solid #ffffff3b;`}
`
const moment = require('moment');
export default function BookingSummary() {
    const state = useSelector((state) => state);
    const { seatDetails, showDetails, ticketCount, location } = state;
    const [guestEmail, setGuestEmail] = useState('');
    const userDetails = ReactSession.get('user');
    const [checkoutState, setCheckoutState] = useState(!userDetails?.email);
    const [bookingError, setBookingError] = useState(false);
    const [showConfirmation, setShowConfrimation] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showTicket, setShowTicket] = useState(false);
    const [showPayment, setShowPayment] = useState(false);
    const [ticketDetails, setTicketDetails] = useState('');
    const [discount, setDiscount] = useState(0);
    const [promo, setPromo] = useState('');
    const [promoDisabled, setPromoDisable] = useState(false);
    const { data: bookingHistory, loading: userStatusLoading, error } = useFetch(fetchBooking(userDetails?.email));
    const [promoError, setPromoError] = useState(false);


    const navigate = useNavigate();
    const dispatch = useDispatch();
 
    function handleCheckout() {
        const payload = { ...ticketCount, total: {...ticketCount.total,subTotal:ticketCount?.total?.subTotal-discount}};
        dispatch({ type: ACTIONS.SET_TICKET_COUNT, payload });
        setShowPayment(true);
    }


    function validatePromo() {
        if (promo?.toLocaleLowerCase() == 'newuser' && bookingHistory.length<=0) {
            setDiscount(ticketCount?.total?.subTotal * 0.15);
            setPromoDisable(true)
        } else {
            setPromoError(true);
            setPromo('');
        }
        //clear
        if(promoDisabled){
            setDiscount(0);
            setPromo('');
            setPromoDisable(!promoDisabled);
        }
    }
    window.addEventListener("storage",(_e) => {
        setCheckoutState(!userDetails?.email);
     });
    
    function confirmBooking() {
        const { adult, child, senior } = ticketCount?.ticketCount;
        const dateTime = moment(showDetails?.date + ' ' + showDetails?.time, 'MM/DD/YYYY hh:mm A');
        const payload = {
            movieId:showDetails?.movie_id,
            seatTotal:ticketCount?.total?.item,
            totalPrice:ticketCount?.total?.subTotal,
            seatNo: seatDetails,
            seatType:[adult,child,senior],
            showTime: dateTime.format('MM-DD-YYYY HH:mm:ss'),
            userId: '',
            email:userDetails?.email || guestEmail,
            venue: showDetails?.venue,
            location

        }
        setLoading(true);
        book(payload).then(res => {
            if (res) {
                if (res.data) {
                    setTicketDetails(res.data);
                }
            }
            setBookingError(false);
            setShowConfrimation(true);
            setShowPayment(false);
            sendEmail({ email: userDetails.email, name: userDetails.firstname + ' ' + userDetails.lastname },{...res.data,movieName:showDetails.title})().then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
        }).catch(e =>
            {setShowConfrimation(true);
            setBookingError(true)});
        setLoading(false);
    }

    function handleFormError(error) {
        setCheckoutState(error);
    }

    function afterConfirm() {
        if (bookingError) {
            setBookingError(false);
            setShowConfrimation(false);
        } else {
            setBookingError(false);
            setShowConfrimation(false);
            setShowTicket(true);
        }
    }
    function onPayment() {
        confirmBooking();
    }
    const confrimMessage = bookingError ? 'Something went wrong :(' : 'Booking Confirmed';

    if (loading) {
        return(<Spinner loading={loading} color={'white'} />)
    }

    if (showTicket) {
        return (
                <Ticket bookingId={ticketDetails?.bookingId}></Ticket>
        )
    }
    if (showPayment) {
        return (<Payment allowCash={userDetails?.role==='support'} amount={ticketCount?.total?.subTotal} onPayment={onPayment} />);
    }

    return (
        <>
            {showConfirmation ? <Confirmation message={confrimMessage} error={bookingError}>
            <FormElement justifyContent='end'>
                <Button fullWidth={true} disabled={checkoutState} label={bookingError?'Try Again':'View Ticket'} position="center" onClick={afterConfirm}/>
            </FormElement>
            </Confirmation> :
            (<Container>
            <Title>Booking Summary</Title>
            <Item>
                <Text>Seats</Text>
                <Text>{seatDetails.join(', ')}</Text>
            </Item>
            <Item>
                <Text>Venue</Text>
                <Text>{showDetails.venue}</Text>
            </Item>
            <Item>
                <Text>{'Time & Date'}</Text>
                <Text>{showDetails.date+' '+showDetails.time}</Text>
            </Item>
            {Object.keys(ticketCount?.ticketCount).map(item => (
                <Item>
                    <Text>{item}</Text>
                    <Text>{ticketCount?.ticketCount[item]}</Text>
                </Item>
            ))}
            <Item>
                <Text>{'Sub-Total'}</Text>
                <Text>{ticketCount?.total?.subTotal+'$'}</Text>
            </Item>
            {discount>0 &&
                <Item>
                    <Text>{'Discount'}</Text>
                    <Text>{'-'+discount}</Text>
                </Item>
            }
            <Item bordered>
                <Text>{`Total (${ticketCount?.total?.item})`}</Text>
                <Text>{ticketCount?.total?.subTotal-discount+'$'}</Text>
            </Item>
            {!userDetails?.email && <TextArea label="Email" hasError={(eb) => handleFormError(eb, 0)} value={guestEmail} required format={'email'} onChange={(val) => setGuestEmail(val)} />}
            {/* <FormElement justifyContent='space-between'> */}
                <TextArea disabled={promoDisabled} onChange={(val) => setPromo(val)} value={promo} label="Promo Code" hasError={(eb) => ''}></TextArea>
                {promoError&&<Text>Invalid Promo Code</Text>}
                <FormElement justifyContent='flex-end'>
                    <Button  label={promoDisabled?'Remove':'Apply'} position="center" onClick={() => validatePromo()} />
                </FormElement>
            {/* </FormElement> */}
            <FormElement  justifyContent='end'>
                <Button fullWidth={true} disabled={checkoutState} label={'Checkout'} position="center" onClick={()=>handleCheckout()}/>
            </FormElement>

        </Container>
    )
            }
        </>
    )
}