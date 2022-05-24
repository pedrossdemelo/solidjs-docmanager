import { createForm } from "@felte/solid";
import { validator } from "@felte/validator-zod";
import { createEffect, createSignal, Show } from "solid-js";
import { z } from "zod";

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

const schema = z.object({
  name: z.string().min(5).max(50),
  email: z.string().email().max(50),
  password: z.string().min(8).max(50),
});

const parseError = (errors: string | null) =>
  errors?.[0].split("String").at(-1);

const HeroForm = () => {
  const { form, errors, isValid, isSubmitting, setFields } = createForm<
    z.infer<typeof schema>
  >({
    onSubmit: async values => {
      alert(JSON.stringify(values));
      await new Promise(resolve => setTimeout(resolve, 1000));
      throw new Error("stop");
    },
    onError: errors => alert(errors),
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
    <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      {/* @ts-expect-error */}
      <form use:form class="card-body">
        <div class="tabs tabs-boxed bg-transparent gap-2 justify-center">
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
              {parseError(errors().password)}
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
        <div class="form-control mt-6">
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
