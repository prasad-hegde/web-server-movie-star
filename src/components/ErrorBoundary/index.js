import React from "react";
import { useNavigate } from "react-router-dom";
import { FormElement } from "../../commonStyle";
import Confirmation from "../../views/confirmation";
import Button from "../Button";
import styled from "styled-components";


const Container = styled.div`
width:100%;
height:100%;
display:flex;
flex-direction:column;
align-items: center;
color:white;
justify-content: center;
`

function ErrorPage({ onResolve }) {

    function onDashboard() {
        navigate('/');
        onResolve();
    }
    const navigate = useNavigate();
    return(<Confirmation message="Something went wrong">
                <FormElement>
                    <Button label={'Go to Dashboard'} onClick={onDashboard}></Button>
                </FormElement>
 </Confirmation>)
}

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { error: null, errorInfo: null };
        this.resolveError = this.resolveError.bind(this);
    }
    
    componentDidCatch(error, errorInfo) {
      // Catch errors in any components below and re-render with error message
      this.setState({
        error: error,
        errorInfo: errorInfo
      })
      // You can also log error messages to an error reporting service here
    }
    resolveError() {
        this.setState({
            error: null,
            errorInfo: null
          })
    }
    render() {
      if (this.state.errorInfo) {
        // Error path
          return (
            <Container>
                <ErrorPage onResolve={this.resolveError}></ErrorPage>
            </Container>
            
        );
      }
      // Normally, just render children
      return this.props.children;
    }  
  }

export default ErrorBoundary;