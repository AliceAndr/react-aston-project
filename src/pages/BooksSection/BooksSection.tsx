import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useGetAllBooksQuery } from '../../redux/api/booksApi';
import BookSearchResults from '../../components/BooksSearchResults/BooksSearchResults';
import { useDebounce } from '../../hooks/hooks';
import './BooksSection.css';

export const BooksSection = () => {
  const {data = [], isLoading } = useGetAllBooksQuery();
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
      <input value={searchTerm} onChange={onChange} />

      {(debouncedSearchTerm || param) ?
        <BookSearchResults searchTerm={debouncedSearchTerm} /> 
        :
        <ul>
          {data.map(item =>
            <li key={item.isbn}>
              <Link to={`${item.name}`}>{item.name}</Link>
            </li>
          )}
        </ul>
      }

    </div>
  )
}
