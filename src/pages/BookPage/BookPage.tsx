import { useParams } from "react-router-dom";
import { useGetOneBookQuery } from "../../redux/api/booksApi";
import './BookPage.css';

export const BookPage = () => {
  const params = useParams<{ name?: string }>();
  const { data, isLoading } = useGetOneBookQuery(params.name as string);
  console.log(data?.released?.slice(0,10));
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
        <div className="app__bookpage-infoWrap-info"><span>Release Date:</span> {data?.released?.slice(0,10)}</div>
      </div>
    </div>
  )
}
