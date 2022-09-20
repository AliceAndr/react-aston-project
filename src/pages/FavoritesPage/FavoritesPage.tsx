import React from "react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../hooks/hooks";
import { deleteFavorite } from "../../redux/slices/userSlice";
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';
import { User } from "../../redux/slices/userSlice";
import { useAppSelector, useCurrentUser } from "../../hooks/hooks";
import './FavoritesPage.css';

export const FavoritesPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const usersFromState = useAppSelector(state => state.user);
  let curentFavoritsUser: User = {};
  const userIsAuth = useCurrentUser();

  if (userIsAuth?.email) {
    curentFavoritsUser = usersFromState[`${userIsAuth.email}`];
  }

  const deleteFavorites = (el: { name: string, url: string }) => {
    dispatch(deleteFavorite({ name: el.name, userEmail: userIsAuth.email }));
  }

  if (curentFavoritsUser?.favorites?.length === 0) {
    return (
      <div className="app_favorites">
        <p className="app_favorites-empty-p">Ooops! Looks like nothing has been added to Favorites yet! I guess you have some work to do then :) </p>
      </div>
    )
  }

  return (
    <div className="app_favorites">
      <p className="app_favorites-full-p">Favorites list</p>
      <ul className="app__favorites-ul">
        {
          curentFavoritsUser?.favorites?.filter(
            el => el.name !== undefined && el.url !== undefined
          ).map((el: { name: string, url: string }, i: number) =>
            <li className="app__favorites-li" key={i}>
              <Link to={el.url}>{el.name}</Link>
              <div onClick={() => deleteFavorites(el)}>
                <HeartBrokenIcon />
              </div>
            </li>
          )
        }
      </ul>
    </div>
  )

}
