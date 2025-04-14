import React from 'react';

const Table = ({ data, openModal, handleDelete }) => {
  return (
    <div className='overflow-x-auto'>
      <table className='min-w-full bg-white shadow-md rounded-lg overflow-hidden'>
        <thead className='bg-blue-500 text-white'>
          <tr>
            <th className='py-3 px-6 text-left'>User ID</th>
            <th className='py-3 px-6 text-left'>Username</th>
            <th className='py-3 px-6 text-left'>Role</th>
            <th className='py-3 px-6 text-left'>Email</th>
            <th className='py-3 px-6 text-center' colSpan={2}>
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.map(({ user_id, username, role, email }) => (
            <tr
              key={user_id}
              className='border-b hover:bg-gray-100 transition duration-200'>
              <td className='py-3 px-6'>{user_id}</td>
              <td className='py-3 px-6'>{username}</td>
              <td className='py-3 px-6 capitalize'>{role}</td>
              <td className='py-3 px-6'>{email}</td>
              <td className='py-3 px-6 text-center'>
                <button
                  className='text-sm bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded shadow cursor-pointer'
                  onClick={() => {
                    // setModalOpen(true);
                    openModal(user_id);
                  }}>
                  Update
                </button>
              </td>
              <td className='py-3 px-6 text-center'>
                <button
                  className='text-sm bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded shadow cursor-pointer'
                  onClick={() => {
                    handleDelete(user_id);
                  }}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
