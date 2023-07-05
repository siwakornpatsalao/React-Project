import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import Search from './Search';
import {DropDown, NavBar} from './NavBar';
import { NavItem } from './NavBar';
import React from 'react'
import Select from 'react-select'


function App() {
  const [data, setData] = useState([]); //สร้าง array ว่าง
  const [searchText, setSearchText] = useState(''); //Search
  const [genre,setGenre] = useState([]); //array ของ genre
  const [selectedGenre, setSelectedGenre] = useState(null); //ค่าในการ filter genre

  async function getAPI(){
    const response = await fetch("https://www.mmobomb.com/api1/games");
    const responseJson = await response.json();
    setData(responseJson)
    console.log(responseJson);

    const uniqueGenres = [...new Set(responseJson.map((data) => data.genre))];
    const genres = uniqueGenres.map((genre) => ({
      value: genre,
      label: genre
    }));
    setGenre(genres);
  }

  const filterData = data.filter(data=>
    data.title.toLowerCase().includes(searchText.toLowerCase())&&
    (selectedGenre === null || data.genre === selectedGenre.value)
  )

  const dataElements = filterData.map(data=>{
    return(
      <div className='grid' key={data.id}>
        <img src={data.thumbnail} alt="Thumbnail" />
        <p>{data.title}</p>
        <p className='release_date'>{data.release_date}</p>
        <p>Genre: {data.genre}</p>
      </div>
    )
  })



  useEffect(()=>{
    getAPI();
  },[])

  return (
    <div className='app'>
      <NavBar>
        <div className='pad'>
        <Search value={searchText} onValueChange={setSearchText}></Search>
        </div>
        <NavItem icon="🔽">
        <DropDown></DropDown>
        </NavItem>
      </NavBar>
    <section className="app-section">
      <div className='app-container'>

      <div className='pad2'>
      <Select options={genre} // Pass the genre options as Select component options
            value={selectedGenre}
            onChange={(selectedOption) => setSelectedGenre(selectedOption)}
            placeholder="Select genre"
      ></Select>
      <button onClick={()=>{setSelectedGenre(null); setSearchText('');}}>Reset</button>
      </div>


         <div className='grid-container'>
        {dataElements}
          </div>
      </div>
    </section>
    </div>
  );
}

export default App;
