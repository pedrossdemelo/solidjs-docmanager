import { User, Company, Doc } from "@types";
import send from "./send";

type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

type InputCompany = Omit<Company, "id" | "created_at" | "last_update_at">;

type PostCompany = Optional<
  InputCompany,
  "lang" | "locale" | "timezone" | "users"
>;

type PatchCompany = Partial<PostCompany>;

type InputDoc = Pick<
  Doc,
  "company" | "date_limit_to_sign" | "created_by" | "signed"
>;

type PatchDoc = Partial<Omit<InputDoc, "signed">>;

type LoginInput = {
  email: string;
  password: string;
}

type RegisterInput = LoginInput & { name: string };

type UserInput = Pick<User, "email" | "companies" | "name" | "admin_of" | "email_verified">

type PatchUser = Partial<UserInput>;

function createRequestDelegate() {
  const Auth = {
    login: ({ email, password }: LoginInput) =>
      send("get", `users/${email}/login?password=${password}`),
    register: ({ email, password, name }: RegisterInput) =>
      send("post", "users/", { name, email, password }),
    update: (email: string, updates: PatchUser) => {
      return send("patch", `users/${email}/`, updates);
    },
  };

  const Docs = {
    getAll: () => send("get", "docs/"),
    get: (id: string) => send("get", `docs/${id}`),
    create: (doc: InputDoc) => send("post", "docs/", doc),
    sign: (id: string) => send("patch", `docs/${id}/`, { signed: true }),
    update: (id: string, updates: PatchDoc) =>
      send("patch", `docs/${id}/`, updates),
  };

  const Companies = {
    getAll: () => send("get", "companies/"),
    get: (name: string) => send("get", `companies/${name}/`),
    create: (company: PostCompany) => send("post", `companies/`, company),
    update: (name: string, updates: PatchCompany) =>
      send("patch", `companies/${name}/`, updates),
    getDocs: (name: string) => send("get", `companies/${name}/docs/`),
  };

  const Users = {
    getAll: () => send("get", "users/"),
    get: (email: string) => send("get", `users/${email}/`),
    getDocs: (email: string) => send("get", `users/${email}/docs/`),
  }

  return {
    Auth,
    Docs,
    Companies,
    Users,
  };
}

const reqDelegate = createRequestDelegate();

export default reqDelegate;
