import React, { useState } from "react";
import JSONEditor from "./components/JSONEditor";
import FormPreview from "./components/FormPreview";

const App: React.FC = () => {
    const originalSchema = {
        formTitle: "Project Requirements Survey",
        formDescription: "Please fill out this survey about your project needs",
        fields: [
            { id: "name", type: "text", label: "Full Name", required: true, placeholder: "Enter your full name" },
            {
                id: "email",
                type: "email",
                label: "Email Address",
                required: true,
                placeholder: "you@example.com",
                validation: { pattern: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$", message: "Please enter a valid email address" },
            },
            {
                id: "companySize",
                type: "select",
                label: "Company Size",
                required: true,
                options: [
                    { value: "1-50", label: "1-50 employees" },
                    { value: "51-200", label: "51-200 employees" },
                    { value: "201-1000", label: "201-1000 employees" },
                    { value: "1000+", label: "1000+ employees" },
                ],
            },
            {
                id: "industry",
                type: "radio",
                label: "Industry",
                required: true,
                options: [
                    { value: "tech", label: "Technology" },
                    { value: "healthcare", label: "Healthcare" },
                    { value: "finance", label: "Finance" },
                    { value: "retail", label: "Retail" },
                    { value: "other", label: "Other" },
                ],
            },
            {
                id: "timeline",
                type: "select",
                label: "Project Timeline",
                required: true,
                options: [
                    { value: "immediate", label: "Immediate (within 1 month)" },
                    { value: "short", label: "Short-term (1-3 months)" },
                    { value: "medium", label: "Medium-term (3-6 months)" },
                    { value: "long", label: "Long-term (6+ months)" },
                ],
            },
            {
                id: "comments",
                type: "textarea",
                label: "Additional Comments",
                required: false,
                placeholder: "Any other details you'd like to share...",
            },
        ],
    };

    const [schema, setSchema] = useState<any>(originalSchema);
    const [isDarkMode, setIsDarkMode] = useState(false);

    const handleSchemaChange = (newSchema: any) => {
        setSchema(newSchema);
    };

    const handleSave = () => {
        console.log("Schema saved:", JSON.stringify(schema, null, 2));
        alert("JSON schema saved successfully!");
    };

    const handleReset = () => {
        setSchema(originalSchema);
        alert("Schema reset to original!");
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form submitted successfully");
    };

    // Download form data as JSON
    const downloadJSON = (formData: any) => {
        const jsonData = JSON.stringify(formData, null, 2);
        const blob = new Blob([jsonData], { type: "application/json" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "form-submission.json";
        link.click();
    };

    // Toggle the theme between light and dark mode
    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    return (
        <div className={`flex flex-col h-screen ${isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
            <header className="bg-blue-600 text-white py-4 px-6 flex flex-col sm:flex-row justify-between items-center fixed top-0 left-0 w-full z-10">
                <h1 className="text-2xl font-bold text-center sm:text-left">Dynamic Form Generator</h1>
                <div className="mb-4 flex justify-end space-between">
                    <div>
                        <p className="text-sm mt-2 py-2 sm:mt-0 text-center sm:text-right mx-8">
                            Create and edit JSON schemas with ease
                        </p>
                    </div>
                    <div>
                        <button
                            onClick={toggleDarkMode}
                            className="px-4 py-2 font-bold bg-pink-500 text-white rounded"
                        >
                            {isDarkMode ? "Light" : "Dark"} Mode
                        </button>
                    </div>
                </div>
            </header>

            <div className="flex flex-col flex-grow pt-20 sm:pt-20">
                <div className="flex flex-col p-4 bg-gray-800 text-white sm:w-[30%] sm:fixed top-12 left-0 bottom-0 overflow-y-auto order-1 pt-16">
                    <h2 className="text-2xl font-bold mb-3 sm: pt-1">JSON Editor</h2>
                    <JSONEditor schema={schema} onSchemaChange={handleSchemaChange} />
                    <div className="flex flex-col gap-2 sm:flex-row sm: gap-4 mt-4 sm:justify-start justify-center items-center">
                        <button
                            onClick={handleReset}
                            className="px-6 py-2 bg-red-600 text-white rounded ml-12 sm: ml-4 pl-12 pr-12"
                        >
                            Reset Schema
                        </button>
                        <button
                            onClick={handleSave}
                            className="px-6 py-2 bg-green-600 text-white rounded ml-12 sm: ml-4 pl-12 pr-12"
                        >
                            Save Schema
                        </button>
                    </div>
                    
                </div>

                <div className={`flex flex-col p-4 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} flex-grow order-2 sm:ml-[30%] sm:order-2 overflow-y-auto`}>
                    <h2 className="text-3xl font-bold mb-4">Form Preview</h2>
                    <FormPreview schema={schema} isDarkMode={isDarkMode} />
                </div>
            </div>
        </div>
    );
};

export default App;




