import React from "react";
import { Link } from "react-router-dom";
import { useSearchHousesQuery } from "../../redux/api/housesApi";

type HousesSearchResultsProps = {
  query: string
};

export const HousesSearchResults: React.FC<HousesSearchResultsProps> = (props) => {
  const { query } = props

  const { data, error, isLoading, isFetching } = useSearchHousesQuery(query);
  const houses = data ?? [];

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
  if (houses.length >= 1) {
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

