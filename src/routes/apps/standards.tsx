import { onMount } from "solid-js";

export default function StandardsRedirect() {
  onMount(() => {
    window.location.replace("/assets/standards");
  });
  return (
    <main class="mx-auto max-w-6xl px-6 py-16 md:px-10">
      <p class="text-muted-foreground">
        Standards moved to{" "}
        <a href="/assets/standards" class="text-primary underline-offset-4 hover:underline">
          /assets/standards
        </a>
        .
      </p>
    </main>
  );
}