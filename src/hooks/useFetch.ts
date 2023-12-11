import { useEffect, useReducer } from "react";

type State<T> = {
  data: T | null;
  loading: boolean;
  error: Error | null;
};

type Action<T> =
  | { type: "LOADING" }
  | { type: "SUCESS"; payload: T }
  | { type: "ERROR"; payload: Error };

function fetchReducer<T>(state: State<T>, action: Action<T>) {
  if (action.type === "LOADING") {
    return { data: null, loading: true, error: null };
  }

  if (action.type === "SUCESS") {
    return { data: action.payload, loading: false, error: null };
  }

  if (action.type === "ERROR") {
    return { data: null, loading: false, error: action.payload };
  }

  return state;
}

function useFetch<T>(url: string) {
  const [state, dispatch] = useReducer(fetchReducer, {
    data: null,
    loading: false,
    error: null,
  });

  useEffect(() => {
    let didCancel = false;

    async function fetchData() {
      dispatch({ type: "LOADING" });

      try {
        const response = await fetch(url);

        if (!didCancel) {
          if (!response.ok) {
            throw new Error("Data fetch failed");
          }

          const payload = (await response.json()) as T;

          dispatch({ type: "SUCESS", payload });
        }
      } catch (err) {
        if (!didCancel) {
          const error =
            err instanceof Error ? err : new Error("Data fetch failed");

          dispatch({
            type: "ERROR",
            payload: error,
          });
        }
      }
    }

    fetchData();

    return () => {
      didCancel = true;
    };
  }, [url]);

  return { ...state };
}

export default useFetch;
