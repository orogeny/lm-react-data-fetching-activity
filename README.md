# The Data Fetching Hands-on Poetry Challenge

## Get it running

- `npm install`
- `npm run dev`

## Tasks

1. In poem_container.tsx, use fetch with useEffect to load the data from the following endpoint:

   > "/poetriumph.com/api/v1/poems"

2. Pass the data from the PoemContainer component to the PoemsList
3. Add a loading state to provide feedback to the user that the poems are loading (there's a component ready for you to use)
4. Add POST functionality to the app – there's a template component, but it doesn't post anything yet.
5. Add PATCH functionality in the `Poem` component, enabling you to (un)like a poem.
6. Refactor your data fetching to use TanStack Query.

   **Extension**

7. TanStack comes with powerful dev environment tooling too. Add the TanStack dev tools to your app, and explore the available options and what's happening under the hood of your queries.

   > This requires a separate `npm install` that isn't presently included in this repo. You can get all the necessary intel here:

   - [TanStack Dev Tools](https://tanstack.com/query/latest/docs/react/devtools)

8. Create a search component that uses debouncing to periodically update the poems list as the user searches.

   > It's up to you whether the search should filter by title, body text, author – or perhaps all three!

9. Axios is generally considered the go-to library for anyone wanting to move beyond `fetch` for data fetching operations in the JavaScript ecosystem. Consider swapping out your fetch methods to use Axios instead.

   - [Axios Documentation](https://axios-http.com/docs/intro)
   - [A Handy Article from FreeCodeCamp](https://www.freecodecamp.org/news/how-to-use-axios-with-react/)

### Useful Documentation

**basic fetching**
[Fetch API:](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)

**using TanStack**
TanStack Query is an incredibly powerful library, and there's a lot to it. Here are a few entry points to get into what it's all about.

- [Quick Start Guide](https://tanstack.com/query/latest/docs/react/quick-start)
- [Query Keys](https://tanstack.com/query/latest/docs/react/guides/query-keys)
- [Important Defaults](https://tanstack.com/query/latest/docs/react/guides/important-defaults)

## The Poetriumph API Guide

Sure, this is just a mock API, built with MirageJs, but it still has a guide!

- GET "/poetriumph.com/api/v1/poems"

  Responds with an array of all poems

```javascript
;[
  {
    id: 1,
    title: "Nature's Ballet",
    body: "Witness petals waltz in breeze, a floral ballet.",
    author: "Lily Bloomfield",
    isLiked: false,
  },
]
```

- POST "/poetriumph.com/api/v1/poems"

  Responds with object of added poem

  Required keys on body: title, body, author

```javascript
// request body
{
    title: "Let's go",
    body: "I see over there a lovely hill. I see it. Let's go.",
    author: "Al D",
}

// response body
{
    id: 10,
    title: "Let's go",
    body: "I see over there a lovely hill. I see it. Let's go.",
    author: "Al D",
    isLiked: false,
  }
```

- PATCH "/poetriumph.com/api/v1/poems"

  Responds with updated poem

  Required keys on body: id, isLiked
