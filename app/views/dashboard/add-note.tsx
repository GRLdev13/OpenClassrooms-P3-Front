import { useState } from "react";
import type { FormEvent } from "react";
import { AddNotesDTO } from "~/DTO/NotesDTO";
import { usePutNoteMutation } from "~/services/dashboard-service";
import type { ReceiveTagDTO } from "~/DTO/TagDTO";

type TagsProps = {
  tags: ReceiveTagDTO[];
  onNoteCreated: () => void;
};

export default function AddNote({ tags, onNoteCreated }: TagsProps) {
  const [text, setText] = useState("");
  const [selectedTagId, setSelectedTagId] = useState("");
  const [putNote, { error, isLoading }] = usePutNoteMutation();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const p_id_tag = Number.parseInt(selectedTagId);
    const selectedTag = tags.find((x) => x.id === p_id_tag);
    if (!selectedTag) {
      return;
    }

    const noteDTO = new AddNotesDTO({ text: text, tag_id: p_id_tag });

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
    <form onSubmit={handleSubmit} className="space-y-2">
      <textarea
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="Write your note..."
        required
        className="min-h-28 w-full rounded-lg border border-neutral-200 bg-white p-2 text-sm text-zinc-800 placeholder-zinc-400 outline-none transition focus:border-blue-500 dark:border-neutral-700 dark:bg-neutral-950 dark:text-white dark:placeholder-zinc-500"
      />

      <label
        htmlFor="tags"
        className="inline-flex items-center text-sm font-medium text-zinc-800 dark:text-white"
      >
        Tags
      </label>
      <select
        id="tags"
        value={selectedTagId}
        onChange={(event) => setSelectedTagId(event.target.value)}
        required
        className="w-full rounded-lg border border-neutral-200 bg-white p-2 text-sm text-zinc-800 outline-none transition focus:border-blue-500 dark:border-neutral-700 dark:bg-neutral-950 dark:text-white"
      >
        <option value="">-- Select Tag --</option>
        {tags.map((tag) => (
          <option key={tag.id} value={tag.id}>
            {tag.name}
          </option>
        ))}
      </select>

      {error ? (
        <div className="text-sm font-medium text-red-500 dark:text-red-400">
          Unable to save note
        </div>
      ) : null}
      <button
        type="submit"
        disabled={isLoading}
        className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-neutral-400"
      >
        {isLoading ? "Saving..." : "Add Note"}
      </button>
    </form>
  );
}
