import { Link, NavLink } from "react-router";
import { useSelector } from "react-redux";

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
              d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
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
            <path d="M13.024 9.25c.47 0 .827-.433.637-.863a4 4 0 0 0-4.094-2.364c-.468.05-.665.576-.43.984l1.08 1.868a.75.75 0 0 0 .649.375h2.158ZM7.84 7.758c-.236-.408-.79-.5-1.068-.12A3.982 3.982 0 0 0 6 10c0 .884.287 1.7.772 2.363.278.38.832.287 1.068-.12l1.078-1.868a.75.75 0 0 0 0-.75L7.839 7.758ZM9.138 12.993c-.235.408-.039.934.43.984a4 4 0 0 0 4.094-2.364c.19-.43-.168-.863-.638-.863h-2.158a.75.75 0 0 0-.65.375l-1.078 1.868Z" />
            <path
              fillRule="evenodd"
              d="m14.13 4.347.644-1.117a.75.75 0 0 0-1.299-.75l-.644 1.116a6.954 6.954 0 0 0-2.081-.556V1.75a.75.75 0 0 0-1.5 0v1.29a6.954 6.954 0 0 0-2.081.556L6.525 2.48a.75.75 0 1 0-1.3.75l.645 1.117A7.04 7.04 0 0 0 4.347 5.87L3.23 5.225a.75.75 0 1 0-.75 1.3l1.116.644A6.954 6.954 0 0 0 3.04 9.25H1.75a.75.75 0 0 0 0 1.5h1.29c.078.733.27 1.433.556 2.081l-1.116.645a.75.75 0 1 0 .75 1.298l1.117-.644a7.04 7.04 0 0 0 1.523 1.523l-.645 1.117a.75.75 0 1 0 1.3.75l.644-1.116a6.954 6.954 0 0 0 2.081.556v1.29a.75.75 0 0 0 1.5 0v-1.29a6.954 6.954 0 0 0 2.081-.556l.645 1.116a.75.75 0 0 0 1.299-.75l-.645-1.117a7.042 7.042 0 0 0 1.523-1.523l1.117.644a.75.75 0 0 0 .75-1.298l-1.116-.645a6.954 6.954 0 0 0 .556-2.081h1.29a.75.75 0 0 0 0-1.5h-1.29a6.954 6.954 0 0 0-.556-2.081l1.116-.644a.75.75 0 0 0-.75-1.3l-1.117.645a7.04 7.04 0 0 0-1.524-1.523ZM10 4.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11Z"
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
            d="M3 4.25A2.25 2.25 0 0 1 5.25 2h5.5A2.25 2.25 0 0 1 13 4.25v2a.75.75 0 0 1-1.5 0v-2a.75.75 0 0 0-.75-.75h-5.5a.75.75 0 0 0-.75.75v11.5c0 .414.336.75.75.75h5.5a.75.75 0 0 0 .75-.75v-2a.75.75 0 0 1 1.5 0v2A2.25 2.25 0 0 1 10.75 18h-5.5A2.25 2.25 0 0 1 3 15.75V4.25Z"
            clipRule="evenodd"
          />
          <path
            fillRule="evenodd"
            d="M6 10a.75.75 0 0 1 .75-.75h9.546l-1.048-.943a.75.75 0 1 1 1.004-1.114l2.5 2.25a.75.75 0 0 1 0 1.114l-2.5 2.25a.75.75 0 1 1-1.004-1.114l1.048-.943H6.75A.75.75 0 0 1 6 10Z"
            clipRule="evenodd"
          />
        </svg>
        <span>Log Out</span>
      </button>
    </aside>
  );
}
