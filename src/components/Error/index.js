import styled from "styled-components";
import ErrorIcon from "../../assets/icons/error";

const Container = styled.div`
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
// flex:1
`
const ErrorIconWrap = styled.div`
flex:1;
width: 10rem;
height: 10rem;
`
const Text = styled.div`
font-size:1.5rem;
`
export default function Error(props) {
    
    const { msg = "Something went wrong, please try later" } = props;

    return (<Container>
        <ErrorIconWrap>
            <ErrorIcon></ErrorIcon>
        </ErrorIconWrap>
        <Text>{msg}</Text>
    </Container>)
}