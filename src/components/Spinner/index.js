import React from "react";
import styled from "styled-components";
import { css } from "@emotion/react";
import PuffLoader from "react-spinners/PuffLoader";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const Container = styled.div`
display: flex;
position:absolute;
top:0;
left:0;
right:0;
bottom:0;
align-items: center;
backdrop-filter: url(filters.svg#filter) blur(1px);
`

function Spinner({color,size=100,loading}) {

  return (
    <Container>  
      <PuffLoader color={color} loading={loading} css={override} size={size} />
    </Container>
    
  );
}

export default Spinner;
