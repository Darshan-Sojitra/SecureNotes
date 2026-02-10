🔐 Secure Notes – Private Note Sharing App

Secure Notes is a full-stack web application that allows users to create password-protected private notes, share them via a unique link, and optionally generate an AI-based summary of the note content.

The application ensures that notes are:
Immutable after creation
Accessible only with the correct password
Readable but not editable
Shareable via a secure link

🛠 Tech Stack
Frontend

React (Vite)
Tailwind CSS


Backend

Node.js
Express.js
MongoDB (Mongoose)

AI Integration

AI summarization service (Gemini - gemini-2.5-flash)



⚙️ Setup Instructions
1️⃣ Clone the Repository
git clone <repository-url>
cd securenote

2️⃣ Backend Setup
cd backend
npm install


Create a .env file inside backend/:

MONGO_URI=your_mongodb_connection_string
GEMINI_API_KEY=your gemini api key

Start the backend server:

node src/server.js



3️⃣ Frontend Setup
cd ../frontend
npm install
npm run dev

Add you backend api base url in env
API_URL=https://secfaskfnsdfsf.app(example)



🚀 How to Use the Application
📝 Create a Note

Open the homepage (/)

Enter a note (max 500 characters)

Click Create Note

Confirm the dialog (note becomes non-editable)

Copy:

The generated shareable link

The password

🔓 View / Unlock a Note

Open the shared link (/note/:id)

Enter the password

On success:

The note is displayed (read-only)

You can copy the note content

🤖 AI Summarization

After unlocking the note

Click “Summarize using AI”

A loading indicator is shown

The AI-generated summary is displayed below the note

🔐 Security & Design Considerations

Notes are not editable after creation

Password verification is done server-side

Note content is returned only after successful unlock

AI summarization is a separate protected action


🔮 Future Improvements

Add note expiration (self-destruct) timers

Rate-limiting and brute-force protection on password attempts

Optional end-to-end encryption for note content

User accounts to manage multiple notes

Replace mock AI with a production LLM (Gemini / OpenAI)

Deploy using Docker and cloud hosting
