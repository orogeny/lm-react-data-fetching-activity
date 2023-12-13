import { ChangeEvent } from "react";
import { PoemData } from "./poem_container";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface PoemProps {
  poem: PoemData;
}

export const Poem: React.FC<PoemProps> = ({
  poem: { id, title, body, author, isLiked },
}) => {
  const queryClient = useQueryClient();

  const toggleLikedMutation = useMutation({
    mutationFn: toggleLiked,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["poems"] });
    },
  });

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    toggleLikedMutation.mutate({
      id: parseInt(e.target.id),
      isLiked: e.target.checked,
    });
  }

  return (
    <>
      <li key={id} className="poem-item">
        <h3>{title}</h3>
        <p className="poem-text">{body}</p>
        <p>{author}</p>
        <label>
          Like:{" "}
          <input
            className="tick-box"
            type="checkbox"
            id={id.toString()}
            checked={isLiked}
            onChange={handleChange}
          />
        </label>
      </li>
    </>
  );
};

async function toggleLiked(updated: { id: number; isLiked: boolean }) {
  const response = await fetch("/poetriumph.com/api/v1/poems", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updated),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message);
  }

  return result;
}
