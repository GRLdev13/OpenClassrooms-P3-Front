import { useState } from "react";
import type { FormEvent } from "react";

import { useUpdateUserPasswordMutation } from "~/services/dashboard-service";
import ErrorComponent from "~/views/helpers/ErrorsComponent";
import { UpdateUserPasswordDTO } from "~/DTO/UserDTO";

export default function Password() {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [putPassword, { error, isLoading }] = useUpdateUserPasswordMutation();

  const passwordsMatch = newPassword === confirmPassword;
  const isPasswordLongEnough = newPassword.length >= 8;
  const isPasswordValid =
    newPassword.length > 0 &&
    confirmPassword.length > 0 &&
    passwordsMatch &&
    isPasswordLongEnough;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSuccessMessage("");

    const updateUserPassword = new UpdateUserPasswordDTO({
      confirm_password: confirmPassword,
      new_password: newPassword,
      password: password,
      email: (localStorage.getItem("email") as string) || "ff",
    });

    await putPassword(updateUserPassword).unwrap();
    setPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setSuccessMessage("Password updated successfully.");
  };

  return (
    <>
      <div>
        <h2 className="text-sm font-medium text-zinc-800 dark:text-white">
          Update password
        </h2>
        <p className="mt-2 text-sm text-zinc-500 dark:text-white/70">
          Ensure your account is using a long, random password to stay secure
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-6 flex w-full max-w-lg flex-col gap-6"
      >
        <div>
          <label
            htmlFor="currentPassword"
            className="mb-3 inline-flex items-center text-sm font-medium text-zinc-800 dark:text-white"
          >
            Current password
          </label>
          <input
            id="currentPassword"
            type="password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
              setSuccessMessage("");
            }}
            required
            autoComplete="current-password"
            className="block h-10 w-full rounded-lg border border-zinc-200 border-b-zinc-300/80 bg-white px-3 py-2 text-base leading-[1.375rem] text-zinc-700 shadow-xs placeholder-zinc-400 disabled:text-zinc-500 dark:border-white/10 dark:bg-white/10 dark:text-zinc-300 dark:placeholder-zinc-400 sm:text-sm"
          />
        </div>

        <div>
          <label
            htmlFor="newPassword"
            className="mb-3 inline-flex items-center text-sm font-medium text-zinc-800 dark:text-white"
          >
            New password
          </label>
          <div className="flex gap-2 max-sm:flex-col">
            <input
              id="newPassword"
              type={showPassword ? "text" : "password"}
              value={newPassword}
              onChange={(event) => {
                setNewPassword(event.target.value);
                setSuccessMessage("");
              }}
              required
              autoComplete="new-password"
              className="block h-10 min-w-0 flex-1 rounded-lg border border-zinc-200 border-b-zinc-300/80 bg-white px-3 py-2 text-base leading-[1.375rem] text-zinc-700 shadow-xs placeholder-zinc-400 disabled:text-zinc-500 dark:border-white/10 dark:bg-white/10 dark:text-zinc-300 dark:placeholder-zinc-400 sm:text-sm"
            />
            <button
              type="button"
              onClick={() => setShowPassword((value) => !value)}
              className="inline-flex h-10 items-center justify-center rounded-lg bg-transparent px-4 text-sm font-medium text-zinc-500 transition hover:bg-zinc-800/5 hover:text-zinc-800 dark:text-white/80 dark:hover:bg-white/15 dark:hover:text-white"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        <div>
          <label
            htmlFor="confirmPassword"
            className="mb-3 inline-flex items-center text-sm font-medium text-zinc-800 dark:text-white"
          >
            Confirm password
          </label>
          <input
            id="confirmPassword"
            type={showPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(event) => {
              setConfirmPassword(event.target.value);
              setSuccessMessage("");
            }}
            required
            autoComplete="new-password"
            className="block h-10 w-full rounded-lg border border-zinc-200 border-b-zinc-300/80 bg-white px-3 py-2 text-base leading-[1.375rem] text-zinc-700 shadow-xs placeholder-zinc-400 disabled:text-zinc-500 dark:border-white/10 dark:bg-white/10 dark:text-zinc-300 dark:placeholder-zinc-400 sm:text-sm"
          />
        </div>

        {newPassword.length > 0 && !isPasswordLongEnough && (
          <div className="text-sm font-medium text-red-500 dark:text-red-400">
            Password must be at least 8 characters
          </div>
        )}

        {newPassword.length > 0 &&
          confirmPassword.length > 0 &&
          !passwordsMatch && (
            <div className="text-sm font-medium text-red-500 dark:text-red-400">
              Passwords do not match
            </div>
          )}

        {error && <ErrorComponent error={error} />}
        {successMessage && (
          <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
            {successMessage}
          </p>
        )}

        <button
          type="submit"
          disabled={isLoading || !isPasswordValid}
          className="inline-flex h-10 w-fit items-center justify-center rounded-lg border border-black/10 bg-zinc-900 px-4 text-sm font-medium text-white shadow-xs transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-75 dark:border-0 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
        >
          {isLoading ? "Updating..." : "Save"}
        </button>
      </form>
    </>
  );
}
