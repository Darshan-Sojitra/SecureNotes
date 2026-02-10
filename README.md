🔐 Secure Notes – Private Note Sharing App

Secure Notes is a full-stack web application that allows users to create password-protected private notes, share them via a unique secure link, and optionally generate an AI-based summary of the note content.

The application ensures that notes are:

🔒 Immutable after creation

🔑 Accessible only with the correct password

👁️ Readable but not editable

🔗 Shareable via a secure link

🛠 Tech Stack
Frontend

React (Vite)

Tailwind CSS

Backend

Node.js

Express.js

MongoDB (Mongoose)

AI Integration

Gemini AI – gemini-2.5-flash for note summarization

⚙️ Setup Instructions
1️⃣ Clone the Repository
git clone <repository-url>
cd securenote

2️⃣ Backend Setup
cd backend
npm install


Create a .env file inside the backend/ directory:

MONGO_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_gemini_api_key


Start the backend server:

node src/server.js

3️⃣ Frontend Setup
cd ../frontend
npm install
npm run dev


Create a .env file in the frontend directory and add your backend API URL:

VITE_API_URL=https://your-backend-api-url.com

🚀 How to Use the Application
📝 Create a Note

Open the homepage (/)

Enter a note (maximum 500 characters)

Click Create Note

Confirm the dialog

⚠️ The note becomes non-editable after confirmation

Copy:

🔗 The shareable link

🔑 The password

🔓 View / Unlock a Note

Open the shared link (/note/:id)

Enter the password

On successful verification:

📄 The note is displayed (read-only)

📋 You can copy the note content

🤖 AI Summarization

Unlock the note

Click “Summarize using AI”

A loading indicator appears

The AI-generated summary is displayed below the note

🔐 Security & Design Considerations

Notes are immutable after creation

Password verification is handled server-side

Note content is returned only after successful authentication

AI summarization is a separate protected action

No direct note editing or overwriting allowed

🔮 Future Improvements

⏳ Note expiration / self-destruct timers

🚫 Rate-limiting & brute-force protection

🔐 Optional end-to-end encryption (E2EE)

👤 User accounts to manage multiple notes

🤖 Replace mock AI with production LLMs (Gemini / OpenAI)

🐳 Docker-based deployment with cloud hosting
