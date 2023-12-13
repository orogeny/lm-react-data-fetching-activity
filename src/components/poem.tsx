import { ChangeEvent } from "react";
import { PoemData } from "./poem_container";

interface PoemProps {
  poem: PoemData;
  toggleLiked: (id: number, isLiked: boolean) => void;
}

export const Poem: React.FC<PoemProps> = ({
  poem: { id, title, body, author, isLiked },
  toggleLiked,
}) => {
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    toggleLiked(parseInt(e.target.id), e.target.checked);
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
