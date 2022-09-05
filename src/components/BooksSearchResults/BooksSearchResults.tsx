import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSearchBookQuery } from '../../redux/api/booksApi';

type BookSearchResultsProps = {
  searchTerm: string;
};

const BookSearchResults: React.FC<BookSearchResultsProps> = ({
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
    return <div className="text-hint">Error while fetching books</div>;
  }

  if (isLoading) {
    return <div className="text-hint">Loading books...</div>;
  }

  if (isFetching) {
    return <div className="text-hint">Fetching books...</div>;
  }

  if (books.length === 0) {
    return <div className="text-hint">No books found</div>;
  }
  if (show) {
    return (
      <ul>
        {books.map((item: any) =>
          <li key={item.isbn}>
            <Link to={`${item.name}`}>{item.name}</Link>
          </li>
        )}
      </ul>
    );
  } else {
    return null;
  }
};

export default BookSearchResults;
