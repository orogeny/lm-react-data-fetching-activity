import { PoemsResponse } from "./poem_container";
import { ChangeEvent, MouseEvent, useState } from "react";

type AddPoemProps = {
  setPoems: React.Dispatch<React.SetStateAction<PoemsResponse>>;
};

const blankPoem = { title: "", body: "", author: "" };

export const AddPoem: React.FC<AddPoemProps> = ({ setPoems }) => {
  const [inputData, setInputData] = useState(blankPoem);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setInputData((currentData) => {
      return { ...currentData, [event.target.id]: event.target.value };
    });
  }

  function handleSubmitPoem(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    fetch("/poetriumph.com/api/v1/poems", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }

        return response.json();
      })
      .then((payload) => setPoems((prev) => [...prev, payload.poem]))
      .then(() => setInputData(blankPoem))
      .catch((error) => console.log(error));
  }

  return (
    <>
      <h2>Post a New Poem</h2>
      <form className="add-poem">
        <label>
          Poem Title:{" "}
          <input
            type="text"
            name="title"
            id="title"
            value={inputData.title}
            onChange={handleChange}
          />
        </label>
        <label>
          Poem Text:{" "}
          <input
            type="textarea"
            name="body"
            id="body"
            value={inputData.body}
            onChange={handleChange}
          />
        </label>
        <label>
          Author:{" "}
          <input
            type="text"
            name="author"
            id="author"
            value={inputData.author}
            onChange={handleChange}
          />
        </label>
        <button onClick={handleSubmitPoem}>Add to Collection</button>
      </form>
    </>
  );
};
