import React, { useState, Suspense } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import TextParagraph from '../../components/TextParagraph/TextParagraph';
import { housesFilter } from '../../utils/housesFilter';
import { Loader } from '../../components/Loader/Loader';
import './HousesSection.css';

const HousesSearchResults = React.lazy(() => import('../../components/HousesSearchResults/HousesSearchResults'));

export const HousesSection = () => {
  const [filterState, setFilterState] = React.useState<Record<string, boolean>>({});
  const [query, setQuery] = React.useState('');
  const [searchName, setSearchName] = useState("");
  const search = useLocation().search;
  const navigate = useNavigate();
  let name = new URLSearchParams(search).get('name');

  const onChange = (e: { target: HTMLInputElement }) => {
    setSearchName(e.target.value);
  }

  const clickOnFilterItem = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    const value = target.innerText;
    target.classList.toggle('active');

    if (!filterState[value]) {
      const result = filterState;
      result[value] = true;
      setFilterState(result);
      setSearchName(name || '');
    } else {
      const result = filterState;
      result[value] = false;
      setFilterState(result);
      setSearchName(name || '');
    }
  }

  const applyFilters = () => {
    const resultQueryParams = [];
    resultQueryParams.push(`name=${searchName}`);
    for (let key in filterState) {
      if (filterState[key]) {
        resultQueryParams.push(`${key}=true`);
      }
    }
    navigate(`?${resultQueryParams.join('&')}`);
    setQuery(resultQueryParams.join('&'));
  }

  React.useEffect(() => {
    const urlQuery = window.location.href.split('?')[1];
    setQuery(urlQuery);
    setSearchName(name || '');
  }, []);

  return (
    <div className='app__housesSection'>
      <h1>Great Houses of Westeros</h1>
      <TextParagraph text='Welcome to Houses Section! On this page you might find all the information you need about The Great Houses of Westeros and even more!' />
      <TextParagraph text='Please, consider the fact that the API used on this page does not support the search by partial title. This means that you can find the necessary house only by writing the whole name of it. For example, try searching "House Stark of Winterfell", "House Lannister of Casterly Rock" or use filters. Have fun! :)' />

      <input className='app__housesSection-input' value={searchName} onChange={onChange} />
      <div className="app__housesSection-filterWrap">

        {
          housesFilter.map((el, i) => {
            return (
              <div className='app__housesSection-filterItem' key={i} onClick={clickOnFilterItem}>{el}</div>
            )
          })
        }
        <button onClick={applyFilters}>Search</button>

      </div>
      <h2>Houses found:</h2>
      <Suspense fallback={<Loader />}>
        <HousesSearchResults query={query} />
      </Suspense>
    </div>
  )
}
