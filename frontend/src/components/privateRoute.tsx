import { Navigate } from "react-router-dom";

export default function PrivateRoute({
  children,
  allowRoles,
}: {
  children: JSX.Element;
  allowRoles?: string[];
}) {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  if (!token || !user) return <Navigate to="/" replace />;

  const role = JSON.parse(user).role;
  if (allowRoles && !allowRoles.includes(role))
    return <Navigate to="/" replace />;

  return children;
}
