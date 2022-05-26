import { Doc } from "@types";
import { DocumentCard } from "components";
import { useAuth } from "context";
import { useParams } from "solid-app-router";
import { createResource, ErrorBoundary, onCleanup, Show } from "solid-js";
import { reqDelegate } from "utils";

export default function Document() {
  const [auth] = useAuth();
  const params = useParams<{ id: string }>();

  const [doc, { refetch }] = createResource<Doc, string>(
    () => params.id,
    async id => await reqDelegate.Docs.get(id)
  );

  const refetcher = setInterval(() => {
    document.hasFocus() && refetch();
  }, 60000);

  onCleanup(() => {
    clearInterval(refetcher);
  });

  return (
    <ErrorBoundary fallback="Not found">
      <Show when={doc.loading}>
        <progress class="progress progress-primary w-56 self-center mt-40" />
      </Show>
      <Show when={!!doc()}>
        <DocumentCard {...doc()!} />
      </Show>
    </ErrorBoundary>
  );
}
