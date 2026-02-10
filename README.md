# 🔐 Secure Notes – Private Note Sharing App

Secure Notes is a full-stack web application that allows users to create password-protected private notes, share them via a unique secure link, and optionally generate an AI-based summary of the note content.

Testing - https://secure-notes-u3ul.vercel.app/

The application ensures that notes are:

- 🔒 Immutable after creation
- 🔑 Accessible only with the correct password
- 👁️ Readable but not editable
- 🔗 Shareable via a secure link

## 🛠 Tech Stack
### Frontend
- React (Vite)
- Tailwind CSS
### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
### AI Integration
- Gemini AI – gemini-2.5-flash for note summarization

## ⚙️ Setup Instructions
1️⃣ **Clone the Repository**
```bash
git clone <repository-url>
cd securenote
```
2️⃣ **Backend Setup**
```bash
cd backend
npm install 
```
Create a `.env` file inside the `backend/` directory:
```
MONGO_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_gemini_api_key
```
Start the backend server:
```bash
node src/server.js
```
3️⃣ **Frontend Setup**
```bash
cd ../frontend
npm install 
npm run dev 
```
Create a `.env` file in the frontend directory and add your backend API URL:
```
API_URL=https://your-backend-api-url.com
```
## 🚀 How to Use the Application
Demo video :- https://youtu.be/hSUKm8aTYx0
### 📝 Create a Note
1. Open the homepage (`/`)  
2. Enter a note (maximum 500 characters)  
3. Click **Create Note**  
4. Confirm the dialog  
> ⚠️ The note becomes non-editable after confirmation  
> Copy:
> - 🔗 The shareable link  
> - 🔑 The password  
### 🔓 View / Unlock a Note
1. Open the shared link (`/note/:id`)  
2. Enter the password  
3. On successful verification:  
   - 📄 The note is displayed (read-only)  
   - 📋 You can copy the note content  
### 🤖 AI Summarization
1. Unlock the note  
2. Click “Summarize using AI”  
3. A loading indicator appears  
4. The AI-generated summary is displayed below the note  
### 🔐 Security & Design Considerations
- Notes are immutable after creation  
- Password verification is handled server-side  
- Note content is returned only after successful authentication 
- No direct note editing or overwriting allowed   
### 🔮 Future Improvements 
- ⏳ Note expiration / self-destruct timers 
- 🚫 Rate-limiting & brute-force protection 
- 🔐 Optional end-to-end encryption 
- 🗃️ Support different data(images, videos, pdfs, etc..)
- 👤 User accounts to manage multiple notes 
- 🤖 Replace mock AI with production LLMs (Gemini / OpenAI) 
- 🐳 Docker-based deployment with cloud hosting
