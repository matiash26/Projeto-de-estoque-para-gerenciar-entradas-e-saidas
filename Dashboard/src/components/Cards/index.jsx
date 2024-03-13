import "./style.css";
function Cards({ title, icon, value, color }) {
  return (
    <div className="cards_container">
      <div className="cards_title">
        <h4>{title}</h4>
      </div>
      <div className="cards_content">
        <span className={color}>{icon}</span>
        <div className="cards_value">
          <span>{parseFloat(value ?? 0).toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}
export default Cards;
