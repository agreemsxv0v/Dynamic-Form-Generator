import React, { useState } from "react";

interface FormPreviewProps {
  schema: any;
  isDarkMode: boolean;
}

const FormPreview: React.FC<FormPreviewProps> = ({ schema, isDarkMode }) => {
  const [isSubmitted, setIsSubmitted] = useState(false); // Track submission status
  const [formData, setFormData] = useState<any>({}); // Track form data

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page reload
    setIsSubmitted(true); // Set submission status to true

    // Hide success message after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
    }, 3000);
  };

  const handleDownload = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(formData, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.href = dataStr;
    downloadAnchor.download = "form_submission.json";
    downloadAnchor.click();
  };

  return (
    <div
      className={`form-preview ${isDarkMode ? "bg-gray-800 text-white" : "bg-white text-black"
        }`}
    >
      <h3 className="text-2xl font-bold">{schema.formTitle}</h3>
      <p className="text-sm mb-4">{schema.formDescription}</p>

      <form onSubmit={handleSubmit}>
        {schema.fields.map((field: any) => {
          let inputElement = null;

          switch (field.type) {
            case "text":
            case "email":
              inputElement = (
                <input
                  type={field.type}
                  id={field.id}
                  name={field.id}
                  required={field.required}
                  placeholder={field.placeholder}
                  onChange={handleInputChange}
                  className={`w-full p-2 rounded border-2 border-gray-300 ${isDarkMode
                    ? "bg-gray-700 text-white"
                    : "bg-white text-black"
                    }`}
                />
              );
              break;

            case "select":
              inputElement = (
                <select
                  id={field.id}
                  name={field.id}
                  required={field.required}
                  onChange={handleInputChange}
                  className={`w-full p-2 rounded border-2 border-gray-300 ${isDarkMode
                    ? "bg-gray-700 text-white"
                    : "bg-white text-black"
                    }`}
                >
                  {field.options.map((option: any) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              );
              break;

            case "radio":
              inputElement = (
                <div>
                  {field.options.map((option: any) => (
                    <label key={option.value} className="mr-4">
                      <input
                        type="radio"
                        id={option.value}
                        name={field.id}
                        value={option.value}
                        onChange={handleInputChange}
                        className={`mr-2 ${isDarkMode ? "text-white" : "text-black"
                          }`}
                      />
                      {option.label}
                    </label>
                  ))}
                </div>
              );
              break;

            case "textarea":
              inputElement = (
                <textarea
                  id={field.id}
                  name={field.id}
                  placeholder={field.placeholder}
                  required={field.required}
                  onChange={handleInputChange}
                  className={`w-full p-2 rounded border-2 border-gray-300 ${isDarkMode
                    ? "bg-gray-700 text-white"
                    : "bg-white text-black"
                    }`}
                />
              );
              break;

            default:
              break;
          }

          return (
            <div key={field.id} className="mb-4">
              <label
                htmlFor={field.id}
                className={`block font-semibold mb-2 ${isDarkMode ? "text-white" : "text-black"
                  }`}
              >
                {field.label}
              </label>
              {inputElement}
            </div>
          );
        })}

        <div>
          <div>
            <button
              type="submit"
              className={`px-4 py-2 rounded mr-16 ${isDarkMode ? "bg-blue-600 text-white" : "bg-blue-500 text-white"
                }`}
            >
              Submit
            </button>

            {/* Download Button */}

            {Object.keys(formData).length > 0 && (
              <button
                onClick={handleDownload}
                className={`mt-4 px-4 py-2 rounded ml-22 ${isDarkMode ? "bg-green-600 text-white" : "bg-green-500 text-white"
                  }`}
              >
                Download as JSON
              </button>
            )}
          </div>
        </div>
      </form>

      {/* Success Message */}
      {isSubmitted && (
        <div
          className={`mt-4 p-2 rounded ${isDarkMode
            ? "bg-green-700 text-white"
            : "bg-green-100 text-green-800"
            }`}
        >
          Form submitted successfully!
        </div>
      )}

    </div>
  );
};

export default FormPreview;
