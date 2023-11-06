import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const Map = ({ children }: Props) => {
  return (
    <div className='min-h-screen'>{children}</div>
  )
}

export default Map