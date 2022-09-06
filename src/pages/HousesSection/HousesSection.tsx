import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGetHousesQuery } from '../../redux/api/housesApi';
import { useDebounce } from '../../hooks/hooks';
import { TextParagraph } from '../../components/TextParagraph/TextParagraph';
import { HousesSearchResults } from '../../components/HousesSearchResults/HousesSearchResults';
import './HousesSection.css';

export const HousesSection = () => {
  const { data = [], isLoading } = useGetHousesQuery();
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
    <div className='app__housesSection'>
      <h1>Books by G. R. R. Martin</h1>
      <TextParagraph text='Welcome to the Houses Section!' />
      <TextParagraph text='Please, consider the fact that the API used on this page does not support the search by partial title. This means that you can find the necessary book only by writing the whole title of it. For example, try searching "A Game of Thrones" or "The Sworn Sword". Have fun! :)' />

      <input className='app__housesSection-input' value={searchTerm} onChange={onChange} />

      <h2>Houses found:</h2>

      {/* <ul className='app__housesSection-ul'>
        {data.map((item, index) =>
          <li className='app__housesSection-li' key={index}>
            <Link to={`${item.name}`}>{item.name}</Link>
          </li>
        )}
      </ul> */}

      {(debouncedSearchTerm || param)
        ?
        <HousesSearchResults searchTerm={debouncedSearchTerm} />
        :
        <ul className='app__housesSection-ul'>
          {data.map((item, index) =>
            <li className='app__housesSection-li' key={index}>
              <Link to={`${item.name}`}>{item.name}</Link>
            </li>
          )}
        </ul>
      }

    </div>
  )
}
