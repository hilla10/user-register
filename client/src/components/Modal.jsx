import { MdClose } from 'react-icons/md';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center  bg-opacity-50'>
      <div className='bg-white w-full max-w-md mx-4 p-6 rounded-lg shadow-lg relative animate-fade-in'>
        <button
          className='absolute top-2 right-2 text-gray-500 hover:text-red-500'
          onClick={onClose}>
          <MdClose className='cursor-pointer my-2 mr-4' size={30} />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
