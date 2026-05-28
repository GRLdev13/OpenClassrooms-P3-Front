import { useState, useEffect } from "react";
import { NotesDTO } from "~/DTO/NotesDTO";
import { usePutTagQuery } from "~/services/dashboard-service";
import { TagDTO } from "~/DTO/TagDTO";

type TagsProps = {
  tags: TagDTO[];
};

export default function AddTag() {
  const [text, setText] = useState("");

  const handleSubmit = (event : any) => {
    // This line stops the page from refreshing
    event.preventDefault();
    // Invalid hook call: React hooks cannot run inside event handlers.
    // Move usePutTagQuery to the top level of AddTag, or use an RTK Query mutation trigger here instead.
    const { data, error, isLoading, refetch } = usePutTagQuery("dashboard");
     // useEffect(() => {
      //   if (!isLoading && data) {
      //     console.log("fetch stuffs:", data);
      //     // setDashboard(data);
      //   }
      // }, [data, isLoading]);
    
      // if (error) {
      //   console.log("error:", error);
      // }
    // Now you can handle your logic (e.g., API calls, state updates)
    console.log("Form submitted, but page did not reload!");
  };

    return (
      <form onSubmit={x => handleSubmit(x)} >
        <textarea
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="Add a tag"
          required
        />
        <label htmlFor="tags">Tags</label>
        <button
          type="submit"
          style={{ backgroundColor: "blue", color: "white" }}
        >
          Submit
        </button>
      </form>
    );
}

function handleSubmit(e:any) {
  e.preventDefault();
 
}
