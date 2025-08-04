// src/components/AuthModal.jsx
import { useAuthModal } from '../contexts/AuthModalContext';
import Signin from '../pages/Auth/Signin';
import Register from '../pages/Auth/Register';

export default function AuthModal() {
  const { modalType, closeModal } = useAuthModal();

  if (!modalType) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-white/50 backdrop-blur-sm flex items-center justify-center"
      onClick={closeModal}
    >
      <div
        className="relative bg-[#0f172a] rounded-xl shadow-lg w-[90%] max-w-md p-5"
        onClick={(e) => e.stopPropagation()} // Supaya klik di modal box tidak nutup
      >
        <button
          onClick={closeModal}
          className="absolute top-8 right-10 text-gray-400 hover:text-white text-xl"
        >
          ✕
        </button>
        {modalType === 'signin' && <Signin />}
        {modalType === 'register' && <Register />}
      </div>
    </div>
  );
}
