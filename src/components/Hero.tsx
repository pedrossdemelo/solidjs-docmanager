import { createForm } from "@felte/solid";
import { validator } from "@felte/validator-zod";
import { useAuth } from "context";
import { createEffect, createSignal, Show } from "solid-js";
import { object, string } from "zod";
import type { infer as zInfer } from "zod";

export default (props: any) => {
  return (
    <div class="hero grow w-full pb-[min(10vh,64px)] self-center max-w-3xl">
      <div class="hero-content flex-col lg:flex-row-reverse">
        <div class="text-center lg:text-left px-4">
          <h1 class="text-5xl font-bold">docManager</h1>
          <p class="py-6">
            Structure and manage your data. Get a clearer picture of your world.
            Doc Manager helps you integrate your electronic data assets and
            understand how information flows through your business.
          </p>
        </div>
        <HeroForm />
      </div>
    </div>
  );
};

const [tab, setTab] = createSignal<"login" | "signup">("signup");

const schema = object({
  name: string().min(5).max(50),
  email: string().email().max(50),
  password: string().min(8).max(50),
});

const parseError = (errors: string | null) =>
  errors?.[0].split("String").at(-1);

type Form = zInfer<typeof schema>;

const HeroForm = () => {
  const [, userActions] = useAuth();
  const { form, errors, isValid, isSubmitting, setFields, setErrors } =
    createForm<Form>({
      onSubmit: async values => {
        switch (tab()) {
          case "login":
            await userActions.login(values);
            break;
          case "signup":
            await userActions.register(values);
            break;
        }
      },
      onError: (error: any) => {
        if (error === "Unknown error") {
          setErrors({ email: "Unknown error" });
          return;
        }
        if (error?.detail) {
          const errorMsg = error.detail;
          if (errorMsg.includes("password")) {
            setErrors({ password: errorMsg });
          } else setErrors({ email: errorMsg });
          return;
        }
        setErrors(error);
      },
      extend: validator({ schema }),
    });

  createEffect(() => {
    switch (tab()) {
      case "login":
        setFields(prev => ({ ...prev, name: "ValidName" }));
        break;
      case "signup":
        setFields(prev => ({ ...prev, name: "" }));
        break;
    }
  });

  return (
    <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl min-h-[calc(460rem/16)] bg-base-100">
      {/* @ts-expect-error */}
      <form use:form class="card-body">
        <div class="tabs tabs-boxed bg-transparent gap-2 self-center border p-0.5 rounded-[calc(10rem/16)]">
          <a
            onClick={() => setTab("signup")}
            classList={{ "tab-active": tab() === "signup" }}
            class="tab text-base"
          >
            Sign up
          </a>
          <a
            onClick={() => setTab("login")}
            classList={{ "tab-active": tab() === "login" }}
            class="tab text-base"
          >
            Login
          </a>
        </div>
        <Show when={tab() === "signup"}>
          <div class="form-control">
            <label class="label">
              <span class="label-text">Name</span>
              <span class="label-text-alt text-error">
                {parseError(errors().name)}
              </span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="John Appleseed"
              class="input input-bordered"
            />
          </div>
        </Show>
        <div class="form-control">
          <label class="label">
            <span class="label-text">Email</span>
            <span class="label-text-alt text-error">
              {parseError(errors().email)}
            </span>
          </label>
          <input
            type="text"
            name="email"
            placeholder="johnaapl@gmail.com"
            class="input input-bordered"
          />
        </div>
        <div class="form-control">
          <label class="label">
            <span class="label-text">Password</span>
            <span class="label-text-alt text-error">
              {parseError(errors().password) ??
                "don't use a real password, please"}
            </span>
          </label>
          <input
            type="password"
            name="password"
            placeholder="At least 8 characters"
            class="input input-bordered"
          />
          <Show when={tab() === "login"}>
            <label class="label">
              <a
                onClick={() => alert("Too bad lmao 💀")}
                class="label-text-alt link link-hover"
              >
                Forgot password?
              </a>
            </label>
          </Show>
        </div>
        <div class="form-control justify-end grow mt-6">
          <button
            type="submit"
            classList={{ "btn-disabled": !isValid(), loading: isSubmitting() }}
            class="btn btn-primary"
          >
            {tab() === "signup" ? "Sign up" : "Login"}
          </button>
        </div>
      </form>
    </div>
  );
};
