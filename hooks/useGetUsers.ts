import { fetchUsersWithOutLoggedUser } from "@/graphql/queries/user.queries";
import { fetcher } from "@/services/fetcher";
import useSWR from "swr";

const useGetUsers = () => {
  const { data, error, isLoading } = useSWR(
    [fetchUsersWithOutLoggedUser, {}],
    fetcher
  );
  const users = data?.usersWithOutLoggedUser || [];

  return { users, error, isLoading };
};

export default useGetUsers;
