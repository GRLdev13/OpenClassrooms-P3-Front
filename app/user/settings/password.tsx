import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router";

import {
  usePutLoginMutation,
  useUpdateUserPasswordMutation,
} from "~/services/dashboard-service";
import ErrorComponent from "~/helpers/ErrorsComponent";
import { UpdateUserPasswordDTO } from "~/DTO/UserDTO";

export default function Password() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [putPassword, { error, isLoading }] = useUpdateUserPasswordMutation();
  const navigate = useNavigate();

  const passwordsMatch = newPassword === confirmPassword;
  const isPasswordLongEnough = newPassword.length >= 8;
  const isPasswordValid =
    newPassword.length > 0 &&
    confirmPassword.length > 0 &&
    passwordsMatch &&
    isPasswordLongEnough;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const updateUserPassword = new UpdateUserPasswordDTO({
      confirm_password: confirmPassword,
      new_password: newPassword,
      password: password,
      email: localStorage.getItem("email") as string || "ff"
    });

    await putPassword(updateUserPassword).unwrap();
 
  };

  return (
    <main className="flex items-center justify-center pt-16 pb-4">
      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-md flex-col gap-4"
      >
        <h1 className="text-2xl font-bold">Change Password</h1>

        <label htmlFor="currentPassword">Current Password</label>
        <input
          id="currentPassword"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
          className="rounded border border-gray-300 px-3 py-2"
        />

        <label htmlFor="newPassword">New Password</label>
        <div className="flex gap-2">
          <input
            id="newPassword"
            type={showPassword ? "text" : "password"}
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
            required
            className="min-w-0 flex-1 rounded border border-gray-300 px-3 py-2"
          />
          <input
            id="confirmPassword"
            type={showPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            required
            className="min-w-0 flex-1 rounded border border-gray-300 px-3 py-2"
            placeholder="Confirm password"
          />
          <button
            type="button"
            onClick={() => setShowPassword((value) => !value)}
            className="rounded bg-gray-200 px-3 py-2 text-gray-900"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        {newPassword.length > 0 && !isPasswordLongEnough && (
          <div className="text-center text-red-500">
            Password must be at least 8 characters
          </div>
        )}

        {newPassword.length > 0 &&
          confirmPassword.length > 0 &&
          !passwordsMatch && (
            <div className="text-center text-red-500">
              Passwords do not match
            </div>
          )}

        {error && <ErrorComponent error={error} />}

        <button
          type="submit"
          disabled={isLoading || !isPasswordValid}
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isLoading ? "Updating..." : "Update Password"}
        </button>
      </form>
    </main>
  );
}
