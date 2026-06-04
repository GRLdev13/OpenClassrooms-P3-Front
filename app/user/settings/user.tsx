import { useState, useEffect } from "react";
import type { FormEvent } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { UpdateUserDTO } from "~/DTO/UserDTO";
import ErrorComponent from "~/helpers/ErrorsComponent";
import { useUpdateUserMutation } from "~/services/dashboard-service";
import { setUser } from "~/stores/userSlice";
import DeleteUserConfirmationPopup from "~/user/settings/deleteConfirmationPopup";

export default function UpdateUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [putUserUser, { error, isLoading }] = useUpdateUserMutation();
  const dispatch = useDispatch();

  // Get user info from Redux store
  const storedEmail = useSelector((state: any) => state.user.email);
  const storedName = useSelector((state: any) => state.user.name);

  // Initialize form with stored user data
  useEffect(() => {
    if (storedEmail) {
      setEmail(storedEmail);
    }
    if (storedName) {
      setName(storedName);
    }
  }, [storedEmail, storedName]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSuccessMessage("");

    const userDTO = new UpdateUserDTO({
      name,
      new_email: email, //if user entered something
      old_email: storedEmail, //old email for loggin in sake
    });

    try {
      await putUserUser(userDTO).unwrap();

      dispatch(
        setUser({
          email: storedEmail != email ? email : storedEmail,
          name: userDTO.name,
        }),
      ); //requires news login ? or re-fetch login directly from back-end
      setSuccessMessage("Profile updated successfully.");
    } catch (error) {}
  };

  return (
    <>
      <div>
        <h2 className="text-sm font-medium text-zinc-800 dark:text-white">
          Profile information
        </h2>
        <p className="mt-2 text-sm text-zinc-500 dark:text-white/70">
          Update your name and email address
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-6 flex w-full max-w-lg flex-col gap-6"
      >
        <div>
          <label
            htmlFor="name"
            className="mb-3 inline-flex items-center text-sm font-medium text-zinc-800 dark:text-white"
          >
            Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
              setSuccessMessage("");
            }}
            required
            className="block h-10 w-full rounded-lg border border-zinc-200 border-b-zinc-300/80 bg-white px-3 py-2 text-base leading-[1.375rem] text-zinc-700 shadow-xs placeholder-zinc-400 disabled:text-zinc-500 dark:border-white/10 dark:bg-white/10 dark:text-zinc-300 dark:placeholder-zinc-400 sm:text-sm"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="mb-3 inline-flex items-center text-sm font-medium text-zinc-800 dark:text-white"
          >
            Email address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              setSuccessMessage("");
            }}
            required
            className="block h-10 w-full rounded-lg border border-zinc-200 border-b-zinc-300/80 bg-white px-3 py-2 text-base leading-[1.375rem] text-zinc-700 shadow-xs placeholder-zinc-400 disabled:text-zinc-500 dark:border-white/10 dark:bg-white/10 dark:text-zinc-300 dark:placeholder-zinc-400 sm:text-sm"
          />
        </div>

        {error && <ErrorComponent error={error} />}
        {successMessage && (
          <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
            {successMessage}
          </p>
        )}

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex h-10 items-center justify-center rounded-lg border border-black/10 bg-zinc-900 px-4 text-sm font-medium text-white shadow-xs transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-75 dark:border-0 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            {isLoading ? "Updating..." : "Save"}
          </button>
          <button
            type="button"
            onClick={() => setShowDeletePopup(true)}
            className="inline-flex h-10 items-center justify-center rounded-lg bg-red-500 px-4 text-sm font-medium text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-75"
          >
            Delete user
          </button>
        </div>
      </form>

      {showDeletePopup && (
        <DeleteUserConfirmationPopup
          email={storedEmail}
          onClose={() => setShowDeletePopup(false)}
        />
      )}
    </>
  );
}
