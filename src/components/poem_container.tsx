import { useEffect, useState } from "react";
import { PoemItem } from "../mock_api/data";
import { PoemsList } from "./poems_list";
import { AddPoem } from "./add_poem";
import { ShowLoading } from "./show_loading";

export interface PoemData extends PoemItem {
  id: number;
}
export type PoemsResponse = Array<PoemData>;

export const PoemContainer: React.FC = () => {
  const [poems, setPoems] = useState<PoemsResponse>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getPoems() {
      const data = await fetch("/poetriumph.com/api/v1/poems");
      const result: PoemsResponse = await data.json();
      setLoading(false);
      setPoems(result);
    }
    getPoems();
  }, []);

  return (
    <>
      <h1>Nature Poems: An Artificial Perspective</h1>
      <AddPoem setPoems={setPoems} />
      <ShowLoading isLoading={loading} />
      <PoemsList poems={poems} />
    </>
  );
};
