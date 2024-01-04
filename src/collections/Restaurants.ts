import { ITEMS_CATEGORIES } from "../ItemsCategories";
import { type CollectionConfig } from "payload/types";

export const Restaurants: CollectionConfig = {
  slug: "restaurants", //name
  admin: {
    useAsTitle: "name", // for admin dashboard
  },
  access: {},
  fields: [
    {
      name: "name", //rest name
      label: "Name", // label in admin dashboard
      type: "text",
      required: true,
    },
    {
      name: "category", //rest name
      label: "Category", // label in admin dashboard
      type: "select",
      options: ITEMS_CATEGORIES.map(({ label, value }) => ({ label, value })),
      required: true,
    },
    {
      name: "owner",
      label: "Owner",
      type: "relationship",
      relationTo: "users",
      required: true,
      hasMany: false,
      admin: {
        condition: () => false, // hide this field from admin dashboard
      },
    },
    {
      name: "items",
      label: "Items",
      type: "relationship",
      relationTo: "items", // 'items' collection
      hasMany: true, // One restaurant can have many items
      required: false,
      admin: {
        condition: () => false, // hide this field from admin dashboard
      },
    },
    {
      name: "approvedNewRestaurant", // main admin only approve for this NOT users
      label: "Restaurant Status",
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
      name: "restaurantImage",
      type: "array",
      label: "Restaurant Image",
      minRows: 1,
      maxRows: 1,
      required: true,
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          required: true,
        },
      ],
    },
    {
      name: "restaurantLogo",
      type: "array",
      label: "Restaurant Logo",
      minRows: 1,
      maxRows: 1,
      required: true,
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
