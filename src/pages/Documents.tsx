import { Doc } from "@types";
import DocumentCard from "components/DocumentCard";
import { useAuth } from "context";
import { createResource, For, onCleanup, Show } from "solid-js";
import { reqDelegate } from "utils";

export default function Documents() {
  const [auth] = useAuth();

  const [docs, { refetch }] = createResource<Doc[]>(reqDelegate.Docs.getAll, {
    initialValue: [],
  });

  const refetcher = setInterval(() => {
    document.hasFocus() && refetch();
  }, 60000);

  onCleanup(() => {
    clearInterval(refetcher);
  });

  return (
    <>
      <Show when={docs.loading}>
        <progress class="progress progress-primary w-56 self-center mt-40" />
      </Show>
      <For each={docs()}>{doc => <DocumentCard {...doc} />}</For>
    </>
  );
}
