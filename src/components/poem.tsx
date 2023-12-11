import { PoemData } from "./poem_container";

interface PoemProps {
  poem: PoemData;
}

export const Poem: React.FC<PoemProps> = ({
  poem: { id, title, body, author, isLiked },
}) => {
  return (
    <>
      <li className="poem-item">
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
            onChange={() => {
              "this doesn't do anything yet!";
            }}
          />
        </label>
      </li>
    </>
  );
};
