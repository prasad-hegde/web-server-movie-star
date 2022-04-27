//useFetch.js
import { useState, useEffect } from 'react';
import axios from 'axios';

function useFetch(url,refreshOn=[]) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios.get(url)
            .then(res => {
                setLoading(false);
                //checking for multiple responses for more flexibility 
                //with the url we send in.
                res.data && setData(res.data);
            })
            .catch(err => {
                setLoading(false)
                setError(true)
            })
    }, [url,...refreshOn])

    return { data, loading, error }
}
export default useFetch;