import type { NotesDTO } from "~/DTO/NotesDTO";
import Note from "./note";

type NotesListProps = {
  notes: NotesDTO[];
  onNoteDeleted: () => void;
};

export default function NotesList({ notes, onNoteDeleted }: NotesListProps) {
  return (
    <ul className="space-y-3">
      {notes.map((note, index) => (
        <Note
          key={note.id ? note.id : index}
          note={note}
          onNoteDeleted={onNoteDeleted}
        />
      ))}
    </ul>
  );
}
