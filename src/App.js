import React, { useState, useEffect } from 'react'
import './App.css';
import AbilityList from './AbilityList';
import axios from 'axios';
import Pagination from './Pagination';

function App() {
  const [ability, setAbility] = useState(["stench","speed-boost"])
  const [currentPageUrl, setCurrentPageUrl] = useState("https://pokeapi.co/api/v2/ability/")
  const [nextPageUrl,setNextPageUrl] = useState()
  const [prevPageUrl,setPrevPageUrl] = useState()

  const [loading, setLoading] = useState(true)
  

  useEffect(()=>{
    let cancel
    setLoading(true)
    axios.get(currentPageUrl, {cancelToken: new axios.CancelToken( c => cancel = c )}).then(res => {
      setLoading(false)
      setNextPageUrl(res.data.next)
      setPrevPageUrl(res.data.previous)
      setAbility(res.data.results.map(ab => (ab.name)))
    })

    return () => cancel()

  }, [currentPageUrl])

  function goToNextPage (){
    setCurrentPageUrl (nextPageUrl) 
  }

  function goToPrevPage (){
    setCurrentPageUrl (prevPageUrl) 
  }


  if (loading) { return 'Loading ...'}

  return (
    <div>
      <AbilityList ability={ability}/>
      <Pagination 
        goToNextPage={nextPageUrl ? goToNextPage : null} 
        goToPrevPage={prevPageUrl ? goToPrevPage : null} 
      /> 
    </div>
  );
}

export default App;
