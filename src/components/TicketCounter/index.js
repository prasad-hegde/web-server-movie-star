import { useState } from "react";
import styled from "styled-components";
import { colors } from "../../pallette";

const Container = styled.div`
display:flex;
flex-direction:column;
`
const Header = styled.div`
display:flex;
border-bottom: 1px solid;
margin-bottom: 0.5rem;
`
const Item = styled.div`
padding: 0 0.5rem;
margin: 0.5rem 0;
min-width:5rem;
`
const Row = styled.div`
display:flex;
margin: 0.5rem 0;
align-items: center;
`
const Chip = styled.div`
display:flex;
background: ${({inActive})=>inActive?colors.browny:colors.duskyRed};
padding: 0.2rem 0.5rem;
border-radius: 0.2rem;
font-weight: 700;
width: fit-content;
align-items:center;
flex-direction: column;
justify-content: center;
text-transform:uppercase;
transition:.2s ease;
cursor:pointer;
&:hover {background:${colors.duskyPink}`

const QuantityWrap = styled.div`
display: flex;
min-width:5rem;
justify-content: space-between;
padding: 0 0.5rem;
`
function Quantity({children,decrease,increase}) {
    return (
        <QuantityWrap>
            <Chip onClick={decrease}>-</Chip>
            {children}
            <Chip onClick={increase}>+</Chip>
        </QuantityWrap>
    )
}

export default function TicketCounter({onChange,priceTable}) {
  
    const [count, setCount] = useState({ adult: 0, child: 0, senior: 0 });

    function handleCountUpdate(ud,item) {
        const newCount = { ...count };
        newCount[item] = newCount[item] + ud;
        if (newCount[item] < 0) return;
        setCount(newCount);
        onChange(newCount);
    }
    return (
        <Container>
            <Header>
                <Item>Ticket</Item>
                <Item>Price</Item>
                <Item>Quantity</Item>
            </Header>
            <Row>
                <Item>Adult</Item>
                <Item>{'$' + priceTable.adult}</Item>
                <Quantity
                    decrease={() => handleCountUpdate(-1, 'adult')}
                    increase={()=> handleCountUpdate(1, 'adult')}
                >
                    <p>{count.adult}</p>
                </Quantity>
            </Row>
            <Row>
                <Item>Child</Item>
                <Item>{'$' + priceTable.child}</Item>
                <Quantity
                    decrease={() => handleCountUpdate(-1, 'child')}
                    increase={()=> handleCountUpdate(1, 'child')}
                >
                    <p>{count.child}</p>
                </Quantity>
            </Row>
            <Row>
                <Item>Senior</Item>
                <Item>{'$' + priceTable.senior}</Item>
                <Quantity
                    decrease={() => handleCountUpdate(-1, 'senior')}
                    increase={()=> handleCountUpdate(1, 'senior')}
                >
                    <p>{count.senior}</p>
                </Quantity>
            </Row>
        </Container>
    )
}