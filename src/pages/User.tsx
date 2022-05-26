import { User as TUser } from "@types";
import { UserCard } from "components";
import { useParams } from "solid-app-router";
import { createResource, ErrorBoundary, onCleanup, Show } from "solid-js";
import { reqDelegate } from "utils";

export default function User() {
  const params = useParams<{ email: string }>();

  const [user, { refetch }] = createResource<TUser, string>(
    () => params.email,
    email => reqDelegate.Users.get(email)
  );

  const refetcher = setInterval(() => {
    document.hasFocus() && refetch();
  }, 60000);

  onCleanup(() => {
    clearInterval(refetcher);
  });

  return (
    <>
      <ErrorBoundary fallback="Not found">
        <Show
          when={!!user() && !user.loading}
          fallback={
            <progress class="progress progress-primary w-56 self-center mt-40" />
          }
        >
          <UserCard {...user()!} />
        </Show>
      </ErrorBoundary>

      <button class="btn btn-info fixed bottom-5 right-5" onClick={refetch}>
        Refetch
      </button>
    </>
  );
}
