import { nanoid } from 'nanoid';

const uniqueId = () => {
  return nanoid(10).replace(/[-_]/g, '');
};

export default uniqueId;
