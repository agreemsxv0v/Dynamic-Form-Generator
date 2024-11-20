import React, { useState, useEffect } from 'react';

interface JSONEditorProps {
  schema: any;
  onSchemaChange: (newSchema: any) => void;
}

const JSONEditor: React.FC<JSONEditorProps> = ({ schema, onSchemaChange }) => {
  const [jsonContent, setJsonContent] = useState<string>(JSON.stringify(schema, null, 2));
  const [error, setError] = useState<string | null>(null); // To hold the error message
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // To control the modal visibility

  useEffect(() => {
    setJsonContent(JSON.stringify(schema, null, 2)); // Reset editor content on schema change
    setError(null); // Clear any previous errors when schema is updated
    setIsModalOpen(false); // Close error modal when schema is reset or valid
  }, [schema]);

  const handleJsonChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newJsonContent = event.target.value;
    try {
      // Attempt to parse the JSON input
      const parsedJson = JSON.parse(newJsonContent);
      onSchemaChange(parsedJson); // If valid, update schema
      setError(null); // Clear any previous errors
      setIsModalOpen(false); // Close the modal if JSON is valid
    } catch (e) {
      // If JSON is invalid, set an error message and open the modal
      setError("Invalid JSON syntax, please correct it.");
      setIsModalOpen(true); // Open the error popup modal
    }
    setJsonContent(newJsonContent); // Always update the text area content
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal when user clicks close
  };

  return (
    <div className="h-full relative">
      <textarea
        className="w-full h-full bg-gray-800 text-white p-4 rounded-lg border-2 border-gray-600"
        value={jsonContent}
        onChange={handleJsonChange}
        spellCheck="false"
      />

      {/* Modal Popup for error */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-sm w-full">
            <h3 className="text-xl font-bold text-red-600">Error</h3>
            <p className="mt-2 text-red-500">{error}</p>
            <button
              onClick={handleCloseModal}
              className="mt-4 px-6 py-2 bg-red-600 text-white rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default JSONEditor;

