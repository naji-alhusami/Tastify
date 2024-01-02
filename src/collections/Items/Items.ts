import { ITEMS_CATEGORIES } from "../../ItemsCategories";
import { type CollectionConfig } from "payload/types";

export const Items: CollectionConfig = {
  slug: "items", //name
  admin: {
    useAsTitle: "name", // for admin dashboard
  },
  access: {},
  fields: [
    {
      name: "user", // created User
      type: "relationship",
      relationTo: "users", // users the other collection
      required: true, // imp to have user with items
      hasMany: false, // one item cannot be created by many people
      admin: {
        condition: () => false, // hide this field from admin dashboard
      },
    },
    {
      name: "name", //item name
      label: "Name", // label in admin dashboard
      type: "text",
      required: true,
    },
    {
      name: "description", //item name
      type: "textarea",
      label: "Item Details", // label in admin dashboard
      required: true,
    },
    {
      name: "price", //item name
      label: "Price in USD", // label in admin dashboard
      min: 0,
      max: 1000,
      type: "number",
      required: true,
    },
    {
      name: "category", //item name
      label: "Category", // label in admin dashboard
      type: "select",
      options: ITEMS_CATEGORIES.map(({ label, value }) => ({ label, value })),
      required: true,
    },
    {
      // what the user pay for at the end:
      name: "item_files", //item name
      label: "Item file(s)", // label in admin dashboard
      type: "relationship",
      required: true,
      relationTo: "item_files",
      hasMany: false,
    },
    {
      name: "approvedForSale", // admins only approve for this NOT users
      label: "Item Status",
      type: "select",
      defaultValue: "pending",
      access: {
        // only admin can change this
        create: ({ req }) => req.user.role === "admin",
        read: ({ req }) => req.user.role === "admin",
        update: ({ req }) => req.user.role === "admin",
      },
      options: [
        {
          label: "Pending Verification",
          value: "pending",
        },
        {
          label: "Approved",
          value: "approved",
        },
        {
          label: "Denied",
          value: "denied",
        },
      ],
    },
    {
      name: "priceId",
      access: {
        create: () => false,
        read: () => false,
        update: () => false,
      },
      type: "text",
      admin: {
        hidden: true,
      },
    },
    {
      name: "stripeId",
      access: {
        create: () => false,
        read: () => false,
        update: () => false,
      },
      type: "text",
      admin: {
        hidden: true,
      },
    },
    {
      name: "images",
      type: "array",
      label: "Items Images",
      minRows: 1,
      maxRows: 4,
      required: true,
      labels: {
        singular: "Image",
        plural: "Images",
      },
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          required: true,
        },
      ],
    },
  ],
};
