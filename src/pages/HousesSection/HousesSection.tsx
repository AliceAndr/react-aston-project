import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDebounce } from '../../hooks/hooks';
import { TextParagraph } from '../../components/TextParagraph/TextParagraph';
import { HousesSearchResults } from '../../components/HousesSearchResults/HousesSearchResults';
import { Checkbox } from '../../components/Checkbox/Checkbox';
import checkboxes from '../../utils/checkboxConfig';
import './HousesSection.css';

export const HousesSection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [checkedItems, setCheckedItems] = useState({ hasSeats: false, hasDiedOut: false, hasTitles: false } as Record<string, boolean>);
  const debouncedSearchTerm = useDebounce(searchTerm, 1500);
  const myUrl = new URL(window.location.href)
  const param = myUrl.searchParams.get('search');

  const handleCheck = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    setCheckedItems({ ...checkedItems, [target.name]: target.checked });
  }

  const onChange = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    setSearchTerm(target.value);
  }


  React.useEffect(() => {
      window.history.pushState({}, '', `?search=${searchTerm || ''}&hasTitles=${checkedItems.hasTitles || ''}&hasSeats=${checkedItems.hasSeats || ''}&hasDiedOut=${checkedItems.hasDiedOut || ''}`);
  }, [searchTerm, checkedItems]
  )

  return (
    <div className='app__housesSection'>
      <h1>Great Houses of Westeros</h1>
      <TextParagraph text='Welcome to Houses Section! On this page you might find all the information you need about The Great Houses of Westeros and even more!' />
      <TextParagraph text='Please, consider the fact that the API used on this page does not support the search by partial title. This means that you can find the necessary house only by writing the whole name of it. For example, try searching "House Stark of Winterfell" or "House Lannister of Casterly Rock". Have fun! :)' />

      <input className='app__housesSection-input' value={searchTerm} onChange={onChange} />
      {
        checkboxes.map(item => (
          <label key={item?.key}>
            {item.name}
            <Checkbox name={item?.name} value={checkedItems[item?.name]} type="checkbox" checked={checkedItems[item?.name]} onChange={handleCheck} />
          </label>
        ))
      }

      <h2>Houses found:</h2>
      <HousesSearchResults searchTerm={debouncedSearchTerm} checkedItems={checkedItems} />

    </div>
  )
}
