type RequestMethods = "get" | "post" | "put" | "delete" | "patch";
const API_ROOT = "https://django-docmanager.herokuapp.com/";

export default async function send(
  method: RequestMethods,
  url: string,
  body?: { [key: string]: any } | null | undefined,
  keyExtractor?: string
) {
  const headers: any = {};
  const options: any = { method, headers };

  if (body !== undefined && body !== null) {
    headers["Content-Type"] = "application/json";
    options.body = JSON.stringify(body);
  }

  const response = await fetch(API_ROOT + url, options);
  const json = await response.json();

  if (response.status >= 400) {
    throw json ?? "Unknown error";
  }

  return keyExtractor ? json[keyExtractor] : json;
}
