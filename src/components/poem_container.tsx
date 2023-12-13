import { PoemItem } from "../mock_api/data";
import { PoemsList } from "./poems_list";
import { AddPoem } from "./add_poem";
import { ShowLoading } from "./show_loading";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface PoemData extends PoemItem {
  id: number;
}

export type PoemsResponse = Array<PoemData>;

async function getPoems() {
  const { data } = await axios.get("/poetriumph.com/api/v1/poems");
  return data;
}

export const PoemContainer: React.FC = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["poems"],
    queryFn: getPoems,
  });

  return (
    <>
      <h1>Nature Poems: An Artificial Perspective</h1>
      <AddPoem />
      <ShowLoading isLoading={isLoading} />
      <PoemsList poems={data ?? []} />
    </>
  );
};
