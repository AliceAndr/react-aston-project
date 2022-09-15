import React, { useState, Suspense } from 'react';
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useGetAllBooksQuery } from '../../redux/api/booksApi';
import { useDebounce } from '../../hooks/hooks';
import TextParagraph from '../../components/TextParagraph/TextParagraph';
import { Loader } from '../../components/Loader/Loader';
import './BooksSection.css';

const BookSearchResults = React.lazy(() => import('../../components/BooksSearchResults/BooksSearchResults'));


export const BooksSection = () => {
  const navigate = useNavigate();
  const { data = [] } = useGetAllBooksQuery();
  const [searchName, setSearchName] = useState("");
  const debouncedSearchName = useDebounce(searchName, 1500);
  const search = useLocation().search
  const bookName = new URLSearchParams(search).get('search');

  const onChange = (e: { target: HTMLInputElement }) => {
    setSearchName(e.target.value);
  }

  React.useEffect(() => {
    if (searchName.length > 0) {
      navigate(`?search=${debouncedSearchName}`)
    }
  }, [debouncedSearchName]
  )

  React.useEffect(() => {
    setSearchName(bookName || '');
  }, [bookName]);

  return (
    <div className='app__booksSection'>
      <h1>Books by G. R. R. Martin</h1>
      <TextParagraph text='Welcome to the Book Section! Here you can find the information about all the books written by the great author - G. R. R. Martin. Click on the title to go to the Info page - there you will find all the information you were looking for! :) Feel free to try it out! :)' />
      <TextParagraph text='Please, consider the fact that the API used on this page does not support the search by partial title. This means that you can find the necessary book only by writing the whole title of it. For example, try searching "A Game of Thrones" or "The Sworn Sword". Have fun! :)' />

      <input className='app__booksSection-input' value={searchName} onChange={onChange} />

      <h2>Books found:</h2>

      {(debouncedSearchName)
        ?
        <Suspense fallback={<Loader />}>
          <BookSearchResults searchName={debouncedSearchName} />
        </Suspense>
        :
        <ul className='app__booksSection-ul'>
          {data.map(item =>
            <li className='app__booksSection-li' key={item.isbn}>
              <Link to={`${item.name}`}>{item.name}</Link>
            </li>
          )}
        </ul>
      }

    </div>
  )
}
