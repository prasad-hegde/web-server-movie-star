import styled from "styled-components";
import useScrollPercentage from "../../hooks/useScrollPercentage";

const Container = styled.div`
flex-grow: 1;
overflow-y: auto;
::-webkit-scrollbar {
    width: 0;  /* Remove scrollbar space */
    background: transparent;  /* Optional: just make scrollbar invisible */
}
`
const OutBox = styled.div`
height:4px;
position:absolute;
display:flex;
right: 0;
left:0;
bottom:0;
opacity:${({ progress }) => ((progress )/ 100)};
background: white;
filter: blur(12px);
`
export const ScrollContainer = ({ children }) => {
const [scrollRef, scrollPercentage] = useScrollPercentage();
    
    return (
        <Container ref={scrollRef}>
        <OutBox progress={scrollPercentage}>
        </OutBox>
            {children}
        </Container>
    )
}