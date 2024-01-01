import { useRouter } from "next/navigation";
import { toast } from "sonner";

const useLogout = () => {
  const router = useRouter();

  const logout = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/logout`, // special API from CMS
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) {
        throw new Error();
      }

      toast.success("Signed out Successfully");

      router.refresh();
    } catch (err) {
      toast.error("Could not sign out, please try again");
    }
  };

  return { logout };
};

export default useLogout;
