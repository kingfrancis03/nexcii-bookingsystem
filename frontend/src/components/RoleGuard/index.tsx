import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const RoleGuard = ({ role, children }: { role: string; children: JSX.Element }) => {
  const user = useSelector((state: any) => state.auth.user);
  return user?.role === role ? children : <Navigate to="/" />;
};

export default RoleGuard;
