import type { Route } from "./+types/team";
import { DashBoardDTO } from "~/DTO/DashboardDTO";
import { NotesDTO } from "~/DTO/DashboardDTO";
import { useGetDashboardQuery } from "~/services/dashboard";

// State type
interface DashboardState {
  dashboard: DashBoardDTO | null;
  loading: boolean;
  error: string | null;
}

export default function Dashboards({ loaderData }: Route.ComponentProps) {

  const { data, error, isLoading } = useGetDashboardQuery('bulbasaur');
  console.log("fetch stuffs?");
  console.log(data);
  console.log(error);
  
  //TODO: handle states
  if (error) {
    return (
      <main className="flex items-center justify-center pt-16 pb-4">
        <div className="text-center">
          <div className="text-red-500 mb-4">Error:</div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex items-center justify-center pt-16 pb-4">
      <div className="w-full max-w-2xl">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        {data?.Notes && data?.Notes.length > 0 ? (
          <NotesList notes={data.Notes} />
        ) : (
          <p className="text-gray-500">No notes available</p>
        )}
      </div>
    </main>
  );
}

// Notes list component
const NotesList = ({ notes }: { notes: NotesDTO[] }) => {
  return (
    <ul className="space-y-3">
      {notes.map((note, index) => (
        <li
          key={index}
          className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition"
        >
          <p className="text-gray-800">{note.text}</p>
          {note.tag?.name && (
            <div className="mt-2 text-sm text-gray-600">
              <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded">
                {note.tag.name}
              </span>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};


// HydrateFallback is rendered while the client loader is running
export function HydrateFallback() {
  return (
    <div className="flex items-center justify-center pt-16 pb-4 h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading dashboard...</p>
      </div>
    </div>
  );
}
