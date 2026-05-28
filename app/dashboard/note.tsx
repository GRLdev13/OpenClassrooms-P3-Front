import type { NotesDTO } from "~/DTO/NotesDTO";

type NoteProps = {
  note: NotesDTO;
};

export default function Note({ note }: NoteProps) {
  return (
    <li className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition">
      <p className="text-white-800">{note.text}</p>
      {note.tag?.name && (
        <div className="mt-2 text-sm text-gray-600">
          <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded">
            {note.tag.name}
          </span>
        </div>
      )}
    </li>
  );
}
