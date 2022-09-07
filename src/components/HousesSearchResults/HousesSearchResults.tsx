import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSearchHousesQuery } from "../../redux/api/housesApi";
// import './BooksSearchResults.css';

type HousesSearchResultsProps = {
  searchTerm: string;
  query: string
};

export const HousesSearchResults: React.FC<HousesSearchResultsProps> = (props: HousesSearchResultsProps) => {
  const {searchTerm, query} = props
  
  const [filteredSearchTerm, setFilteredSearchTerm] = useState(searchTerm);
  const { data, error, isLoading, isFetching } = useSearchHousesQuery(query);
  const [show, setShow] = useState(false);
  const houses = data ?? [];

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
    return <div className="app__booksSection-hint">Error while fetching houses</div>;
  }

  if (isLoading) {
    return <div className="app__booksSection-hint">Loading houses...</div>;
  }

  if (isFetching) {
    return <div className="app__booksSection-hint">Fetching houses...</div>;
  }

  if (houses.length === 0) {
    return <div className="app__booksSection-hint">No houses found</div>;
  }
  if (show) {
    return (
      <ul className='app__booksSection-ul'>
        {houses.map((item: any, index: number) =>
          <li className='app__booksSection-li' key={index}>
            <Link to={`${item.name}`}>{item.name}</Link>
          </li>
        )}
      </ul>
    );
  } else {
    return null;
  }
};

