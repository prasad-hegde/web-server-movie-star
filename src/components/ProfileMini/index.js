import styled from "@emotion/styled";
import { Icon } from "@mui/material";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import Button from "../Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "../../commonStyle";
import { colors } from "../../pallette";
import useRole from "../../hooks/useRole";

const Container = styled.div`
display:flex;
flex-direction:column;
`
const IconWrap = styled.div`
position:relative;
`
const Popup = styled.div`
position: absolute;
padding: 1rem 1rem;
top: 29px;
left: 0;
transform:${({ visible }) => visible ? 'translateX(-67%)  scale(1)' :
        'translateX(-40%) scale(0)'};
transform-origin:top;
background: ${colors.mattBlack};
z-index: 2;
min-width: 12rem;
display: flex;
transition: .2s ease;
box-shadow: -11px 13px 3px -9px ${colors.mattBlack};
align-items: center;
flex-direction: column;
&:after {
    content: '';
    position: absolute;
    right: 35px;
    top: -15px;
    width: 0;
    height: 0;
    border-left: 20px solid transparent;
    border-right: 20px solid transparent;
    border-bottom: 20px solid ${colors.mattBlack};
    clear: both;
}
`
const SLink = styled(Link)`
padding: 0 0.5rem;
margin: 1rem 0;
color:white;
text-align: center;`

export default function ProfileMini({onLogout }) {
    const [popupActive, setPopup] = useState(false);
    const myRole = useRole();
    const navigate = useNavigate();
    document.body.addEventListener('click',()=> setPopup(false), true); 
    return (<Container>
        <IconWrap>
            <Icon style={{cursor:'pointer'}} component={AccountBoxIcon} fontSize="large" onClick={() => setPopup(!popupActive)} />
            <Popup visible={popupActive}>
                {myRole === 'admin' && <SLink onClick={() => navigate('/publish')}>{'Publish Movies'}</SLink>}
                {(myRole === 'support'||myRole === 'admin') && <SLink onClick={() => navigate('/support')}>{'Support Tools'}</SLink>}
                <SLink onClick={() =>navigate('/profile')}>{'Profile & Bookings'}</SLink>
                <Button onClick={onLogout} label="Logout" />
            </Popup>
        </IconWrap>
    </Container>)

}