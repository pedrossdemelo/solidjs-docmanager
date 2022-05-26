import { Company } from "@types";
import { Link } from "solid-app-router";
import { For } from "solid-js";
import { formatDate } from "utils";

export default function CompanyCard(props: Company) {
  return (
    <div class="max-w-lg self-center w-full rounded-2xl gap-2 shadow-lg p-5 m-5 flex flex-col justify-center items-stretch">
      <Link
        href={`/companies/${props.name}`}
        class="text-center text-xl font-medium"
      >
        {props.name}
      </Link>{" "}
      <p>
        Admin:{" "}
        <Link class="link" href={`/users/${props.admin}`}>
          {props.admin}
        </Link>
      </p>
      <p>Country: {props.locale}</p> <p>Timezone: {props.timezone}</p>{" "}
      <p>Language: {props.lang}</p> <p>Employees:</p>
      <ul class="pl-4">
        <For each={props.users}>{user => <li>{user}</li>}</For>
      </ul>
      <p>Created at: {formatDate(props.created_at)}</p>{" "}
      <p>Last update: {formatDate(props.last_update_at)}</p>
    </div>
  );
}
