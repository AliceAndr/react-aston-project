import { useAppSelector, useCurrentUser, useAppDispatch } from "../../hooks/hooks";
import { User } from "../../redux/slices/userSlice";
import { deleteHistory } from "../../redux/slices/userSlice";
import './HistoryPage.css';

export const HistoryPage = () => {
  const dispatch = useAppDispatch();
  const currentUser = useCurrentUser() as User;
  const links: string[] = useAppSelector(state => state.user[currentUser?.email as string].historySearch as string[])

  const clearHistory = () => {
    dispatch(deleteHistory(currentUser?.email as string))
  }

  if (links.length >= 1) {
    return (
      <div className="app__history">
        <h1 className="app__history-h1">Search History</h1>
        <div className="app__history-wrap">
          <button onClick={clearHistory} className="app__history-clear">Clear History</button>
          {
            links.map((link, i) => <a href={link} className='app__history-a' key={i}>{link}</a>)
          }
        </div>
      </div>
    )
  } else {
    return (
      <div className="app__history">
        <p className="app__history-empty-p">Oops! Looks like search history is empty!</p>
      </div>
    )
  }
}
