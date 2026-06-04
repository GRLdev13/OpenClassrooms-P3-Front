import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { DeleteUserDTO } from "~/DTO/UserDTO";
import ErrorComponent from "~/helpers/ErrorsComponent";
import { useDeleteUserMutation } from "~/services/dashboard-service";
import { clearUser } from "~/stores/userSlice";

type DeleteUserConfirmationPopupProps = {
  email: string;
  onClose: () => void;
};

export default function DeleteUserConfirmationPopup({
  email,
  onClose,
}: DeleteUserConfirmationPopupProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [deleteUser, { error, isLoading }] = useDeleteUserMutation();
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password !== passwordConfirmation) {
      setPasswordError("Passwords must match.");
      return;
    }

    setPasswordError("");

    const deleteUserDTO = new DeleteUserDTO({
      email,
      password,
      passwordConfirmation,
    });

    try {
      await deleteUser(deleteUserDTO).unwrap();
      onClose();
      dispatch(clearUser());
      navigate("/login");
    } catch (error) {
      console.log("error?", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/60 px-4 backdrop-blur-sm">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-xl border border-zinc-200 bg-white p-6 shadow-xl dark:border-zinc-700 dark:bg-zinc-900"
      >
        <div className="mb-6 flex items-start gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-500/15 dark:text-red-400">
            <svg
              className="size-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.515 2.625H3.72c-1.345 0-2.188-1.458-1.515-2.625l6.28-10.875ZM10 5.5a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 10 5.5Zm0 8a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
                clipRule="evenodd"
              />
            </svg>
          </div>

          <div>
            <h2 className="text-lg font-medium text-zinc-900 dark:text-white">
              Delete account
            </h2>
            <p className="mt-2 text-sm text-zinc-500 dark:text-white/70">
              This action is permanent. Confirm your password to delete your
              account and all associated data.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-medium text-zinc-800 dark:text-white">
              Confirm credentials
            </p>
            <button
              type="button"
              onClick={() => setShowPassword((value) => !value)}
              className="inline-flex h-8 items-center justify-center rounded-md bg-transparent px-3 text-sm font-medium text-zinc-500 transition hover:bg-zinc-800/5 hover:text-zinc-800 dark:text-zinc-400 dark:hover:bg-white/15 dark:hover:text-white"
            >
              {showPassword ? "Hide passwords" : "Show passwords"}
            </button>
          </div>

          <div>
            <label
              htmlFor="delete-password"
              className="mb-3 inline-flex items-center text-sm font-medium text-zinc-800 dark:text-white"
            >
              Password
            </label>
            <input
              id="delete-password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              autoComplete="current-password"
              className="block h-10 w-full rounded-lg border border-zinc-200 border-b-zinc-300/80 bg-white px-3 py-2 text-base leading-[1.375rem] text-zinc-700 shadow-xs placeholder-zinc-400 disabled:text-zinc-500 dark:border-white/10 dark:bg-white/10 dark:text-zinc-300 dark:placeholder-zinc-400 sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="delete-password-confirmation"
              className="mb-3 inline-flex items-center text-sm font-medium text-zinc-800 dark:text-white"
            >
              Confirm password
            </label>
            <input
              id="delete-password-confirmation"
              type={showPassword ? "text" : "password"}
              value={passwordConfirmation}
              onChange={(event) => setPasswordConfirmation(event.target.value)}
              required
              autoComplete="current-password"
              className="block h-10 w-full rounded-lg border border-zinc-200 border-b-zinc-300/80 bg-white px-3 py-2 text-base leading-[1.375rem] text-zinc-700 shadow-xs placeholder-zinc-400 disabled:text-zinc-500 dark:border-white/10 dark:bg-white/10 dark:text-zinc-300 dark:placeholder-zinc-400 sm:text-sm"
            />
          </div>

          {passwordError && (
            <p className="text-sm font-medium text-red-500 dark:text-red-400">
              {passwordError}
            </p>
          )}
          {error && <ErrorComponent error={error} />}

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="inline-flex h-10 items-center justify-center rounded-lg border border-zinc-200 bg-white px-4 text-sm font-medium text-zinc-700 shadow-xs transition hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-75 dark:border-white/10 dark:bg-white/10 dark:text-zinc-300 dark:hover:bg-white/15"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex h-10 items-center justify-center rounded-lg bg-red-500 px-4 text-sm font-medium text-white shadow-xs transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-75"
            >
              {isLoading ? "Deleting..." : "Delete account"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
