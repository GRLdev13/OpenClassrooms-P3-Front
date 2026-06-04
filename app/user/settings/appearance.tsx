export default function Appeareance() {
  return (
    <div>
      <h2 className="text-sm font-medium text-zinc-800 dark:text-white">
        Appearance
      </h2>
      <p className="mt-2 text-sm text-zinc-500 dark:text-white/70">
        Choose how Renote looks on this device
      </p>

      <div className="mt-6 w-full max-w-lg">
        <label
          htmlFor="appearance"
          className="mb-3 inline-flex items-center text-sm font-medium text-zinc-800 dark:text-white"
        >
          Theme
        </label>
        <select
          id="appearance"
          className="block h-10 w-full rounded-lg border border-zinc-200 border-b-zinc-300/80 bg-white px-3 py-2 text-base leading-[1.375rem] text-zinc-700 shadow-xs dark:border-white/10 dark:bg-white/10 dark:text-zinc-300 sm:text-sm"
          defaultValue="system"
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="system">System</option>
        </select>
      </div>
    </div>
  );
}
