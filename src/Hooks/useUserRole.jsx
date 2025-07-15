import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';

const useUserRole = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  
  const { data: role = 'user', isLoading , refetch} = useQuery({
    queryKey: ['user-role', user?.email],
    enabled: !loading && !!user?.email, // wait until email is available
    queryFn: async () => {
        const res = await axiosSecure.get(`/users/role/${user.email}`)
        return res.data.role;
    },
  });
  // console.log(role)

  return {role, roleLoading:isLoading, refetch};
};

export default useUserRole;
