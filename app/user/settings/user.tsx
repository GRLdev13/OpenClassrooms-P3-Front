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

    const userDTO = new UpdateUserDTO({
      name,
      new_email: email, //if user entered something
      old_email: storedEmail //old email for loggin in sake
    });

    try {
      await putUserUser(userDTO).unwrap();

        dispatch(setUser({ email: storedEmail != email ? email : storedEmail, name: userDTO.name })); //requires news login ? or re-fetch login directly from back-end
    } catch (error) {}
  };

  return (
    <main className="flex items-center justify-center pt-16 pb-4">
      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-md flex-col gap-4"
      >
        <h1 className="text-2xl font-bold">Update User</h1>

        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
          className="rounded border border-gray-300 px-3 py-2"
        />

        <label htmlFor="email">Email address</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
          className="rounded border border-gray-300 px-3 py-2"
        />

        {error && <ErrorComponent error={error} />}

        <button
          type="submit"
          disabled={isLoading}
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isLoading ? "Updating..." : "Update user"}
        </button>
        <button
          type="button"
          onClick={() => setShowDeletePopup(true)}
          className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Delete user
        </button>
      </form>

      {showDeletePopup && (
        <DeleteUserConfirmationPopup
          email={storedEmail}
          onClose={() => setShowDeletePopup(false)}
        />
      )}
    </main>
  );
}
