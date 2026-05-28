import { useState } from "react";
import type { FormEvent } from "react";
import { NotesDTO } from "~/DTO/NotesDTO";
import { usePutNoteMutation } from "~/services/dashboard-service";
import type { TagDTO } from "~/DTO/TagDTO";

type TagsProps = {
  tags: TagDTO[];
};

export default function AddNote({ tags }: TagsProps) {
  const [text, setText] = useState("");
  const [selectedTagId, setSelectedTagId] = useState("");
  
  const [putNote, { error, isLoading }] = usePutNoteMutation();
  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const selectedTag = tags.find((x) => x.id === selectedTagId);
    if (!selectedTag) {
      return;
    }

    const noteDTO = new NotesDTO();
    noteDTO.text = text;
    noteDTO.tag = selectedTag;

    try {
      await putNote(noteDTO).unwrap();
      setText("");
      setSelectedTagId("");
    } catch (error) {
      console.log("error:", error);
    }
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
      <select
        id="tags"
        value={selectedTagId}
        onChange={(event) => setSelectedTagId(event.target.value)}
        required
      >
        <option value="">Tags</option>
        {tags.map((tag) => (
          <option key={tag.id} value={tag.id}>
            {tag.name}
          </option>
        ))}
      </select>

      {error ? <div style={{ color: "red" }}>Unable to save note</div> : null}
      <button
        type="submit"
        disabled={isLoading}
        style={{ backgroundColor: "blue", color: "white" }}
      >
        {isLoading ? "Saving..." : "Submit"}
      </button>
    </form>
  );
}
