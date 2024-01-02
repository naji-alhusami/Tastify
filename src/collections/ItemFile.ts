import { type User } from "../payload-types";
import { type BeforeChangeHook } from "payload/dist/collections/config/types";
import { type Access, type CollectionConfig } from "payload/types";

const addUser: BeforeChangeHook = ({ req, data }) => {
  // whenever item file created, we are adding this field down, and setting the correct user attached to the item
  const user = req.user as User | null;
  return { ...data, user: user?.id };
};

const yourOwnAndPurchased: Access = async ({ req }) => {
  const user = req.user as User | null;

  if (user?.role === "admin") return true;
  if (!user) return false; // not logged in

  // when the user is allowed to read from this file (the user who is making req from this function), first of all if you (user) own the file
  const { docs: items } = await req.payload.find({
    collection: "items", // need to run generate:types
    depth: 0, // when we search for items, each item attach to user by the id, using 1 we fetch the entire User that attach to this prodcut
    where: {
      // filter items for users that own this prodcuts === user.id
      user: {
        equals: user.id,
      },
    },
  });

  const ownItemFileIds = items.map((item) => item.item_files).flat(); // flat to make sure that is array of ids

  // access for the items that we buy
  const { docs: orders } = await req.payload.find({
    collection: "orders",
    depth: 2, // fetching multiple levels of data (id of user and their items), join some tables together (not give us the order, but the user and their items)
    where: {
      user: {
        equals: user.id,
      },
    },
  });

    const purchasedItemFilesIds = orders
      .map((order) => {
        return order.items.map((item) => {
          if (typeof item === "string")
            return req.payload.logger.error(
              "Search depth not sufficient to find purchased file IDs"
            );

          return typeof item.item_files === "string"
            ? item.item_files
            : item.item_files.id; // id contain all the item
        });
      })
      .filter(Boolean)
      .flat();

    return {
      id: {
        in: [...ownItemFileIds, ...purchasedItemFilesIds],
      },
    };
};

export const ItemFiles: CollectionConfig = {
  slug: "item_files",
  admin: {
    hidden: ({ user }) => user.role !== "admin",
  },
  hooks: {
    beforeChange: [addUser],
  },
  access: {
    read: yourOwnAndPurchased, // the user can only read the files that he own or purchased
    update: ({ req }) => req.user.role === "admin",
    delete: ({ req }) => req.user.role === "admin",
  },
  upload: {
    staticURL: "/item_files",
    staticDir: "item_files",
    mimeTypes: ["image/*", "font/*", "application/postscript"],
  },
  fields: [
    {
      name: "user",
      type: "relationship",
      relationTo: "users",
      admin: {
        // normal users cannot see this field in admin dashboard
        condition: () => false,
      },
      hasMany: false, // one item belongs to one user
      required: true,
    },
  ],
};
