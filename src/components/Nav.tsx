import { useMatch } from "solid-app-router";
import { Show } from "solid-js";

export default (props: any) => {
  const isHome = useMatch(() => "/");
  return (
    <nav class="navbar bg-base-100 w-auto rounded-lg m-2 shadow-lg z-99 overflow-visible">
      <div class="navbar-start">
        <DropdownMenu />
        <a class="btn btn-ghost normal-case text-xl">docManager</a>
      </div>

      <CenterMenu />

      <div class="navbar-end gap-2">
        <Show when={!isHome()} fallback={<GitHubButton />}>
          <a class="btn btn-outline btn-primary">Login</a>
          <a class="btn btn-primary">Sign up</a>
        </Show>
      </div>
    </nav>
  );
};

const PageLinks = () => (
  <>
    <li>
      <a>Community</a>
    </li>
    <li>
      <a>Documents</a>
    </li>
    <li>
      <a>Companies</a>
    </li>
  </>
);

const DropdownMenu = () => (
  <div class="dropdown">
    <label tabindex="0" class="btn btn-ghost lg:hidden">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 6h16M4 12h8m-8 6h16"
        />
      </svg>
    </label>
    <ul
      tabindex="0"
      class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
    >
      <PageLinks />
    </ul>
  </div>
);

const CenterMenu = () => (
  <div class="navbar-center hidden lg:flex">
    <ul class="menu menu-horizontal p-0">
      <PageLinks />
    </ul>
  </div>
);

const GitHubButton = () => (
  <a
    class="btn btn-ghost"
    href="https://github.com/pedrossdemelo/solidjs-docmanager"
    target="_blank"
  >
    Github
  </a>
);
