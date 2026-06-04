import { useState } from "react";
import type { FormEvent } from "react";
import { usePutTagMutation } from "~/services/dashboard-service";
import { AddTagDTO } from "~/DTO/TagDTO";
import ErrorComponent from "~/helpers/ErrorsComponent";

type AddTagProps = {
  onTagCreated: () => void;
};

export default function AddTag({ onTagCreated }: AddTagProps) {
  const [text, setText] = useState("");

  const [putTag, { error, isLoading }] = usePutTagMutation();
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const tagDTO = new AddTagDTO({ name: text });
    await putTag(tagDTO).unwrap();
    setText("");
    onTagCreated();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <input
        type="text"
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="New tag name"
        required
        className="w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm text-zinc-800 placeholder-zinc-400 outline-none transition focus:border-blue-500 dark:border-neutral-700 dark:bg-neutral-950 dark:text-white dark:placeholder-zinc-500"
      />
      {error && <ErrorComponent error={error} />}
      <button
        type="submit"
        disabled={isLoading}
        className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-neutral-400"
      >
        {isLoading ? "Adding..." : "Add Tag"}
      </button>
    </form>
  );
}
