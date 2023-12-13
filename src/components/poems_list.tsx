import { Poem } from "./poem";
import { PoemsResponse } from "./poem_container";

interface PoemsListProps {
  poems: PoemsResponse;
}

export const PoemsList: React.FC<PoemsListProps> = ({ poems }) => {
  return (
    <>
      <ul>
        {poems.map((p) => (
          <Poem key={p.id} poem={p} />
        ))}
      </ul>
    </>
  );
};
