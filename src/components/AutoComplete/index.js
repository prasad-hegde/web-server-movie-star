import { useEffect,useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { CircularProgress, FormHelperText } from '@mui/material';
import { FormElement } from '../../commonStyle';


export default function AutoComplete(props) {

  const { clearOnBlur, options, label, multiple = false,
    value, onChange, submitFlag = false, hasError = false,
    required = false, variant = 'outlined', freeSolo = false,loading=false,onInputChange=()=>'' } = props;
  
  const [error, setError] = useState(false);

  function validate() {
    if (!required) {
      return;
    }
    if (multiple) {
        setError(value.length < 1);
    } else {
        setError(!value)
    }
  }

  useEffect(() => {
    if (submitFlag) {
        validate();
    }
}, [submitFlag])

  useEffect(() => {
    if (hasError) {
      hasError(error);
  }
   
},[error])

  return (
    <FormElement style={{flexDirection:'column'}}>
      <Autocomplete
        id="combo-box-demo"
        options={options.map((option) => option.title)}
        fullWidth
        value={value}
        multiple={multiple}
        autoComplete
        limitTags={4}
        onChange={(_event,value)=>onChange(value)}
        renderInput={(params) =>
          <TextField variant={variant}
          {...params} label={label} 
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
         />}
        required={required}
        error={error}
        onBlur={() => validate()}
        freeSolo={freeSolo}
        clearOnBlur={clearOnBlur}
        onInputChange={(_event,inputVal)=>onInputChange((inputVal))}
      />
      <FormHelperText error={error}>{error?'This is a required field':''}</FormHelperText>
    </FormElement>
  );
}