import React, { useState } from 'react';
import { useDebounce } from '../../hooks/hooks';
import { TextParagraph } from '../../components/TextParagraph/TextParagraph';
import { HousesSearchResults } from '../../components/HousesSearchResults/HousesSearchResults';
import './HousesSection.css';

const arrFilter = ['hasTitles', 'hasSeats', 'hasDiedOut']

export const HousesSection = () => {
  const [filterState, setFilterState] = React.useState<Record<string, boolean>>({})
  const [query, setQuery] = React.useState('')

  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 1500);
  console.log(debouncedSearchTerm, 'heeeere')

  const onChange = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    setSearchTerm(target.value);
  }

  const clickOnFilterItem = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement
    const value = target.innerText

    if (!filterState[value]) {
      const result = filterState
      result[value] = true
      setFilterState(result)
    } else {
      const result = filterState
      result[value] = false
      setFilterState(result)
    }
  }
  const sort = () => {
    const resaultQueryParams = []
    for (let key in filterState) {
      if (filterState[key]) {
        resaultQueryParams.push(`${key}=true`)
      }
    }
    console.log(resaultQueryParams);
    window.history.replaceState({}, '', `?${resaultQueryParams.join('&')}`)
    setQuery(resaultQueryParams.join('&'))
  }

  React.useEffect(() => {
    const myUrlAllQuery = window.location.href.split('?')[1]
    setQuery(myUrlAllQuery)
    // if(myUrlAllQuery.length > 0) {
    //   setQuery(myUrlAllQuery)
    // }
  }, [])

  return (
    <div className='app__housesSection'>
      <h1>Great Houses of Westeros</h1>
      <TextParagraph text='Welcome to Houses Section! On this page you might find all the information you need about The Great Houses of Westeros and even more!' />
      <TextParagraph text='Please, consider the fact that the API used on this page does not support the search by partial title. This means that you can find the necessary house only by writing the whole name of it. For example, try searching "House Stark of Winterfell" or "House Lannister of Casterly Rock". Have fun! :)' />

      <input className='app__housesSection-input' value={searchTerm} onChange={onChange} />
      <div className="filterWrap">
        <ul>
          {
            arrFilter.map((el, i) => {
              return (
                <div key={i} onClick={(e) => clickOnFilterItem(e)}>{el}</div>
              )
            })
          }
          <button onClick={sort}>Сортируй</button>
        </ul>
      </div>
      <h2>Houses found:</h2>
      <HousesSearchResults query={query} searchTerm={debouncedSearchTerm} />

    </div>
  )
}
