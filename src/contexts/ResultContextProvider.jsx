import React, {createContext, useContext,useState} from 'react';

const ResultContext = createContext();
const baseURL= 'https://google-search3.p.rapidapi.com/api/v1';

export const ResultContextProvider = ({children}) =>{

    const [results,setResults] = useState([]);
    const [isLoading,setIsLoading]= useState(false);
    const [searchTerm,setSearchTerm]= useState('');

    const getResults = async(resultType)=>{

        setIsLoading(true);

        const response= await fetch(`${baseURL}${resultType}`,{
            method: 'GET',
            headers:{
                'x-user-agent': 'desktop',
                'x-proxy-location': 'US',
                'x-rapidapi-host': 'google-search3.p.rapidapi.com',
                'x-rapidapi-key': process.env.REACT_APP_API_KEY
            }
        });

        const data = await response.json();
        // console.log({resultType,data});
        if(resultType.includes('/news')){
            setResults( data.entries);
        }
        else if(resultType.includes('/images')){
            setResults( data.image_results);
        }
        else {
            setResults( data.results);
        }
        // setResults(data);
        setIsLoading(false);

    }

    return (
        <ResultContext.Provider value={{getResults, results, searchTerm, setSearchTerm, isLoading}}>
            {children}
            </ResultContext.Provider>
    );
}

export const useResultContext= () => useContext(ResultContext);


