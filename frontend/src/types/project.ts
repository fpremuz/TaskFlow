export type Project = {
  id: number;
  name: string;
  description: string;
  owner: {
    id: number;
    username: string;
  };
  tasks: {
    id: number;
    title: string;
  }[];
};