import { User } from "@types";
import { Link } from "solid-app-router";
import { For } from "solid-js";
import { formatDate } from "utils";

export default function UserCard(props: User) {
  return (
    <div class="max-w-md self-center w-full rounded-2xl gap-2 shadow-lg p-5 m-5 flex flex-col justify-center items-stretch">
      <Link href={`/users/${props.email}`} class="text-center text-xl font-medium">{props.name}</Link>{" "}
      <a href={`mailto:${props.email}`}>
        Email: {props.email} {props.email_verified && "(verified)"}
      </a>
      <p>
        Companies:{" "}
        <For each={props.companies}>{company => <Link href={`/companies/${company}`}>{company}</Link>}</For>
      </p>
      <p>Last update: {formatDate(props.last_update_at)}</p>
      {props.admin_of && (
        <p>
          Admin of:{" "}
          <Link href={`/companies/${props.admin_of}`}>{props.admin_of}</Link>
        </p>
      )}
    </div>
  );
}
