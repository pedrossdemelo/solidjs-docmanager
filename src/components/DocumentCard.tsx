import { Doc } from "@types";
import { Link } from "solid-app-router";
import { createSignal } from "solid-js";
import { formatDate, reqDelegate } from "utils";

export default function DocumentCard(props: Doc) {
  const [signed, setSigned] = createSignal(props.signed);

  return (
    <div classList={{"opacity-50": props.expired}} class="max-w-lg w-full self-center rounded-2xl gap-2 shadow-lg p-5 m-5 flex flex-col justify-center items-stretch">
      <span>
        Company:{" "}
        <Link href={`/companies/${props.company}`}>{props.company}</Link>{" "}
      </span>
      <span>
        Document ID: <Link href={`/docs/${props.id}`}>{props.id}</Link>{" "}
      </span>
      <span>
        Author:{" "}
        <Link href={`/users/${props.created_by}`}>{props.created_by}</Link>
      </span>
      <div class="flex gap-2 justify-end">
        <p>
          Sign until {formatDate(props.date_limit_to_sign)}{" "}
          {signed() ? "Signed." : (props.expired ? "Expired." : (
            <button class="btn btn-primary btn-sm ml-4" onClick={async () => {
              await reqDelegate.Docs.sign(props.id);
              setSigned(true);
            }}>Sign</button>
          ))}
        </p>
      </div>
    </div>
  );
}
