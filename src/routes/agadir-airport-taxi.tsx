import { createFileRoute, redirect } from "@tanstack/react-router";

// Airport taxi and airport transfer are the same service and search intent.
export const Route = createFileRoute("/agadir-airport-taxi")({
  beforeLoad: ({ location }) => {
    throw redirect({ href: "/agadir-airport-transfer" + location.searchStr, statusCode: 301 });
  },
});
