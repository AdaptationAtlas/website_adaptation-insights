import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const MapLayout = ({ children }: Props) => {
  return (
    <div className='overflow-hidden'>{children}</div>
  )
}

export default MapLayout