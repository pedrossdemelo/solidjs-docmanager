import { Doc, User } from "@types";
import { UserCard } from "components";
import { useAuth } from "context";
import { createResource, onCleanup, For, Show } from "solid-js";
import { reqDelegate } from "utils";

export default function Users() {
  const [auth] = useAuth();

  const [users, { refetch }] = createResource<User[]>(
    reqDelegate.Users.getAll,
    {
      initialValue: [],
    }
  );

  const refetcher = setInterval(() => {
    document.hasFocus() && refetch();
  }, 60000);

  onCleanup(() => {
    clearInterval(refetcher);
  });

  return (
    <>
      <Show when={users.loading}>
        <progress class="progress progress-primary w-56 self-center mt-40" />
      </Show>
      <For each={users()}>
        {user => <UserCard {...user} />}
      </For>
    </>
  );
}
