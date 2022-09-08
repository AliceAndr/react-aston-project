import { useParams } from "react-router-dom";
import { useGetOneHouseQuery } from "../../redux/api/housesApi";
import './HousePage.css';

export const HousePage = () => {
  const params = useParams<{ name?: string }>();
  const { data } = useGetOneHouseQuery(params.name as string);

  return (
    <div className="app__bookpage">
      <h1>Book Info:</h1>
      <div className="app__bookpage-infoWrap">
        <div className="app__bookpage-infoWrap-info"><span>Name: </span>{data?.name}</div>
        <div className="app__bookpage-infoWrap-info"><span>Words: </span>{data?.words || 'No info'} </div>
        <div className="app__bookpage-infoWrap-info"><span>Region: </span>{data?.region || 'No info'}</div>
        <div className="app__bookpage-infoWrap-info"><span>Coat of Arms: </span>{data?.coatOfArms || 'No info'}</div>
        <div className="app__bookpage-infoWrap-info"><span>The Great Title: </span>{data?.titles?.join(', ') || 'No info'}  </div>
        <div className="app__bookpage-infoWrap-info"><span>Seats: </span>{data?.seats.join(', ') || 'No info'} </div>
        <div className="app__bookpage-infoWrap-info"><span>Died out: </span>{data?.diedOut || 'Still Alive'} </div>
      </div>
    </div>
  )
}
