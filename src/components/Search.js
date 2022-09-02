import {useEffect, useState} from 'react';
import axios from 'axios';
import Result from './Result';
import SearchIcon from '@mui/icons-material/Search';

function Search() {
    const [results, setResults] = useState([]);
    const [suggestions, setSuggestions] = useState([]);

    useEffect(()=>{
        const loadResults = async()=>{
            const response = await axios.get('https://reqres.in/api/users');
            setResults(response.data.data);
            setSuggestions(response.data.data);
        }
        loadResults();
    }, [])

    const onChangeHandler = (text) =>{
        const res = results.filter(result => result.email.toLowerCase().indexOf(text.toLowerCase()) !== -1);
        setSuggestions(res)
    }

    return (
        
        <div className='container'>
        <div className='search-bar'>
        <input type="text" className='col-md-12' style={{marginTop: 10}}
        onChange={e=>onChangeHandler(e.target.value)}
        />
        <div className='search-icon'><SearchIcon /></div>
        </div>
        
        {suggestions.map(
            (suggest, i)=>
            <Result key={i} email={suggest.email} />
        )}
        
        </div>
     );
}

export default Search;