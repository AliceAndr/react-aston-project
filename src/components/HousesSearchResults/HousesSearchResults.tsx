import React from "react";
import { Link } from "react-router-dom";
import { IHousesResponse, useSearchHousesQuery } from "../../redux/api/housesApi";
import './HousesSearchResults.css'

type HousesSearchResultsProps = {
  query: string
};

const HousesSearchResults: React.FC<HousesSearchResultsProps> = (props) => {
  const { query } = props

  const { data, error, isLoading, isFetching } = useSearchHousesQuery(query);
  const houses = data ?? [];

  if (error) {
    return <div className="app__housesSection-hint">Error while fetching houses</div>;
  }

  if (isLoading) {
    return <div className="app__housesSection-hint">Loading houses...</div>;
  }

  if (isFetching) {
    return <div className="app__housesSection-hint">Fetching houses...</div>;
  }

  if (houses.length === 0) {
    return <div className="app__housesSection-hint">No houses found</div>;
  }
  if (houses.length >= 1) {
    return (
      <ul className='app__booksSection-ul'>
        {houses.map((item: IHousesResponse, index: number) =>
          <li className='app__booksSection-li' key={index}>
            <Link to={`${item.name}`}>{item.name}</Link>
          </li>
        )}
      </ul>
    );
  }
  return null;
};

export default HousesSearchResults;
