import gql from "graphql-tag";
import { client } from "./CreateClient";

const USERDETAIL_QUERY = gql`
  query QueryUser($id: ID!) {
    user(id: $id) {
      name
      phone
      birthDate
      email
      role
    }
  }
`;

export interface userRole {
  admin: boolean;
  user: boolean;
}

interface userDetail {
  user: {
    name: string;
    phone: string;
    birthDate: Date;
    email: string;
    role: userRole;
  };
}

export function queryUserDetail(id) {
  const result = client().query<userDetail>({
    variables: { id: id },
    query: USERDETAIL_QUERY,
  });
  return result;
}
