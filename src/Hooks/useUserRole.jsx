import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import axios from 'axios';

const useUserRole = () => {
  const { user, loader} = useAuth();
  
  const { data: userInfo = {} , isLoading, refetch} = useQuery({
    queryKey: ["users3", user?.email],
    enabled: !loader && !!user?.email,
    queryFn: async () => {
      const res = await axios.get(`https://daily-headline-360-server-side.vercel.app/users/role/${user?.email}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem('access-token')}`
        }
      });
      return res.data;
    },
  });
  // console.log(userInfo)
  

  return {role:userInfo.role, userInfo, roleLoading:isLoading, loader, refetch};
};

export default useUserRole;
