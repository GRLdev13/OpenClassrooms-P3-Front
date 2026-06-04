import { useState } from "react";
import Password from "./password";
import UpdateUser from "./user";
import Appeareance from "./appearance";

export default function MenuSelector() {
  const [index, setIndex] = useState(0);
  const settingsTabs = ["Profile", "Password", "Appearance"];
  
  return (
    <div className="[grid-area:main] min-h-screen flex-1 bg-white p-6 dark:bg-zinc-950 lg:p-8">
      <section className="w-full">
        <div className="relative mb-6 w-full">
          <h1 className="text-2xl font-medium text-zinc-800 dark:text-white">
            Settings
          </h1>
          <p className="mb-6 mt-2 text-base text-zinc-500 dark:text-white/70">
            Manage your profile and account settings
          </p>
          <div className="h-px w-full bg-zinc-800/5 dark:bg-white/10" />
        </div>

        <div className="flex items-start max-md:flex-col">
          <div className="me-10 w-full pb-4 md:w-[220px]">
            <nav className="flex flex-col overflow-visible">
              {settingsTabs.map((tab, tabIndex) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setIndex(tabIndex)}
                  className={[
                    "my-px flex h-10 w-full items-center gap-3 rounded-lg px-3 text-start text-sm font-medium transition lg:h-8",
                    index === tabIndex
                      ? "bg-zinc-800/[4%] text-zinc-800 dark:bg-white/[7%] dark:text-white"
                      : "text-zinc-500 hover:bg-zinc-800/[4%] hover:text-zinc-800 dark:text-white/80 dark:hover:bg-white/[7%] dark:hover:text-white",
                  ].join(" ")}
                >
                  <span className="flex-1 whitespace-nowrap leading-none">
                    {tab}
                  </span>
                </button>
              ))}
            </nav>
          </div>

          <div className="h-px w-full bg-zinc-800/15 dark:bg-white/20 md:hidden" />

          <div className="flex-1 self-stretch max-md:pt-6">
            {index === 0 && <UpdateUser />}
            {index === 1 && <Password />}
            {index === 2 && <Appeareance />}
          </div>
        </div>
      </section>
    </div>
  );
}
