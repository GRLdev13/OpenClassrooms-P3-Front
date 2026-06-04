import { useState } from "react";
import { DeleteNoteDTO } from "~/DTO/NotesDTO";
import type { NotesDTO } from "~/DTO/NotesDTO";
import ErrorComponent from "~/helpers/ErrorsComponent";
import { useDeleteNoteMutation } from "~/services/dashboard-service";

type NoteProps = {
  note: NotesDTO;
  onNoteDeleted: () => void;
};

export default function Note({ note, onNoteDeleted }: NoteProps) {
  const [errorMessage, setErrorMessage] = useState("");
  const [deleteNote, { isLoading }] = useDeleteNoteMutation();

  const handleDelete = async () => {
    setErrorMessage("");

    const deleteNoteDTO = new DeleteNoteDTO({ id_note: note.id });

    try {
      await deleteNote(deleteNoteDTO).unwrap();
      onNoteDeleted();
    } catch (error) {
      console.log("error:", error);
      setErrorMessage(error as any);
    }
  };

  return (
    <li className="flex items-start justify-between gap-4 rounded-lg border border-neutral-200 p-3 transition hover:shadow-sm dark:border-neutral-700">
      <div className="min-w-0">
        <p className="text-sm text-zinc-900 dark:text-white">{note.text}</p>
        {note.tag?.name && (
          <small className="mt-2 inline-block text-sm text-zinc-500 dark:text-zinc-400">
            Tag:{" "}
            <span className="rounded bg-blue-100 px-2 py-1 text-blue-800 dark:bg-blue-950 dark:text-blue-200">
            {note.tag.name}
          </span>
          </small>
        )}
        {errorMessage && <ErrorComponent error={errorMessage} />}
      </div>
      <button
        type="button"
        onClick={handleDelete}
        disabled={isLoading}
        className="shrink-0 text-sm font-medium text-red-500 transition hover:text-red-600 disabled:cursor-not-allowed disabled:text-neutral-400"
      >
        {isLoading ? "Deleting..." : "Delete"}
      </button>
    </li>
  );
}
