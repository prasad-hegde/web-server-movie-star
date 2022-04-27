import {useState } from "react"
import styled from "styled-components"
import ArrowIcon from "../../assets/icons/arrow"

const Container = styled.div`
display: flex;
width: 100%;
background: radial-gradient(#c53546,#c5354685);
`
const Nav = styled.div`
width:2rem;
cursor:pointer;
margin: 5px;
visibility: ${({visible})=>visible?'':'hidden'};
`
const Window = styled.div`
overflow: hidden;
width: 100%;
`
const Roll = styled.div`
display: flex;
transition: 1s cubic-bezier(0, 0, 0.2, 1);
transform:translateX(-${({page})=>page*100}%);
`
const Box = styled.div`
height:18rem;
display: flex;
border:1px solid;
margin:2rem 1rem;
flex-shrink: 0;
width: calc(50% - 2rem);
justify-content:center;
align-items:center;
background-image:url(${({ image }) => image});
background-size: contain;
background-repeat: round;
`
export default function Carousel({options=[]}) {

    const [page, setPage] = useState(0);
    
    function handleNav(inc) {
        setPage(page + inc);
    }
    return (
        <Container>
            {<Nav visible={page > 0} onClick={() => handleNav(-1)}>{<ArrowIcon/>}</Nav>}
            <Window>
                <Roll page={page}>
                    {options.map((item, i) =>
                        (<Box image={item.image}></Box>)
                    )}
                </Roll>
            </Window>
            {<Nav visible={(page + 1) < options.length / 2} onClick={() => handleNav(1)} >{<ArrowIcon direction="right"/>}</Nav>}
        </Container>
    )
}