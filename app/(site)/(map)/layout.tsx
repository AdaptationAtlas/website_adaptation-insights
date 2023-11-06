import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const Map = ({ children }: Props) => {
  return (
    <div className='map'>{children}</div>
  )
}

export default Map