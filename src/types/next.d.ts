export interface UserPageProps {
  params: {
    email: string;
  };
  searchParams?: Record<string, string | string[] | undefined>;
}
