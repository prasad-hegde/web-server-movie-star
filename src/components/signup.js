import { useState } from "react";
import {ReactSession} from 'react-client-session';
import { useDispatch } from "react-redux";
import styled from "styled-components"
import { login, signup } from "../api";
import { FormElement, Link } from "../commonStyle";
import Button from "./Button";
import TextArea from "./TextArea";



const Section = styled.div`
display: flex;
flex-direction:column;
padding: 1rem 3.5rem 2rem 3.5rem;

`
const Title = styled.div`
font-size:${({small})=>small?'1.5rem':'2rem'};
font-weight: 700;
margin-bottom:0.5rem;
`
const Form = styled.div`
display:flex;
flex-direction:column;
min-width:20vw;
`
const Flex = styled.div`
display:flex;
justify-content:center;
`

export default function SignUp({onComplete}) {
    // 0 - signIn 
    // 1 - signup
    
    const [mode, setMode] = useState(0);
    const [firstName, setFName] = useState('');
    const [lastName, setLName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [formError, setFormError] = useState({ login: [0, 0], signup: [0, 0, 0], error: false });
    const [submit, setSubmit] = useState(false);
    const dispatch = useDispatch();

    function handleFormError(err, index) {
        
        function isAllTrue(list) {
            return Boolean(list.find(item=>item));
        }
        if (!mode) {// login
            const state = [...formError.login];
            state[index] = Number(err);
            setFormError({ ...formError, login:state,error:isAllTrue(state)});
        } else {
            const state = [...formError.signup];
            state[index] = Number(err);
            setFormError({ ...formError, signup:state,error:isAllTrue(state)});
        }
    }
    function onConfirm() {
        setSubmit(true);
        if (mode) {
            const payload = {
                firstname: firstName,
                lastname: lastName,
                email,
                password,
                mobilenumber:phone
            }
            signup(payload).then(res => {
                console.log(res);
            })
            setMode(0);
        } else {
            // login
            const payload = {
                email,
                password,
            }
            if (!email || !password) return;
            login(payload).then(res => {
                if (res.data && res.data.email) {
                    const { firstname, lastname, email,role } = res.data;
                    const userDetails = {
                        firstname,
                        lastname,
                        email,
                        role,
                        mobilenumber:''
                    }
                    ReactSession.set('user', userDetails);
                    onComplete();
                }
            })
        }
    }

    return (
        <Section>
            <Title small style={{ padding: '0.5rem',margin:'auto' }}>Sign Up/Login</Title>
            <Form>
                {
                    !mode ? <>
                        <TextArea submitFlag={submit} label="Email" hasError={(eb) => handleFormError(eb, 0)} value={email} required format={'email'} onChange={(val) => setEmail(val)} />
                        <TextArea submitFlag={submit} label="Password" type="password" hasError={(eb)=>handleFormError(eb,1)} value={password} required onChange={(val)=>setPassword(val)}/>
                    </>
                :
                    <>
                        <TextArea submitFlag={submit} label="First Name" hasError={(eb) => handleFormError(eb, 0)} value={firstName} required onChange={(val) => setFName(val)} />
                        <TextArea submitFlag={submit} label="Last Name" hasError={(eb) => handleFormError(eb, 0)} value={lastName} required onChange={(val) => setLName(val)} />
                        <TextArea submitFlag={submit} label="Email" hasError={(eb) => handleFormError(eb, 0)} value={email} required format={'email'} onChange={(val) => setEmail(val)} />
                        <TextArea submitFlag={submit} label="Password" type="password" hasError={(eb) => handleFormError(eb, 1)} value={password} required onChange={(val) => setPassword(val)} />
                        <TextArea submitFlag={submit} label="Phone" hasError={(eb)=>handleFormError(eb,1)} value={phone} onChange={(val)=>setPhone(val)}/>
                        
                    </>
                }
            </Form>
            <FormElement justifyContent='end'>
                <Button fullWidth={true} disabled={false} label={mode===0?"Login":"Sign Up"} position="end" onClick={onConfirm}/>
            </FormElement>
            <Flex>
                {mode ? 'Already have an account?' : 'New to Movie-Star?'}
                <Link onClick={() => setMode(Number(!mode))}>{mode?'Login':'Create an account'}</Link></Flex>
        </Section>
    )
}