import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGetAllBooksQuery } from '../../redux/api/booksApi';
import { BookSearchResults } from '../../components/BooksSearchResults/BooksSearchResults';
import { useDebounce } from '../../hooks/hooks';
import { TextParagraph } from '../../components/TextParagraph/TextParagraph';
import './BooksSection.css';

export const BooksSection = () => {
  const { data = [], isLoading } = useGetAllBooksQuery();
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 1500);
  const myUrl = new URL(window.location.href)
  const param = myUrl.searchParams.get('search');

  const onChange = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    setSearchTerm(target.value);
  }

  React.useEffect(() => {
    if (searchTerm.length > 0) {
      window.history.pushState({}, '', `?search=${searchTerm}`);
    }
  }, [searchTerm]
  )

  return (
    <div className='app__booksSection'>
      <h1>Books by G. R. R. Martin</h1>
      <TextParagraph text='Welcome to the Book Section! Here you can find the information about all the books written by the great author - G. R. R. Martin. Click on the title to go to the Info page - there you will find all the information you were looking for! :) Feel free to try it out! :)' />
      <TextParagraph text='Please, consider the fact that the API used on this page does not support the search by partial title. This means that you can find the necessary book only by writing the whole title of it. For example, try searching "A Game of Thrones" or "The Sworn Sword". Have fun! :)' />

      <input className='app__booksSection-input' value={searchTerm} onChange={onChange} />

      <h2>Books found:</h2>

      {(debouncedSearchTerm || param)
        ?
        <BookSearchResults searchTerm={debouncedSearchTerm} />
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
