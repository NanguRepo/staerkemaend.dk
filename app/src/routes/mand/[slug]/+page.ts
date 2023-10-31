import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load: PageLoad = ({ params }) => {
  if (Number(params.slug)) {
    return {
      id: +params.slug,
    };
  }

  throw error(400, "Invalid id");
};
