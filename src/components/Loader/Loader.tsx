import './Loader.css';

export const Loader = () => {
  return (
    // Looks ugly but needed for loader to work - all work done in css
    <div className="lds-roller">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
}
