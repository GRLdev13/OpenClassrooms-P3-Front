import { type FormEvent, useMemo, useState } from "react";
import { NotesDTO } from "~/DTO/NotesDTO";
import { useGetDashboardQuery } from "~/services/dashboard-service";
import { TagDTO } from "~/DTO/TagDTO";

type TagsProps = {
  tags: TagDTO[];
};

export default function AddTag() {

  const [text, setText] = useState("");

  const handleSubmit = async () => {

    const noteDTO = new NotesDTO();
    noteDTO.text = text;

    //Todo: service mapper
    await fetch("http://back.test/tag", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(noteDTO),
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="Write your note"
        required
      />
      <label htmlFor="tags">Tags</label>
      <button type="submit" style={{ backgroundColor: "blue", color: "white" }}>
        Submit
      </button>
    </form>
  );
}
