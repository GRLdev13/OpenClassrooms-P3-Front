import { useState, useEffect } from "react";
import type { DashBoardDTO } from "~/DTO/DashboardDTO";
import { useGetDashboardQuery } from "~/services/dashboard-service";
import NotesList from "./notes-list";
import AddNote from "./add-note";
import AddTag from "./add-tag";
import SideBar from "./side-bar";
import ErrorComponent from "~/views/helpers/ErrorsComponent";
import { clearUser } from "~/stores/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

export default function Dashboards() {
  const { data, error, isFetching, isLoading, refetch } = useGetDashboardQuery(
    "dashboard",
    { refetchOnMountOrArgChange: true },
  );
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
  }, [data, isLoading, refetch]);

  return (
    <div className="flex min-h-screen bg-white dark:bg-zinc-950">
      <SideBar onLogout={logout} />

      <main className="[grid-area:main] min-h-screen flex-1 p-6 lg:p-8">
        <div className="mx-auto flex h-full w-full max-w-4xl flex-1 flex-col gap-4 rounded-xl">
          <header className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">
                Dashboard
              </h1>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Manage your notes and tags.
              </p>
            </div>
          </header>

          {error ? (
            <ErrorComponent error={error} />
          ) : (
            <>
              <section className="mt-6 rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-700 dark:bg-neutral-900">
                <div className="space-y-4">
                  {dashboard?.tags && dashboard.tags.length > 0 ? (
                    <AddNote
                      tags={dashboard.tags}
                      onNoteCreated={() => {
                        refetch();
                      }}
                    />
                  ) : (
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                      Add a tag before creating your first note.
                    </p>
                  )}

                  <hr className="border-neutral-200 dark:border-neutral-700" />

                  <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
                    Your Notes
                  </h2>

                  {isFetching || isLoading ? (
                    <div className="flex items-center justify-center py-16">
                      <div className="text-center">
                        <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-blue-500"></div>
                        <p className="text-zinc-600 dark:text-zinc-400">
                          Loading your notes...
                        </p>
                      </div>
                    </div>
                  ) : dashboard?.notes && dashboard.notes.length > 0 ? (
                    <NotesList
                      notes={dashboard.notes}
                      onNoteDeleted={() => {
                        refetch();
                      }}
                    />
                  ) : (
                    <div className="rounded-lg border border-dashed border-neutral-200 p-6 text-center dark:border-neutral-700">
                      <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        No notes available
                      </p>
                    </div>
                  )}
                </div>
              </section>

              <section className="mt-6 rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-700 dark:bg-neutral-900">
                <div className="space-y-4">
                  <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
                    Add a tag
                  </h2>
                  <AddTag
                    onTagCreated={() => {
                      refetch();
                    }}
                  />
                </div>
              </section>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
