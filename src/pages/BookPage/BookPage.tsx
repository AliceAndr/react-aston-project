import { useParams } from "react-router-dom";
import { useGetOneBookQuery } from "../../redux/api/booksApi";
import './BookPage.css';

export const BookPage = () => {
  const params = useParams<{name?: string}>();
  const {data, isLoading } = useGetOneBookQuery(params.name as string);

  return (
    <div className="app__bookpage">
     <div className="app__bookpage-infoWrap">
      <div className="app__bookpage-infoWrap-info">Title: {data?.name}</div>
      <div className="app__bookpage-infoWrap-info">Author: {data?.authors[0]}</div>
      <div className="app__bookpage-infoWrap-info">Cover: {data?.mediaType}</div>
      <div className="app__bookpage-infoWrap-info">ISBN: {data?.isbn}</div>
      <div className="app__bookpage-infoWrap-info">Number of Pages: {data?.numberOfPages}</div>
      <div className="app__bookpage-infoWrap-info">Publisher: {data?.publisher}</div>
      <div className="app__bookpage-infoWrap-info">Release Date: {data?.released}</div>
     </div>
    </div>
  )
}
