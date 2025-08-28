import { Outlet } from 'react-router-dom';

export default function appLayout() {
  return (
    <div>
      <Outlet />
    </div>
  );
}
