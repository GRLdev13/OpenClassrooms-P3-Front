import { useState, useEffect } from "react";
import { NotesDTO } from "~/DTO/NotesDTO";
import { usePutNoteQuery } from "~/services/dashboard-service";
import { TagDTO } from "~/DTO/TagDTO";

type TagsProps = {
  tags: TagDTO[];
};

export default function AddNote({ tags }: TagsProps) {
  const [dashboard, setNote] = useState<NotesDTO | null>(null);
  const [text, setText] = useState("");
  const [selectedTagId, setSelectedTagId] = useState("");

  const handleSubmit = async () => {
    const { data, error, isLoading, refetch } = usePutNoteQuery("dashboard");
    const selectedTag = tags.find((x) => x.id === selectedTagId);
    if (!selectedTag) {
      return;
    }

    const noteDTO = new NotesDTO();
    noteDTO.text = text;
    noteDTO.tag = selectedTag;

    const handleRetry = () => {
      console.log("retry called");
      refetch();
    };

    useEffect(() => {
      if (!isLoading && data) {
        console.log("fetch stuffs:", data);
        setNote(data);
      }
    }, [data, isLoading]);

    if (error) {
      console.log("error:", error);
    }

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

        <button
          type="submit"
          style={{ backgroundColor: "blue", color: "white" }}
        >
          Submit
        </button>
      </form>
    );
  };
}
