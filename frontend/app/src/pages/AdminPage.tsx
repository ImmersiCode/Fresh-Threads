function AdminPage() {
  return (
    <div className="h-screen flex items-center justify-center bg-yellow-100 flex-col">
      <h1 className="text-3xl font-bold">🛠 Admin Dashboard</h1>
      <button
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
        onClick={() => {
          localStorage.removeItem('token');
          window.location.href = '/';
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default AdminPage;
