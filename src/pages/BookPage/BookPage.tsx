import { useParams } from "react-router-dom";
import { useGetOneBookQuery } from "../../redux/api/booksApi";
import { useAppDispatch } from "../../hooks/hooks";
import { toggleFavorite } from "../../redux/slices/userSlice";
import { Loader } from "../../components/Loader/Loader";
import { useCurrentUser } from "../../hooks/hooks";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import './BookPage.css';

export const BookPage = () => {
  const dispatch = useAppDispatch();
  const paramsName: string = useParams().name || '';
  const { data, isLoading } = useGetOneBookQuery(paramsName);
  const user = useCurrentUser();
  const isInFavorite = user?.favorites?.find((el: { name: string, url: string }) => el.name === paramsName);

  const toggleFavorites = () => {
    dispatch(toggleFavorite({ name: data?.name, url: window.location.href }))
  }

  if (isLoading) {
    return (
      <div className="app__bookpage">
        <Loader />
      </div>
    )
  } else {
    return (
      <div className="app__bookpage">
        <h1>Book Info:</h1>
        <div className="app__bookpage-infoWrap">
          <div className="app__bookpage-infoWrap-info"><span>Title:</span> {data?.name}</div>
          <div className="app__bookpage-infoWrap-info"><span>Author:</span> {data?.authors[0]}</div>
          <div className="app__bookpage-infoWrap-info"><span>Cover:</span> {data?.mediaType}</div>
          <div className="app__bookpage-infoWrap-info"><span>ISBN:</span> {data?.isbn}</div>
          <div className="app__bookpage-infoWrap-info"><span>Number of Pages:</span> {data?.numberOfPages}</div>
          <div className="app__bookpage-infoWrap-info"><span>Publisher:</span> {data?.publisher}</div>
          <div className="app__bookpage-infoWrap-info"><span>Release Date:</span> {data?.released?.slice(0, 10)}</div>

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
}
