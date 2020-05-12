export interface UserModel {
    users: {
      nodes: {
          name:string;
          email:string;
      }[]
    }
  }