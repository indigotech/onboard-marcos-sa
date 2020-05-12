export interface UserModel {
  users: {
    nodes: {
      id:String;
      name: string;
      email: string;
    }[];
  };
}
