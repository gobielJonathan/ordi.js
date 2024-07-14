import { useState } from "react";
import { useFetch } from "ordijs/fetch";
import { AppComponentType } from "ordijs/core";

const Detail: AppComponentType = () => {
  const [id, setId] = useState(1);

  const { data: detail, loading } = useFetch({
    fetchKey: ["todos", id],
    fetcher: () =>
      fetch(`https://jsonplaceholder.typicode.com/todos/${id}`).then((res) =>
        res.json()
      ),
    ssr: false,
    onSuccess(data) {
      console.log("success", data);
    },
  });

  return (
    <>
      {loading && <p>loading detail...</p>}
      <p>content : {JSON.stringify(detail)}</p>
      <button
        onClick={() => {
          setId(Math.floor(Math.random() * 40 + 1));
        }}
      >
        random id
      </button>

      <button
        onClick={() => {
          setId(1);
        }}
      >
        set id to 1
      </button>
    </>
  );
};

export default Detail;
