
export type AuthContextType = {
  user: {
    uid: string;
    email: string;
    role?: string;
  } | null;
  loading: boolean;
  setUser: React.Dispatch<React.SetStateAction<any>>; // or type more strictly if you have a User interface
};