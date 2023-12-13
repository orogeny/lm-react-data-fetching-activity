import { Poem } from "./poem";
import { PoemsResponse } from "./poem_container";

interface PoemsListProps {
  poems: PoemsResponse;
  setPoems: React.Dispatch<React.SetStateAction<PoemsResponse>>;
}

export const PoemsList: React.FC<PoemsListProps> = ({ poems, setPoems }) => {
  async function toggleLiked(id: number, isLiked: boolean) {
    try {
      const response = await fetch("/poetriumph.com/api/v1/poems", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, isLiked }),
      });

      if (!response.ok) {
        throw new Error("PATCH request failed");
      }

      const updatedPoem = await response.json();

      setPoems((prev) => prev.map((p) => (p.id * 1 === id ? updatedPoem : p)));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <ul>
        {poems.map((p) => (
          <Poem key={p.id} poem={p} toggleLiked={toggleLiked} />
        ))}
      </ul>
    </>
  );
};
