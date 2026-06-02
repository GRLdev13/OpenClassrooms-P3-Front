import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { RegisterUserDTO } from "~/DTO/UserDTO";
import ErrorComponent from "~/helpers/ErrorsComponent";
import { usePutRegisterMutation } from "~/services/dashboard-service";
import { setUser } from "~/stores/userSlice";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [putUser, { error, isLoading }] = usePutRegisterMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function mapError(error: any) {
    if (!error) {
      return "";
    }

    const erroring =
      typeof error === "string" ? error : error?.data?.errors?.password;

    if (erroring && Array.isArray(erroring)) {
      return (
        <div className="text-center">
          <ul className="mb-4 text-red-500">
            {erroring.map((errorMessage, index) => (
              <li key={index}>{errorMessage}</li>
            ))}
          </ul>
        </div>
      );
    } else {
      return <div className="text-center">{erroring.error}</div>;
    }
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const userDTO = new RegisterUserDTO({
      name: name,
      email,
      password,
      passwordConfirmation: confirmPassword,
    });

    try {
      const response = await putUser(userDTO).unwrap();
      // Save user info to Redux
      dispatch(setUser({ email, name }));
      navigate("/login");
    } catch (error) {}
  };

  return (
    <main className="flex items-center justify-center pt-16 pb-4">
      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-md flex-col gap-4"
      >
        <h1 className="text-2xl font-bold">Register</h1>

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

        <label htmlFor="password">Password</label>
        <div className="flex gap-2">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
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
          />
          <button
            type="button"
            onClick={() => setShowPassword((value) => !value)}
            className="rounded bg-gray-200 px-3 py-2 text-gray-900"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        {error && <ErrorComponent error={error} />}

        <button
          type="submit"
          disabled={isLoading}
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isLoading ? "Creating..." : "Create user"}
        </button>

        <Link to="/login" className="text-blue-700 hover:underline">
          Already have an account ? Login
        </Link>
      </form>
    </main>
  );
}
