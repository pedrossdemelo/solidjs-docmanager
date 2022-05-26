import { Company as TCompany } from "@types";
import { CompanyCard } from "components";
import { useAuth } from "context";
import { useParams } from "solid-app-router";
import { createResource, ErrorBoundary, onCleanup, Show } from "solid-js";
import { reqDelegate } from "utils";

export default function Company() {
  const [auth] = useAuth();
  const params = useParams<{ name: string }>();

  const [company, { refetch }] = createResource<TCompany, string>(
    () => params.name,
    async name => await reqDelegate.Companies.get(name)
  );

  const refetcher = setInterval(() => {
    document.hasFocus() && refetch();
  }, 60000);

  onCleanup(() => {
    clearInterval(refetcher);
  });

  return (
    <ErrorBoundary fallback="Not found">
      <Show when={company.loading}>
        <progress class="progress progress-primary w-56 self-center mt-40" />
      </Show>
      <Show when={company()} fallback="Loading...">
        <CompanyCard {...company()!} />
      </Show>
    </ErrorBoundary>
  );
}
