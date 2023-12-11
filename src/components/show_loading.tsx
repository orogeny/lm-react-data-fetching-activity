import { CSSProperties } from "react";

export const ShowLoading: React.FC<{ isLoading: boolean }> = ({
  isLoading = false,
}) => {
  if (!isLoading) return null;

  const loadingText = "Loading...";

  return (
    <h3 className="loading-text" aria-label="loading" role="status">
      {loadingText.split("").map((character, index) => {
        const style: CSSProperties = {
          animationDelay: 0.5 + index / 10 + "s",
        };
        return (
          <span aria-hidden="true" key={`${index}${character}`} style={style}>
            {character}
          </span>
        );
      })}
    </h3>
  );
};
