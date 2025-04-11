<form
onSubmit={handleSubmit}
className='flex flex-col items-center space-y-4'>
<input
  type='file'
  onChange={onFileChange}
  className='w-64 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer'
  multiple
/>
<button
  disabled={loading}
  type='submit'
  className={`w-64 p-3 text-white font-medium rounded-md ${
    loading
      ? 'bg-gray-500 cursor-not-allowed'
      : 'bg-blue-500 hover:bg-blue-600'
  } transition duration-300`}>
  {loading ? 'Uploading...' : 'Upload'}
</button>

{message ? (
  <p className='text-green-700 mt-4'>{message}</p>
) : (
  <p className='text-red-700 mt-4'>{error}</p>
)}
</form>

  <h2 className='text-3xl font-semibold text-center text-blue-600 mb-6'>
        Admin Dashboard
      </h2>
      <p className='text-lg text-gray-700 mb-4'>
        Welcome, <span className='font-semibold'>{user?.username}</span>
      </p>

<Link
to='/login'
className='mt-8 px-6 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition duration-300'
onClick={handleLogout}>
Logout
</Link>