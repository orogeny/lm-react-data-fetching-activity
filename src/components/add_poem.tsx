import { PoemsResponse } from "./poem_container"
import { ChangeEvent, useState } from "react"

type AddPoemProps = {
  setPoems: React.Dispatch<React.SetStateAction<PoemsResponse>>
}
export const AddPoem: React.FC<AddPoemProps> = ({ setPoems }) => {
  const [inputData, setInputData] = useState({
    title: "",
    body: "",
    author: "",
  })

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setInputData((currentData) => {
      return { ...currentData, [event.target.id]: event.target.value }
    })
  }

  function handleSubmitPoem() {
    try {
      // This is where you'll implement some data fetching logic to POST a new poem to the API
      console.log(setPoems)
    } catch (error) {
      console.log(error)
    }
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
  )
}
