import { type Access, type CollectionConfig } from "payload/types";

const yourOwnOrders: Access = ({ req: { user } }) => {
  if (user.role === "admin") return true;

  return {
    user: {
      equals: user?.id,
    },
  };
};

export const Orders: CollectionConfig = {
  slug: "orders",
  admin: {
    useAsTitle: "Your Orders",
    description: "A summary of all your orders on Tastify",
  },
  access: {
    read: yourOwnOrders,
    update: ({ req }) => req.user.role === "admin",
    create: ({ req }) => req.user.role === "admin",
    delete: ({ req }) => req.user.role === "admin",
  },
  fields: [
    {
      name: "_isPaid", //  just name, no matter for _
      type: "checkbox",
      access: {
        read: ({ req }) => req.user.role === "admin",
        create: () => false,
        update: () => false,
      },
      admin: {
        hidden: true,
      },
      required: true,
    },
    { // who made this order
      name: "user",
      type: "relationship",
      relationTo: "users",
      admin: {
        hidden: true,
      },
      required: true,
    },
    { // it is also has realtionship to items
      name: "items",
      type: "relationship",
      relationTo: "items",
      required: true,
      hasMany: true,
    },
  ],
};
