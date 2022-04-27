import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import styled from "styled-components"
import SeatIcon from "../assets/icons/seat"
import Button from "../components/Button"
import {colors} from "../pallette"
import { fromAlphNum } from "../utils"
import { useDispatch, useSelector} from 'react-redux'
import { ACTIONS } from "../redux/actions"
import { getReservedSeats } from "../api"
import Spinner from "../components/Spinner"

const moment = require('moment');


const Canvas = styled.div`
width:100%;
height:100%
`
const Floor = styled.div`
display:flex;
flex-direction:column;
align-items: center;
font-size: calc(1vw + 1vh);
`
const Screen = styled.div`
background-color: ${colors.duskyRed};
width: ${({width})=>width*3}rem;
height: 0.5rem;
border-top-left-radius: 100%;
border-top-right-radius: 100%;
margin-bottom:5rem;
box-shadow:0px 26px 48px 9px ${colors.duskyRed};
`
const Row = styled.div`
display:flex;
align-items: center;
`
const RowTitle = styled.div`
margin: 1rem;
font-weight: 700;
`
const Box = styled.div`
width: ${({size})=>size&&size=='small'?'1.5rem':'2rem'};
height: ${({size})=>size&&size=='small'?'1.5rem':'2rem'};
padding: 0.5rem;
position:relative;
cursor:${({active})=>active?'pointer':''}
`
const SeatCount = styled.div`
left: 0;
right: 0;
bottom: 20%;
top:0;
position: absolute;
font-size: .6rem;
font-weight: 700;
display: flex;
align-items: center;
justify-content: center;
`

const SeatLegends = styled.div`
background:${colors.transBlack};
position:sticky;
display:flex;
justify-content:center;
bottom:0;
align-items: center;
`
const FloorWrap = styled.div`
`
const ButtonWrap = styled.div`
margin:1rem 5rem;
// position:absolute;
right:0;
`
const Seat = ({ state,onClick,value,size='' }) => {
    const colorCode = {
        '-1': colors.grey,
        '0': 'white',
        '1':colors.duskyRed
    }
    return (<Box size={size} onClick={onClick} active={state!==-1}>
        {state===1&&<SeatCount><p>{value}</p></SeatCount>}
        <SeatIcon color={colorCode[state.toString()]} />
    </Box>)
}

function SeatLayout({reserved}) {

    // 0 -> free
    // 1 -> selected
    // -1 -> reserved
   
    const params = useParams();

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const d = 16;
    const alpha = Array.from(Array(12)).map((_e, i) => i + 65);
    const alphabets = alpha.map((x) => String.fromCharCode(x));
    const seatMatrix = {};
    alphabets.forEach(a => {
        seatMatrix[a] = Array(d).fill(0);
    })
    reserved.forEach(res => {
        const [row, col] = fromAlphNum(res);
        seatMatrix[row][col-1] = -1;
    })
    const [layOut, setLayout] = useState(seatMatrix)
    const [seatCount, setSeatCount] = useState(0);

    function handleSelect(row,colIndex) {
        const tempLayout = { ...layOut };
        if (tempLayout[row][colIndex] === -1 ) {
            return;
        }
        if (params.count == seatCount && tempLayout[row][colIndex] != 1) {
            return;
        }

        tempLayout[row][colIndex] = Number(!tempLayout[row][colIndex]);
        const increment= Number(tempLayout[row][colIndex])===0?-1:1
        setSeatCount(seatCount+increment);
        setLayout(tempLayout);
    }

    function handleBook() {
        const payload = [];
        Object.keys(layOut).forEach(row => {
            layOut[row].forEach((status,index) => {
                if (status === 1) {
                    payload.push(row + (index + 1));
                }
            })
        })
        dispatch({ type: ACTIONS.SET_SEAT_DETAILS, payload });
        navigate('/book');
    }

    return (
        <FloorWrap>
            <Floor>
                <Screen width={layOut['A'].length-2}/>
                {Object.keys(layOut).map((row, i) => (
                    <Row key={i}>
                        <RowTitle>{row}</RowTitle>
                        {layOut[row].map((cellVal, j) =>
                            (<Seat key={j} state={cellVal} value={j+1} onClick={()=>handleSelect(row,j)}/>))}
                        <RowTitle>{row}</RowTitle>
                    </Row>
                ))}
            </Floor>
            <SeatLegends>
                {seatCount==params.count ?
                    (<ButtonWrap>
                        <Button label={`Book Tickets (${seatCount})`} onClick={handleBook} />
                    </ButtonWrap>) :
                (<>
                    <Seat state={1} size='small'/>
                    <RowTitle>Selected</RowTitle>
                    <Seat state={0} size='small'/>
                    <RowTitle>Available</RowTitle>
                    <Seat state={-1} size='small'/>
                    <RowTitle>Reserved</RowTitle>
                </>)
                }
                
            </SeatLegends>
        </FloorWrap>
    )
    
    
}

export default function SeatLayoutPage() {
    const [reserved, setReserved] = useState([]);
    const [loading, setLoading] = useState(false);
    const state = useSelector(state => state);

    useEffect(() => {
        setLoading(true);
        const payload = {
        "venue": state?.showDetails?.venue,
        "showTime":moment(state?.showDetails?.date + ' ' + state?.showDetails?.time, 'MM/DD/YYYY hh:mm A').format('MM-DD-YYYY HH:mm:ss'),
        "movieId":state?.showDetails?.movie_id,
        "location":state?.location
        }
        getReservedSeats(payload).then(res => {
            const resrvd = [];
            if (res.data&&res.data.length>0) {
                res.data.forEach(booking => {
                    resrvd.push(...booking.seatNo);
               })
            }
            setReserved(resrvd);
        })
        setTimeout(() => setLoading(false), 1000);
        
    }, [])
    if (loading) {
        return(<Spinner loading={loading} color={'white'} />)
    }
    return (<Canvas><SeatLayout reserved={reserved}/></Canvas>)
}