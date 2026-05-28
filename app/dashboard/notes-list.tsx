import type { NotesDTO } from "~/DTO/NotesDTO";
import Note from "./note";

type NotesListProps = {
  notes: NotesDTO[];
};

export default function NotesList({ notes }: NotesListProps) {
  return (
    <ul className="space-y-3">
      {notes.map((note, index) => (
        <Note key={note.tag?.id ? `${note.tag.id}-${index}` : index} note={note} />
      ))}
    </ul>
  );
}
