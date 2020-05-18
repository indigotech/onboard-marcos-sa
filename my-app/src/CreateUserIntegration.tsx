import gql from "graphql-tag";
import { client } from "./CreateClient";

const CREATEUSER_MUTATION = gql`
  mutation CreateUserMutation(
    $data: UserInputType!
  ) {
    createUser(
      data:$data
    ) {
      id
    }
  }
`;

interface createUser {
  createUser: {
    id: String;
  };
}

interface UserInputType {
  name:string,
  email:string,
  phone:string,
  birthDate:string,
  password:string,
  role:string
}

export function mutateCreatUser(
  data:UserInputType
) {
  return client().mutate<createUser>({
      variables: {
        data
      },
      mutation: CREATEUSER_MUTATION,
    });
}
