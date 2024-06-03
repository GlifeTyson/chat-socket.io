import { createAxios } from "@/libs/axios";
import { loginQuery } from "@/graphql/mutations/userMutation";

export async function login(username: string, password: string) {
  const { data } = await createAxios().post("http://localhost:3001/graphql", {
    query: loginQuery,
    variables: { username, password },
  });
  return data.data;
}
