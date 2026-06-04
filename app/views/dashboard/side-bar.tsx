import { Link, NavLink } from "react-router";
import { useSelector } from "react-redux";
import { sideBarIconPaths } from "~/resources/side-bar-icon-paths";

type SideBarProps = {
  onLogout: () => void;
};

export default function SideBar({ onLogout }: SideBarProps) {
  const name = useSelector((state: any) => state.user.name) || "admin";
  const email = useSelector((state: any) => state.user.email) || "";
  const initial = name.charAt(0).toUpperCase();

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    [
      "my-px flex h-10 w-full items-center gap-3 rounded-lg border px-3 text-start text-sm font-medium transition lg:h-8",
      isActive
        ? "border-zinc-200 bg-white text-zinc-900 dark:border-transparent dark:bg-white/[7%] dark:text-white"
        : "border-transparent text-zinc-500 hover:bg-zinc-800/5 hover:text-zinc-800 dark:text-white/80 dark:hover:bg-white/[7%] dark:hover:text-white",
    ].join(" ");

  return (
    <aside className="[grid-area:sidebar] sticky top-0 z-20 flex max-h-dvh min-h-dvh w-64 shrink-0 flex-col gap-4 overflow-y-auto overscroll-contain border-e border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-900">
      <Link to="/dashboards" className="me-5 flex items-center space-x-2">
        <div className="flex aspect-square size-8 items-center justify-center rounded-md bg-zinc-900 text-white dark:bg-white dark:text-black">
          <span className="text-lg font-semibold leading-none">R</span>
        </div>
        <div className="ms-1 grid flex-1 text-start text-sm">
          <span className="mb-0.5 truncate font-semibold leading-tight text-zinc-900 dark:text-white">
            Renote
          </span>
        </div>
      </Link>

      <nav className="flex flex-col overflow-visible">
        <div className="px-1 py-2">
          <div className="text-xs leading-none text-zinc-400">Platform</div>
        </div>

        <NavLink to="/dashboards" className={navLinkClass}>
          <svg
            className="size-4 shrink-0"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d={sideBarIconPaths.dashboard}
            />
          </svg>
          <span className="flex-1 whitespace-nowrap leading-none">
            Dashboard
          </span>
        </NavLink>

        <NavLink to="/settings" className={navLinkClass}>
          <svg
            className="size-4 shrink-0"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d={sideBarIconPaths.settingsSegments} />
            <path
              fillRule="evenodd"
              d={sideBarIconPaths.settingsCircle}
              clipRule="evenodd"
            />
          </svg>
          <span className="flex-1 whitespace-nowrap leading-none">
            Settings
          </span>
        </NavLink>
      </nav>

      <div className="flex-1" />

      <NavLink to="/settings" className={navLinkClass}>
        <div className="rounded-lg p-1">
          <div className="flex items-center gap-2">
            <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-zinc-200 text-sm font-medium text-zinc-800 dark:bg-zinc-600 dark:text-white">
              {initial}
            </div>
            <div className="min-w-0 flex-1 text-sm leading-tight">
              <p className="truncate font-semibold text-zinc-900 dark:text-white">
                {name}
              </p>
              {email && (
                <p className="truncate text-xs text-zinc-500 dark:text-white/70">
                  {email}
                </p>
              )}
            </div>
          </div>
        </div>
      </NavLink>

      <button
        type="button"
        onClick={onLogout}
        className="flex h-10 w-full items-center gap-3 rounded-lg px-3 text-start text-sm font-medium text-zinc-500 transition hover:bg-zinc-800/5 hover:text-zinc-800 dark:text-white/80 dark:hover:bg-white/[7%] dark:hover:text-white lg:h-8"
      >
        <svg
          className="size-4 shrink-0"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d={sideBarIconPaths.logoutDoor}
            clipRule="evenodd"
          />
          <path
            fillRule="evenodd"
            d={sideBarIconPaths.logoutArrow}
            clipRule="evenodd"
          />
        </svg>
        <span>Log Out</span>
      </button>
    </aside>
  );
}
