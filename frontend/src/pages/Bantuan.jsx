// src/pages/Bantuan.jsx
const Bantuan = () => {
  return (
    <section id:bantuan className="w-full px-6 py-10 mx-auto">
      <h2 className="text-2xl font-bold mb-4">Help Center</h2>
      <p className="mb-4">
        If you're experiencing issues or need more information, please contact our customer support through one of the following methods:
      </p>
      <ul className="list-disc pl-5 space-y-2">
        <li>Email: support@wattwise.nan</li>
        <li>Phone: 0800-xxx-xxxx (toll-free)</li>
        <li>WhatsApp: +62 xxx-xxxx-xxxx</li>
      </ul>
      <p className="mt-6">
        We're available to assist you Monday–Friday, from 08:00 to 17:00 (WIB).
      </p>
    </section>
  );
};
export default Bantuan;
