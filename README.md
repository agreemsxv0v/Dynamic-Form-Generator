1 - Initialize dynamic-form-generator Project using command:

npx create-react-app dynamic-form-generator --template typescript
cd dynamic-form-generator

2 - Install all required dependencies dependencies :

npm install react-hook-form clsx ajv @types/ajv @fortawesome/fontawesome-free tailwindcss postcss autoprefixer

3 .

3.1 - Set Up Tailwind CSS :

npx tailwindcss init -p

3.2 - Configure tailwind.config.js

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};


3.3 -  Add Tailwind CSS to src/index.css

@tailwind base;
@tailwind components;
@tailwind utilities;

4 -  Created the Dynamic-Form-Generator


5 - deployed on github

git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/agreemsxv0v/Dynamic-Form-Generator.git
git push -u origin main

6 - Run the project using command

npm start



