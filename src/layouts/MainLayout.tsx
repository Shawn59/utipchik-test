import { NavMenuComp } from '@components';

export const MainLayout = (props) => {
  const { children } = props;

  return (
    <div>
      <NavMenuComp />

      <>{children}</>
    </div>
  );
};
