import React, { useState, Suspense } from 'react';
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useGetAllBooksQuery } from '../../redux/api/booksApi';
import { useAppDispatch, useCurrentUser, useDebounce } from '../../hooks/hooks';
import TextParagraph from '../../components/TextParagraph/TextParagraph';
import { Loader } from '../../components/Loader/Loader';
import { postHistory } from '../../redux/slices/userSlice';
import './BooksSection.css';

const BookSearchResults = React.lazy(() => import('../../components/BooksSearchResults/BooksSearchResults'));


export const BooksSection = () => {
  const dispatch = useAppDispatch();
  const baseUrl = window.location.href.split('?')[0];
  const userEmail = useCurrentUser()?.email as string;
  const search = useLocation().search;
  const bookName = new URLSearchParams(search).get('search');
  const navigate = useNavigate();

  const { data = [], isLoading } = useGetAllBooksQuery();
  const [searchName, setSearchName] = useState(bookName || '');
  const debouncedSearchName = useDebounce(searchName, 1500);


  const onChange = (e: { target: HTMLInputElement }) => {
    setSearchName(e.target.value);
  }

  React.useEffect(() => {
    if (searchName.length > 0) {
      const url = `${baseUrl}?search=${debouncedSearchName}`;
      dispatch(postHistory({ url, userEmail }));
      navigate(`?search=${debouncedSearchName}`);
    }
  }, [debouncedSearchName]
  )

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
        : isLoading
          ?
          <Loader />
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
