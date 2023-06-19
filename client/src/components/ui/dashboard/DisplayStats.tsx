'use client';
import { useGetAllUsers } from '@/hooks/users/useUsers';

export const DisPlayStats = () => {
  const { data, isLoading } = useGetAllUsers();
  //   const users = data?.data;
  console.log(data);
  return (
    <div>
      {isLoading ? (
        <h1>loading</h1>
      ) : (
        <div>
          {data.data.users.map((user: any) => {
            return <p key={user.email}>{user.email}</p>;
          })}
        </div>
      )}
    </div>
  );
};
