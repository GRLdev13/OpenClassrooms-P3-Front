import { useState, useEffect } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { RegisterUserDTO } from "~/DTO/UserDTO";
import ErrorComponent from "~/helpers/ErrorsComponent";
import { usePutRegisterMutation } from "~/services/dashboard-service";

export default function UpdateUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [putUser, { error, isLoading }] = usePutRegisterMutation();
  const navigate = useNavigate();
  
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
    });

    try {
      await putUser(userDTO).unwrap();
      navigate("/login");
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
      </form>
    </main>
  );
}
