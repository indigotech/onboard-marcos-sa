export interface UserModel {
  users: {
    nodes: {
      id:String;
      name: string;
      email: string;
    }[];
    count: number;
    pageInfo:{
      offset: number;
      limit: number;
      hasNextPage: boolean;
      hasPreviousPage:boolean;
    }
  }
};
