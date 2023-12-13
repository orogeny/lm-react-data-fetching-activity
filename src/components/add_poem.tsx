import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { ChangeEvent, MouseEvent, useState } from "react";

const blankPoem = { title: "", body: "", author: "" };

export const AddPoem: React.FC = () => {
  const [inputData, setInputData] = useState(blankPoem);

  const queryClient = useQueryClient();

  const createPoemMutation = useMutation({
    mutationFn: createPoem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["poems"] });
    },
  });

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setInputData((currentData) => {
      return { ...currentData, [event.target.id]: event.target.value };
    });
  }

  function handleSubmitPoem(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    createPoemMutation.mutate(inputData);
    setInputData(blankPoem);
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

async function createPoem(poem: {
  title: string;
  body: string;
  author: string;
}) {
  const { data } = await axios.post("/poetriumph.com/api/v1/poems", poem);
  return data.poem;
}
