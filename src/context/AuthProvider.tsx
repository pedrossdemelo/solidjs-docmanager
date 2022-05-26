import { User } from "@types";
import { Accessor, createContext, createSignal, useContext } from "solid-js";
import { reqDelegate } from "utils";

const INITIAL_STATE = JSON.parse(localStorage.getItem("user")!) as User | null;

type UserState = Accessor<User | null>;
type Actions = {
  readonly login: (
    loginInput: Parameters<typeof reqDelegate.Auth.login>[0]
  ) => Promise<void>;
  readonly logout: () => void;
  readonly register: (
    registerInput: Parameters<typeof reqDelegate.Auth.register>[0]
  ) => Promise<void>;
  readonly update: (
    updateInput: Parameters<typeof reqDelegate.Auth.update>[1]
  ) => Promise<void>;
};

const UserContext = createContext<readonly [UserState, Actions]>();

export function AuthProvider(props: any) {
  const [state, setState] = createSignal(INITIAL_STATE);

  const actions: Actions = {
    login: async loginInput => {
      const user = await reqDelegate.Auth.login(loginInput);
      localStorage.setItem("user", JSON.stringify(user));
      setState(user);
    },
    logout: () => {
      localStorage.removeItem("user");
      setState(null);
    },
    register: async registerInput => {
      const newUser = await reqDelegate.Auth.register(registerInput);
      localStorage.setItem("user", JSON.stringify(newUser));
      setState(newUser);
    },
    update: async updateInput => {
      const email = state()?.email;
      if (!email) throw new Error("No user logged in");
      const updatedUser = await reqDelegate.Auth.update(email, updateInput);
      localStorage.setItem("user", updatedUser);
      setState(updatedUser);
    },
  } as const;

  const store = [state, actions] as const;

  return (
    <UserContext.Provider value={store}>{props.children}</UserContext.Provider>
  );
}

export function useAuth() {
  return useContext(UserContext)!;
}
