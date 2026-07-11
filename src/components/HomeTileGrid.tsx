import { HomeTile } from "./HomeTile";
import { homeTiles } from "@/content/pages";

export function HomeTileGrid() {
  return (
    <ul
      role="list"
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6"
    >
      {homeTiles.map((tile) => (
        <li key={tile.href}>
          <HomeTile tile={tile} />
        </li>
      ))}
    </ul>
  );
}
