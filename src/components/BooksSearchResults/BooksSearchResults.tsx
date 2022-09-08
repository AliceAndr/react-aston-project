import React from "react";
import { Link } from "react-router-dom";
import { useSearchBookQuery } from '../../redux/api/booksApi';
import './BooksSearchResults.css';

type BookSearchResultsProps = {
  searchName: string;
};

export const BookSearchResults: React.FC<BookSearchResultsProps> = (props) => {
  const { searchName } = props;
  const { data, error, isLoading, isFetching } = useSearchBookQuery(searchName);
  const books = data ?? [];

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
  if (books.length >= 1) {
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
