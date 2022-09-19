import { useParams } from "react-router-dom";
import { useGetOneHouseQuery } from "../../redux/api/housesApi";
import { useAppDispatch } from "../../hooks/hooks";
import { toggleFavorite } from "../../redux/slices/userSlice";
import { useCurrentUser } from "../../hooks/hooks";
import { Loader } from "../../components/Loader/Loader";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import './HousePage.css';

export const HousePage = () => {
  const dispatch = useAppDispatch();
  const { name: paramsName = '' } = useParams();
  const { data, isLoading } = useGetOneHouseQuery(paramsName);
  const user = useCurrentUser();
  const isInFavorite = user?.favorites?.find((el) => el.name === paramsName);

  const toggleFavorites = () => {
    dispatch(toggleFavorite({ name: data?.name, url: window.location.href, userEmail: user.email }))
  }

  if (isLoading) {
    return (
      <div className="app__bookpage">
        <Loader />
      </div>
    )
  }

  return (
    <div className="app__bookpage">
      <h1>House Info: </h1>
      <div className="app__bookpage-infoWrap">
        <div className="app__bookpage-infoWrap-info"><span>Name: </span>{data?.name}</div>
        <div className="app__bookpage-infoWrap-info"><span>Words: </span>{data?.words || 'No info'} </div>
        <div className="app__bookpage-infoWrap-info"><span>Region: </span>{data?.region || 'No info'}</div>
        <div className="app__bookpage-infoWrap-info"><span>Coat of Arms: </span>{data?.coatOfArms || 'No info'}</div>
        <div className="app__bookpage-infoWrap-info"><span>The Great Title: </span>{data?.titles?.join(', ') || 'No info'}  </div>
        <div className="app__bookpage-infoWrap-info"><span>Seats: </span>{data?.seats.join(', ') || 'No info'} </div>
        <div className="app__bookpage-infoWrap-info"><span>Died out: </span>{data?.diedOut || 'Still Alive'} </div>

        {
          user?.email ? (
            isInFavorite ?
              <div className="app_favorite-button" onClick={toggleFavorites}>
                <p className="app_favorite-p">Delete from Favorites</p>
                <FavoriteIcon />
              </div>
              :
              <div className="app_favorite-button" onClick={toggleFavorites}>
                <p className="app_favorite-p">Add to Favorites</p>
                <FavoriteBorderIcon />
              </div>
          ) : null
        }

      </div>
    </div>
  )
}
