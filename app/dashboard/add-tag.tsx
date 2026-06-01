import { useState, useEffect } from "react";
import { usePutTagMutation } from "~/services/dashboard-service";
import { Tag, AddTagDTO } from "~/DTO/TagDTO";
import ErrorComponent from "~/helpers/ErrorsComponent";

type TagsProps = {
  tags: AddTagDTO[];
};

export default function AddTag() {
  const [text, setText] = useState("");

  const [putTag, { data, error, isLoading }] = usePutTagMutation();
  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const tagDTO = new AddTagDTO({ name: text });
    //use mutation for manual api call
    await putTag(tagDTO).unwrap();
  };

  return (
    <form onSubmit={(x) => handleSubmit(x)}>
      <textarea
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="Add a tag"
        required
      />
      <label htmlFor="tags">Tags</label>
      {error && <ErrorComponent error={error} />}
      <button type="submit" style={{ backgroundColor: "blue", color: "white" }}>
        Submit
      </button>
    </form>
  );
}
