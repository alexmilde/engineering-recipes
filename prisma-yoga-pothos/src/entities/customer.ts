import { builder } from "../builder";
import { prisma } from "../prisma/client";

builder.prismaObject("customer", {
  fields: (t) => ({
    id: t.exposeInt("customer_id"),
    firstName: t.exposeString("first_name"),
    email: t.exposeString("email"),
    lastName: t.exposeString("last_name"),
    employee: t.relation("employee"),
  }),
});

builder.queryFields((t) => ({
  customers: t.prismaField({
    type: ["customer"],
    args: {
      email: t.arg({
        type: "String",
        required: false,
      }),
    },
    resolve: (query, root, args, ctx, info) =>
      prisma.customer.findMany({
        ...query,
        where: {
          email: { contains: args.email ?? "" },
        },
      }),
  }),
}));
