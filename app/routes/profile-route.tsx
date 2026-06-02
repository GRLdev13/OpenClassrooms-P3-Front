import Profile from "~/routes/profile-route";

export function meta() {
  return [
    { title: "Register" },
    { name: "description", content: "Create a new account" },
  ];
}

export default function ProfileRoute() {
  return <Profile />;
}
