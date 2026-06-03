import { useState, useEffect } from "react";
import type { DashBoardDTO } from "~/DTO/DashboardDTO";
import { useGetDashboardQuery } from "~/services/dashboard-service";
import NotesList from "./notes-list";
import AddNote from "./add-note";
import AddTag from "./add-tag";
import ErrorComponent from "~/helpers/ErrorsComponent";
import { clearUser } from "~/stores/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

export default function Dashboards() {
  const { data, error, isLoading, refetch } = useGetDashboardQuery("dashboard");
  const [dashboard, setDashboard] = useState<DashBoardDTO | null>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    dispatch(clearUser());
    navigate("/login");
  };

  useEffect(() => {
    if (!isLoading && data) {
      setDashboard(data);
    }
  }, [data, isLoading]);

  if (error) {
    return <ErrorComponent error={error} />;
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center pt-16 pb-4 h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="flex items-center justify-center pt-16 pb-4">
      <div className="w-full max-w-2xl">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <button
          onClick={logout}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
        >
          loggout
        </button>
        {dashboard?.tags && dashboard?.tags.length > 0 ? (
          <AddNote tags={dashboard?.tags} onNoteCreated={refetch}></AddNote>
        ) : (
          <></>
        )}
        <AddTag></AddTag>
        {dashboard?.notes && dashboard?.notes.length > 0 ? (
          <NotesList notes={dashboard.notes} onNoteDeleted={refetch} />
        ) : (
          <div className="text-center">
            <p className="text-gray-500 mb-4">No notes available</p>
          </div>
        )}
      </div>
    </main>
  );
}
