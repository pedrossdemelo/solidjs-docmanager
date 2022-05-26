import { Company } from "@types";
import { CompanyCard } from "components";
import { useAuth } from "context";
import { createResource, onCleanup, For, Show } from "solid-js";
import { reqDelegate } from "utils";

export default function Companies() {
  const [auth] = useAuth();

  const [companies, { refetch }] = createResource<Company[]>(
    reqDelegate.Companies.getAll,
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
      <Show when={companies.loading}>
        <progress class="progress progress-primary w-56 self-center mt-40" />
      </Show>
      <For each={companies()}>{company => <CompanyCard {...company} />}</For>
    </>
  );
}
