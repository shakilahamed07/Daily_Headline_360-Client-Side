import { useEffect, useState } from "react";
import { FaBell } from "react-icons/fa";
import { useNavigate } from "react-router";

const SubscriptionPromptModal = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const showTimer = setTimeout(() => {
      setShowModal(true);

      const hideTimer = setTimeout(() => {
        setShowModal(false);
      }, 80000);

      return () => clearTimeout(hideTimer);
    }, 10000);

    return () => clearTimeout(showTimer);
  }, []);

  const handleSubscribe = () => {
    navigate("/subscription");
  };

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/50 bg-opacity-40 flex items-center justify-center">
          <div className="relative bg-white p-6 rounded-xl shadow-lg max-w-sm w-full">
            {/* ❌ Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-2 right-2 text-red-600 hover:text-red-800 text-xl"
            >
              ✖
            </button>
            <div className="flex justify-center mb-3"><FaBell size={50}/></div>
            <h2 className="text-xl font-semibold mb-2 text-center">
              Enjoy Unlimited Articles
            </h2>
            <p className="text-gray-600 mb-4 text-center">
              Subscribe now to access premium content and exclusive features!
            </p>
            
            <div className="flex justify-center">
              <button
                onClick={handleSubscribe}
                className="bg-green-500 text-white px-5 py-2 rounded-lg"
              >
                Go to Subscription
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SubscriptionPromptModal;
