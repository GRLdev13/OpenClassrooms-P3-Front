import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { DeleteUserDTO } from "~/DTO/UserDTO";
import ErrorComponent from "~/helpers/ErrorsComponent";
import { useDeleteUserMutation } from "~/services/dashboard-service";
import { setUser, clearUser } from "~/stores/userSlice";



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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded bg-white p-6 shadow-lg"
      >
        <h2 className="mb-4 text-xl font-bold">Delete account</h2>

        <label htmlFor="delete-password">Password</label>
        <input
          id="delete-password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
          className="mb-4 mt-1 w-full rounded border border-gray-300 px-3 py-2"
        />

        <label htmlFor="delete-password-confirmation">Confirm password</label>
        <input
          id="delete-password-confirmation"
          type="password"
          value={passwordConfirmation}
          onChange={(event) => setPasswordConfirmation(event.target.value)}
          required
          className="mb-4 mt-1 w-full rounded border border-gray-300 px-3 py-2"
        />

        {passwordError && (
          <p className="mb-4 text-center text-red-500">{passwordError}</p>
        )}
        {error && <ErrorComponent error={error} />}

        <div className="flex gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="flex-1 rounded border border-gray-300 px-4 py-2 hover:bg-gray-100 disabled:cursor-not-allowed disabled:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600 disabled:cursor-not-allowed disabled:bg-gray-400"
          >
            {isLoading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </form>
    </div>
  );
}
