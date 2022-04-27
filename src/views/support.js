import { useState } from "react";
import { FormElement } from "../commonStyle";
import AutoComplete from "../components/AutoComplete";
import Button from "../components/Button";
import styled from "styled-components";
import Ticket from "../components/Ticket";

const SearchWrap = styled.div`
flex:1;
width: 60%;
margin: auto;
`
const Container = styled.div`
display:flex;
flex-direction:column;
margin: 4rem 0;
`

export default function Support() {
    const [searchVal, setSearchVal] = useState('');
    const [bookingId, setBookingId] = useState('');
    function handleSearch() {
        setBookingId(searchVal);
    }

    
    return (
        <Container>
            <SearchWrap>
                <AutoComplete variant='outlined'
                    freeSolo label="Search Booking"
                    options={[]} onChange={(val) => ''}
                    value={searchVal}
                    onInputChange={(val)=>setSearchVal(val)}
                />
                <FormElement justifyContent="center">
                    <Button onClick={() => handleSearch()} label="Fetch Ticket" />
                </FormElement>
            </SearchWrap>
            {bookingId && <Ticket bookingId={bookingId}></Ticket>}
        </Container>        
    )
}