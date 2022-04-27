import styled from "styled-components";
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import { Icon } from "@mui/material";
import { colors } from "../pallette";

const copyRights1 = "Copyright 2022 © Star Entertainment Pvt. Ltd. All Rights Reserved";
const copyRights2="The content and images used on this site are copyright protected and copyrights vests with the respective owners. The usage of the content and images on this website is intended to promote the works and no endorsement of the artist shall be implied. Unauthorized use is prohibited and punishable by law."

const Container = styled.div`
padding: 1rem;
background: #6a343c52;
margin-top: 8rem;
box-shadow: 10px 28px 32px 21px #6a3339;
`
const Text = styled.div`
margin:0 0.5rem;
color:rgba(255, 255, 255, 0.3);
text-align:center;
`
const IconWrap = styled.div`
position:relative;
display:flex;
align-items: center;
margin: 1rem;
justify-content:center;
`
function Footer() {

    return (<Container>
        <IconWrap>
            <Text>Need Assistance in Booking? call</Text>
            <Icon color="disabled" style={{ cursor: 'pointer' }} component={SupportAgentIcon} fontSize="large" />
            <Text>(812)-803-5717</Text>
        </IconWrap>
        <Text>{copyRights1}</Text>
        <Text>{copyRights2}</Text>

    </Container>)
}
export default Footer;