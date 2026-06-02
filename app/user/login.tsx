import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { LoggedUserDTO, LoginUserDTO } from "~/DTO/UserDTO";
import { usePutLoginMutation } from "~/services/dashboard-service";
import ErrorComponent from "~/helpers/ErrorsComponent";
import { setUser } from "~/stores/userSlice";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [putUser, { error, isLoading }] = usePutLoginMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const userDTO = new LoginUserDTO({
      email,
      password,
    });

    try {
      const response = await putUser(userDTO).unwrap();
      // Save user info to Redux
      dispatch(
        setUser({
          email: response.email,
          name: response.name,
          token: response.token,
        }),
      );
      localStorage.setItem("token", response.token);
      navigate("/dashboards");
    } catch (error) {}
  };

  return (
    <main className="flex items-center justify-center pt-16 pb-4">
      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-md flex-col gap-4"
      >
        <h1 className="text-2xl font-bold">Login</h1>

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
          {isLoading ? "Logging in..." : "Login"}
        </button>

        <Link to="#" className="text-blue-700 hover:underline">
          Forgot your password
        </Link>
        <Link to="/register" className="text-blue-700 hover:underline">
          Don't have an account ? Sign up
        </Link>
      </form>
    </main>
  );
}
