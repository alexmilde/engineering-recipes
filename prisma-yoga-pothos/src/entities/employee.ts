import { builder } from "../builder";

builder.prismaObject("employee", {
  fields: (t) => ({
    id: t.exposeInt("employee_id"),
    firstName: t.exposeString("first_name"),
  }),
});
