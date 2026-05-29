import { useState } from "react";
import { DeleteNoteDTO } from "~/DTO/NotesDTO";
import type { NotesDTO } from "~/DTO/NotesDTO";
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
      setErrorMessage("Unable to delete note");
    }
  };

  return (
    <li className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition">
      <p className="text-white-800">{note.text}</p>
      {note.tag?.name && (
        <div className="mt-2 text-sm text-gray-600">
          <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded">
            {note.tag.name}
          </span>
          <button
            type="button"
            onClick={handleDelete}
            disabled={isLoading}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
          >
            {isLoading ? "Deleting..." : "Delete"}
          </button>
          {errorMessage ? <div style={{ color: "red" }}>{errorMessage}</div> : null}
        </div>
      )}
    </li>
  );
}
