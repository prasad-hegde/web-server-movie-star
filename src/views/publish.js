import AutoComplete from "../components/AutoComplete";
import styled from "styled-components";
import { dimensions, languages, popularLocations, theatreChains } from "../mock";
import TextArea from "../components/TextArea";
import Chips from "../components/Chips";
import { FormElement } from "../commonStyle";
import Button from "../components/Button";
import { useState } from "react";
import Confirmation from "./confirmation";
import Spinner from "../components/Spinner";
import Fade from '@mui/material/Fade';
import { publishMovie } from "../api";
import UploadImage from "../components/UploadImage";
import useRole from "../hooks/useRole";
import { useNavigate } from "react-router-dom";


const RowFlex = styled.div`
display: flex;
flex-direction: column;
flex:1;
`
const Container=styled(RowFlex)`
margin: 0px 3.5rem;
width: ${({ fullWidth }) => fullWidth ? '' : '40%'};
`
const AnimateContainer = (props) => <Fade in={true} out={true} style={{ transitionDelay:  '200ms' }} ><Container {...props} /></Fade>


const FormWrap = styled(RowFlex)`
margin-bottom: 10rem;
`
const Title = styled.div`
font-size: 24px;
font-weight: 700;
margin: 2rem 0;
`
export default function Publish() {

    const [name, setName] = useState('');
    const [synopsis, setSynopsis] = useState('');
    const [language, setLang] = useState('');
    const [dimension, setDimension] = useState('');
    const [runTime, setRuntime] = useState('');
    const [genre, setGenre] = useState('');
    const [locations, setLocations] = useState([]);
    const [theatres, setTheatres] = useState([]);
    const [publishing, setPublishing] = useState(false);
    const [published, setPublished] = useState(false);
    const [loading, setLoading] = useState(false);
    const [publishError, setPublishError] = useState({ error: false, msg: '' });

    const [hasError, setError] = useState(Array(8).fill(false));
    const [imageUrl, setImageUrl] = useState('');
    
    const navigate = useNavigate();

    const role = useRole();

    // const hasError = useSelector((state) => state.publishError);

    function onPublish() {

        const payload = {
            title:name,
            synopsis,
            language,
            type:dimension,
            runtime:runTime,
            genre,
            locations,
            theatres,
            image:imageUrl
        }
        setPublishing(true);
        if (!hasError.includes(true)) {
            console.log(payload);
             // suceess 
            setLoading(true);
            publishMovie(payload).then(_response => {
                setPublished(true);
            }).catch(_error => {
                setPublishError({ error: true, msg: 'Something went wrong. Please try again.' });
            })
            setLoading(false);
        }
       
    }

    function handleFormError(err, index) {
        const temp = [...hasError];
        temp[index] = err;
        setError(temp);
        setPublishing(false);
    }

    function handlePublishNew() {
        setPublished(false);
        setPublishError(false);
        setPublishing(false);
        setName('');
        setSynopsis('');
        setGenre('');
        setLang('');
        setDimension('');
        setLocations([]);
        setRuntime('');
        setTheatres([]);
    }
    function renderForm() {
        return (
            <FormWrap>
            <TextArea label="Movie Name" submitFlag={publishing} hasError={(eb)=>handleFormError(eb,0)} value={name} required onChange={(val)=>setName(val)}/>
            <TextArea label="Synopsis" submitFlag={publishing} hasError={(eb)=>handleFormError(eb,1)} value={synopsis}  multiline required onChange={(val)=>setSynopsis(val)}/>
            <Chips options={languages} submitFlag={publishing} required hasError={(eb)=>handleFormError(eb,2)} onChange={(val)=>setLang(val)}/>
            <Chips options={dimensions} submitFlag={publishing} required hasError={(eb)=>handleFormError(eb,3)} onChange={(val)=>setDimension(val)} />
            <TextArea label="Run Time"  submitFlag={publishing} hasError={(eb)=>handleFormError(eb,4)} value={runTime} format="hhmm" required onChange={(val)=>setRuntime(val)}/>
            <TextArea label="Genre" submitFlag={publishing} hasError={(eb)=>handleFormError(eb,5)} value={genre} multiline  onChange={(val)=>setGenre(val)}/>
            <AutoComplete required submitFlag={publishing} hasError={(eb)=>handleFormError(eb,6)}  label="Locations" value={locations} options={popularLocations} multiple={true} onChange={(val)=>setLocations(val)} />
            <AutoComplete required submitFlag={publishing} hasError={(eb) => handleFormError(eb, 7)} label="Theatres" value={theatres} options={theatreChains} multiple={true} onChange={(val) => setTheatres(val)} />
            <UploadImage OnUpload={(dataUrl)=>setImageUrl(dataUrl)}></UploadImage>
            <FormElement justifyContent="flex-end">
                    <Button label="Publish" position="end" disabled={hasError.find(item=>item)} onClick={onPublish}/>
            </FormElement>
        </FormWrap>
        )
    }

    if (loading) return <Spinner loading={loading} color={'white'} /> 

    if (role!=='admin') {
        return (
            <Confirmation error message="Unauthorised">
                <FormElement>
                    <Button label={'Go to Dashboard'} onClick={()=>navigate('/')}></Button>
                </FormElement>
            </Confirmation>)
    }
    
    if (publishError.error) {
        return (
            <AnimateContainer fullWidth>
                <Confirmation message={publishError.msg}>
                    <Button label="Try Again" onClick={()=>handlePublishNew()}/>
                </Confirmation>
            </AnimateContainer>
        ) 
    }
    
    if (published) {
        return (
            <AnimateContainer fullWidth>
                <Confirmation message="The Movie is published successfully">
                    <Button label="Publish New" onClick={()=>handlePublishNew()}/>
                </Confirmation>
            </AnimateContainer>
        ) 
    }
    return (
        <AnimateContainer>
            <Title>Publish Movie</Title>
            {renderForm()}
        </AnimateContainer>
    ) 
    
}