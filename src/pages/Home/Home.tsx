import React, { Suspense } from "react";
import { Link } from "react-router-dom";
import TextParagraph from "../../components/TextParagraph/TextParagraph";
import { Loader } from "../../components/Loader/Loader";
import housesCover from '../../assets/houses-min.jpg';
import booksCover from '../../assets/books-min.jpg';
import './Home.css';

const SectionCover = React.lazy(() => import("../../components/SectionCover/SectionCover"));

export const Home = () => {
  return (
    <div className="app__home">
      <h1 className='app__header-h1'>Welcome to Game Of Thrones Wiki!</h1>
      <TextParagraph text="Game of Thrones Wiki is an encyclopedic guide to the series Game of Thrones, House of the Dragon and the Song of Ice and Fire. Here you can find the information about the Great Houses of Westeros, learn more about its heroes and find out more about the books by G. R. R. Martin. Beware of spoilers!" />
      <TextParagraph text="To find the information you need, please go to the following sections and use the search button. And don't forget to login to use all the site features!" />

      <div className="app__home-covers">

        <Suspense fallback={<Loader />}>
          <Link to='/houses'>
            <SectionCover image={housesCover} text="The Great Houses" alt="Houses of Westeros and Essos" />
          </Link>
        </Suspense>

        <Suspense fallback={<Loader />}>
          <Link to='/books'>
            <SectionCover image={booksCover} text="Book Series" alt="Books" />
          </Link>
        </Suspense>

      </div>
    </div>
  )
}
