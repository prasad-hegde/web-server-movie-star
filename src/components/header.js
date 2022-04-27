// import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import {ReactSession} from 'react-client-session';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Logo from '../assets/icons/logo';
import { popularLocations } from '../mock';
import { ACTIONS } from '../redux/actions';
import SimpleSelect from './Select';
import AutoComplete from './AutoComplete';
import { FormElement } from '../commonStyle';
import { searchMovie } from '../api';
import SignUp from './signup';
import { Dialog  } from '@mui/material';
import Button from './Button';
import ProfileMini from './ProfileMini';

const LogContainer = styled.div`
display:flex;
margin: 0 2rem;
width: 6rem;
cursor:pointer;
align-items:center;
`

const Container = styled.div`
display:flex;
height:4.5rem;
margin: 1em 1rem;
align-items:center;
`
const SearchWrap = styled.div`
flex:1;
// margin:0 2rem;
`
const SelectWrap = styled.div`
margin:0 1rem;
`
export default function Header() {
    let navigate = useNavigate();
    const [location, setLocation] = useState(ReactSession.get('location')||popularLocations[0]?.title);
    const [searchOptions, setSearchOptions] = useState([]);
    const [loadingSearch, setSearchLoading] = useState(false);
    const [formOpen, setFormOpen] = useState(!ReactSession.get('user')?.email);
    const [user, setUser] = useState(ReactSession.get('user')?.email);
    const dispatch = useDispatch();
    
    useEffect(() => {
        if (!ReactSession.get('user')?.email) {
            setFormOpen(true);
        }
    },[ReactSession.get('user')?.email])
    function onLocationChange(val) {
        setLocation(val);
    }

    function onSearchSelect(val) {
        const selectedMovie = searchOptions.find(item => item.title === val);
        if (selectedMovie) {
            navigate(`/movies/${selectedMovie.id}`);
        }
    }
    function handleSearch(val) {
        if (!val) return;
        setSearchLoading(true);
        try {
            searchMovie(val).then(res => {
                if (res.data) {
                    const movieResult = res.data.map(item => ({ id: item.movie_id, title: item.title }));
                    setSearchOptions(movieResult);
                }
            }).catch(_error => {
                setSearchOptions([]);
            })
        } catch {
            setSearchOptions([]);
        }
        
        setSearchLoading(false);
    }

    useEffect(() => {
        dispatch({ type: ACTIONS.SET_LOCATION, payload: location });
        ReactSession.set('location', location);
    }, [location])

    useEffect(() => {
       setUser(ReactSession.get('user')?.email)
    },[ReactSession.get('user')])

    function handleLogout() {
        setUser(ReactSession.set('user', ''));
        navigate('/');
   }
    
    return (
        <Container>
            <Dialog onClose={() => setFormOpen(false)} open={formOpen}>
                <SignUp onComplete={()=>setFormOpen(false)}/>
            </Dialog>
            <LogContainer onClick={()=>navigate('/')}>
                <Logo />
            </LogContainer>
            <SearchWrap>
                <AutoComplete variant='outlined'
                    freeSolo label="Search" value={''}
                    options={searchOptions} onChange={(val) => onSearchSelect(val)}
                    clearOnBlur
                    loading={loadingSearch}
                    onInputChange={handleSearch}
                />
            </SearchWrap>
            <SelectWrap>
                <SimpleSelect options={popularLocations.map(item => item.title)}
                    value={location} label="Location" onChange={val => onLocationChange(val)}
                ></SimpleSelect>
            </SelectWrap>
            <FormElement>
                {user ?
                    <ProfileMini onLogout={()=>handleLogout()}></ProfileMini>:
                <Button onClick={() => setFormOpen(true)} label="Login" />
            }
            </FormElement>
        </Container>
    );
}