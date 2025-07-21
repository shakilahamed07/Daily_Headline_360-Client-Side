import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';

const useUserRole = () => {
  const { user, loader} = useAuth();
  const axiosSecure = useAxiosSecure();
  
  const { data: userInfo = {} , isLoading, refetch} = useQuery({
    queryKey: ["users3", user?.email],
    enabled: !loader && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/role/${user.email}`);
      return res.data;
    },
  });
  // console.log(userInfo)
  

  return {role:userInfo.role, userInfo, roleLoading:isLoading, loader, refetch};
};

export default useUserRole;
