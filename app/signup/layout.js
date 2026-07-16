// app/login/layout.js
export default function SignupLayout({ children }) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Welcome Signup Form 👋
        </h2>
        {children}
      </div>
    </div>
  );
}
