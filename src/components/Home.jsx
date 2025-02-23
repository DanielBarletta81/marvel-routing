import React from 'react'
import CharacterList from './CharacterList' 
import CharacterDetail from './CharacterDetail' 
import Comics from './Comics'
//Task 2: Create Route Components

// Create four new components: Home, BrowseCharacters, CharacterDetails, and Comics. 


// -- Home Component --

const Home = () => {
  return (
    <div>
      <h2>Welcome to the Marvel Universe!</h2>
      <p>Explore the Marvel universe and discover your favorite characters.</p>
      <CharacterList />
      <CharacterDetail />
      <Comics />
    </div>
  )
}   
export default Home