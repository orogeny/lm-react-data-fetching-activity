import { useEffect, useState } from "react"
import { PoemItem } from "../mock_api/data"
import { PoemsList } from "./poems_list"
import { AddPoem } from "./add_poem"

export interface PoemData extends PoemItem {
  id: number
}
export type PoemsResponse = Array<PoemData>

export const PoemContainer: React.FC = () => {
  const [poems, setPoems] = useState<PoemsResponse>([])

  useEffect(() => {
    async function getPoems() {
      const data = await fetch("/poetriumph.com/api/v1/poems")
      const result: PoemsResponse = await data.json()
      console.log(result)
    }
    getPoems()
  }, [])

  return (
    <>
      <h1>Nature Poems: An Artificial Perspective</h1>
      <AddPoem setPoems={setPoems} />
      <PoemsList poems={poems} />
    </>
  )
}
