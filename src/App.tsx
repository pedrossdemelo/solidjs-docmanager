import { Nav } from "components";
import { Route, Routes, Navigate } from "solid-app-router";
import { useAuth } from "context";
import { lazy, Show } from "solid-js";
const Login = lazy(() => import("pages/Login"));
const Documents = lazy(() => import("pages/Documents"));
const Document = lazy(() => import("pages/Document"));
const Users = lazy(() => import("pages/Users"));
const User = lazy(() => import("pages/User"));
const Companies = lazy(() => import("pages/Companies"));
const Company = lazy(() => import("pages/Company"));

function App() {
  const [user] = useAuth();

  return (
    <>
      <Nav />
      <Routes>
        <Route
          path="/"
          element={
            <Show when={!user()} fallback={<Navigate href="/docs" />}>
              <Login />
            </Show>
          }
        />
        <Route path="/docs" element={<Documents />} />
        <Route path="/docs/:id" element={<Document />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:email" element={<User />} />
        <Route path="/companies" element={<Companies />} />
        <Route path="/companies/:name" element={<Company />} />
      </Routes>
    </>
  );
}

export default App;
