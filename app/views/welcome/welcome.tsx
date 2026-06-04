import { Link } from "react-router";

const navLinks = [
  { to: "/dashboards", label: "Dashboards" },
  { to: "/login", label: "Login" },
  { to: "/register", label: "Register" },
  { to: "/settings", label: "Settings" },
];

export function Welcome() {
  return (
    <div className="min-h-screen bg-[#FDFDFC] py-6 dark:bg-[#0a0a0a]">
      <header className="mx-auto mb-6 w-full max-w-[335px] px-4 pt-6 text-sm lg:max-w-4xl">
        <nav className="flex items-center justify-between gap-4">
          <Link
            className="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm font-medium leading-normal text-[#1b1b18] hover:border-[#19140035] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]"
            to="/"
          >
            Renote
          </Link>
          <ul className="flex items-center gap-4">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link
                  className="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#19140035] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]"
                  to={link.to}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <div className="flex w-full items-center justify-center opacity-100 transition-opacity duration-750 starting:opacity-0 lg:grow">
        <main className="flex w-full max-w-[335px] flex-col-reverse lg:max-w-4xl lg:flex-row">
          <div className="flex-1 rounded-ee-lg rounded-es-lg bg-white p-6 pb-12 text-[13px] leading-[20px] shadow-[inset_0px_0px_0px_1px_rgba(26,26,0,0.16)] dark:bg-[#161615] dark:text-[#EDEDEC] dark:shadow-[inset_0px_0px_0px_1px_#fffaed2d] lg:rounded-ee-none lg:rounded-ss-lg lg:p-20">
            <h1 className="mb-1 font-medium">Renote</h1>
            <p className="mb-2 text-[#706f6c] dark:text-[#A1A09A]">
              Renote is the best application to take notes.
              <br />
              Create, save, delete your notes.
              <br />
              Add tags to your notes.
            </p>
          </div>
          <div className="relative -mb-px aspect-[335/376] w-full shrink-0 overflow-hidden rounded-t-lg bg-[#fff2f2] dark:bg-[#1D0002] lg:-ms-px lg:mb-0 lg:aspect-auto lg:w-[438px] lg:rounded-e-lg! lg:rounded-t-none">
            <svg
              width="300"
              height="300"
              viewBox="0 0 300 300"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="layerGradient" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#FFD700" />
                  <stop offset="100%" stopColor="#FF69B4" />
                </linearGradient>
              </defs>
              <path
                d="M78 258V58H158C208 58 238 88 238 128C238 158 218 183 188 193L243 258H198L153 203H118V258H78Z
                M118 88V173H158C183 173 198 158 198 128C198 98 183 88 158 88H118Z"
                fill="black"
                opacity="0.5"
                transform="translate(8,8)"
              />
              <path
                d="M70 250V50H150C200 50 230 80 230 120C230 150 210 175 180 185L235 250H190L145 195H110V250H70Z
                M110 80V165H150C175 165 190 150 190 120C190 90 175 80 150 80H110Z"
                fill="url(#layerGradient)"
                stroke="#1B1B18"
                strokeWidth="4"
              />
            </svg>

            <div className="absolute inset-0 rounded-t-lg shadow-[inset_0px_0px_0px_1px_rgba(26,26,0,0.16)] dark:shadow-[inset_0px_0px_0px_1px_#fffaed2d] lg:rounded-e-lg lg:rounded-t-none"></div>
          </div>
        </main>
      </div>
    </div>
  );
}
