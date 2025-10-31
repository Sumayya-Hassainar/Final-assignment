const Home = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
    <h1 className="text-4xl font-bold text-blue-600 mb-4">Welcome to Task Manager</h1>
    <p className="text-gray-700 mb-6">Sign in to manage your tasks efficiently.</p>
    <a
      href="/login"
      className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
    >
      Get Started
    </a>
  </div>
);
export default Home;
