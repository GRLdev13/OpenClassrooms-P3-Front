import { useState } from "react";
import { AddNotesDTO, NotesDTO } from "~/DTO/NotesDTO";
import { usePutNoteMutation } from "~/services/dashboard-service";
import type { ReceiveTagDTO, AddTagDTO } from "~/DTO/TagDTO";

type TagsProps = {
  tags: ReceiveTagDTO[];
  onNoteCreated: () => void;
};

export default function AddNote({ tags, onNoteCreated }: TagsProps) {
  const [text, setText] = useState("");
  const [selectedTagId, setSelectedTagId] = useState("");
  
  const [putNote, { error, isLoading }] = usePutNoteMutation();
  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const p_id_tag = Number.parseInt(selectedTagId);
    const selectedTag = tags.find((x) => x.id === p_id_tag);
    if (!selectedTag) {
      return;
    }

    const noteDTO = new AddNotesDTO({text:text, tag_id:p_id_tag});

    try {
      await putNote(noteDTO).unwrap();
      setText("");
      setSelectedTagId("");
      onNoteCreated();
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
