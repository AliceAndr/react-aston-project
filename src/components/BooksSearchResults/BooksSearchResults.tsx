import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSearchBookQuery } from '../../redux/api/booksApi';
import './BooksSearchResults.css';

type BookSearchResultsProps = {
  searchTerm: string;
};

export const BookSearchResults: React.FC<BookSearchResultsProps> = ({
  searchTerm
}: BookSearchResultsProps) => {
  const [filteredSearchTerm, setFilteredSearchTerm] = useState(searchTerm);
  const { data, error, isLoading, isFetching } = useSearchBookQuery(filteredSearchTerm);
  const [show, setShow] = useState(false);
  const books = data ?? [];

  React.useEffect(() => {
    const myUrl = new URL(window.location.href)
    const param = myUrl.searchParams.get('search');
    setFilteredSearchTerm(param as string);
    setShow(true)
  }, [show])

  useEffect(() => {
    if (searchTerm.length === 0 || searchTerm.length > 4) {
      setFilteredSearchTerm(searchTerm);
    }
  }, [searchTerm]);

  if (error) {
    return <div className="app__booksSection-hint">Error while fetching books</div>;
  }

  if (isLoading) {
    return <div className="app__booksSection-hint">Loading books...</div>;
  }

  if (isFetching) {
    return <div className="app__booksSection-hint">Fetching books...</div>;
  }

  if (books.length === 0) {
    return <div className="app__booksSection-hint">No books found</div>;
  }
  if (show) {
    return (
      <ul className='app__booksSection-ul'>
        {books.map((item: any) =>
          <li className='app__booksSection-li' key={item.isbn}>
            <Link to={`${item.name}`}>{item.name}</Link>
          </li>
        )}
      </ul>
    );
  } else {
    return null;
  }
};
