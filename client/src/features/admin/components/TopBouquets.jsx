import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatPeso } from "../../../utils/dashboardUtils";

/**
 * BouquetRow — single product row with colour swatch, name, price, sold count.
 */
function BouquetRow({ bouquet }) {
  return (
    <div className="flex items-center gap-3 py-2.5 border-b border-border/50 last:border-0">
      {/* Colour swatch as placeholder for product thumbnail */}
      <div
        className="w-10 h-10 rounded-lg shrink-0 border border-border/40"
        style={{ backgroundColor: bouquet.color }}
      />

      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground truncate">
          {bouquet.name}
        </p>
        <p className="text-xs text-muted-foreground">{bouquet.sold} sold</p>
      </div>

      <p className="text-sm font-semibold text-foreground shrink-0">
        {formatPeso(bouquet.price)}
      </p>
    </div>
  );
}

/**
 * TopBouquets
 * Ordered list of top-selling bouquets.
 *
 * @param {Object}   props
 * @param {Array}    props.bouquets  - TOP_BOUQUETS array
 * @param {Function} [props.onViewAll]
 */
export function TopBouquets({ bouquets, onViewAll }) {
  return (
    <Card className="shadow-none border border-border/60">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-semibold">
          Top Selling Bouquets
        </CardTitle>
        <Button
          variant="ghost"
          size="sm"
          className="text-xs h-7 px-2 text-muted-foreground hover:text-foreground"
          onClick={onViewAll}
        >
          View All
        </Button>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="divide-y divide-transparent">
          {bouquets.map((b) => (
            <BouquetRow key={b.id} bouquet={b} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
