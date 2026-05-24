import { formatPeso } from "../../../utils/dashboardUtils";

function BouquetRow({ bouquet }) {
  return (
    <div className="tb-row">
      <span className="tb-swatch" style={{ background: bouquet.color }} />
      <div className="tb-info">
        <p className="tb-name">{bouquet.name}</p>
        <p className="tb-sold">{bouquet.sold} sold</p>
      </div>
      <p className="tb-price">{formatPeso(bouquet.price)}</p>
    </div>
  );
}

export function TopBouquets({ bouquets, onViewAll }) {
  return (
    <div className="tb-card">
      <div className="tb-card__head">
        <p className="tb-card__title">Top Selling Bouquets</p>
        <button className="db-ghost-btn" type="button" onClick={onViewAll}>View All</button>
      </div>
      <div className="tb-list">
        {bouquets.map((b) => <BouquetRow key={b.id} bouquet={b} />)}
      </div>
    </div>
  );
}