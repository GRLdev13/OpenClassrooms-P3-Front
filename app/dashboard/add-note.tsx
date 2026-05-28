import { type FormEvent, useMemo, useState } from "react";
import { NotesDTO } from "~/DTO/NotesDTO";
import { useGetDashboardQuery } from "~/services/dashboard-service";

export default function AddNote() {
  const { data: dashboardDTO } = useGetDashboardQuery("dashboard");
  const tags = useMemo(() => dashboardDTO?.tags ?? [], [dashboardDTO]);
  const [text, setText] = useState("");
  const [selectedTagId, setSelectedTagId] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const selectedTag = tags.find((tag) => tag.id === selectedTagId);
    if (!selectedTag) {
      return;
    }

    const noteDTO = new NotesDTO();
    noteDTO.text = text;
    noteDTO.tag = selectedTag;

    await fetch("http://back.test/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(noteDTO),
    });

    setText("");
    setSelectedTagId("");
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

      <button type="submit" style={{ backgroundColor: "blue", color: "white" }}>
        Submit
      </button>
    </form>
  );
}
