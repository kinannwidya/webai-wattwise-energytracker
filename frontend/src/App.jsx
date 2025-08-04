// src/App.jsx
import Router from './router';
import AuthModal from './components/AuthModal'; // Import AuthModal

function App() {
  return (
    <>
      <Router />
      <AuthModal /> {/* Render AuthModal di sini */}
    </>
  );
}

export default App;