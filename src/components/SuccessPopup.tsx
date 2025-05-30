import React from "react";

const SuccessPopup: React.FC<{
  onClose: () => void;
  onAddAnother: () => void;
  onSubmitTotable: () => void;
}> = ({ onClose, onAddAnother, onSubmitTotable }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md text-center">
        <h2 className="text-2xl font-bold mb-4 text-green-600">
          Confirm Submission
        </h2>
        <p className="mb-6 text-gray-700">
          Your information has been ready to be saved.
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-500 text-white hover:bg-gray-600"
          >
            Close
          </button>
          <button
            onClick={onAddAnother}
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            Save and Add Another
          </button>
          <button
            onClick={onSubmitTotable}
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
            data-testid="submit-to-table"
          >
            Submit to Table
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessPopup;
