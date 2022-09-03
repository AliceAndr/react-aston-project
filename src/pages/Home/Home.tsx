import React from "react"
import TextParagraph from "../../components/TextParagraph/TextParagraph";
import SectionCover from "../../components/SectionCover/SectionCover";
import './Home.css';

import housesCover from '../../assets/houses-min.jpg';
import charactersCover from '../../assets/characters-min.jpg';
import booksCover from '../../assets/books-min.jpg';

const Home = () => {
  return (
    <div className="app__home">
      <h1 className='app__header-h1'>Welcome to Game Of Thrones Wiki!</h1>
      <TextParagraph text="Game of Thrones Wiki is an encyclopedic guide to the series Game of Thrones, House of the Dragon and the Song of Ice and Fire. Here you can find the information about the Great Houses of Westeros, learn more about its heroes and find out more about the books by G. R. R. Martin. Beware of spoilers!"/>
      <TextParagraph text="To find the information you need, please go to the following sections and use the search button. And don't forget to login to use all the site features!"/>

      <div className="app__home-covers">
      <SectionCover image={housesCover} text="The Great Houses" alt="Houses of Westeros and Essos"/>
      <SectionCover image={charactersCover} text="Characters" alt="Heroes of Westeros and Essos"/>
      <SectionCover image={booksCover} text="Book Series" alt="Books"/>
      </div>
    </div>
  )
}

export default Home;
