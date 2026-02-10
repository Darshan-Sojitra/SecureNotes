import { useState } from "react";
import { useParams } from "react-router-dom";

function ViewNote() {
    const { id } = useParams();

    const [password, setPassword] = useState("");
    const [note, setNote] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const [summary, setSummary] = useState("");
    const [aiLoading, setAiLoading] = useState(false);
    const [showSummary, setShowSummary] = useState(false);

    // 🔓 Unlock note
    const unlockNote = async () => {
        setError("");

        if (!password.trim()) {
            setError("Password is required");
            return;
        }

        try {
            setLoading(true);

            const res = await fetch(
                `https://secure-notes-backend-beta.vercel.app/api/notes/${id}/unlock`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ password }),
                }
            );

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || "Invalid password");
                return;
            }

            setNote(data.text);
        } catch (err) {
            setError("Failed to connect to server");
        } finally {
            setLoading(false);
        }
    };

    // 📋 Copy note
    const copyNote = () => {
        navigator.clipboard.writeText(note);
        alert("Note copied to clipboard!");
    };

    // 🤖 Summarize using AI
    const summarizeNote = async () => {
        setShowSummary(true);
        setAiLoading(true);

        try {
            const res = await fetch(
                `https://secure-notes-backend-beta.vercel.app/api/notes/${id}/summarize`,
                {
                    method: "GET",
                }
            );

            const data = await res.json();
            setSummary(data.summary);
        } catch (err) {
            setSummary("Failed to generate summary");
        } finally {
            setAiLoading(false);
        }
    };

    return (
        <div className="min-h-screen min-w-screen bg-slate-900 text-white flex items-center justify-center px-4">
            <div className="w-full max-w-9/12 bg-slate-800 rounded-lg p-6 shadow-lg relative">
                <button
                    onClick={() => (window.location.href = "/")}
                    className="absolute top-4 right-4 bg-blue-600 hover:bg-blue-700 text-sm py-1 px-3 rounded font-semibold"
                >
                    New Note
                </button>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css" integrity="sha512-2SwdPD6INVrV/lHTZbO2nodKhrnDdJK9/kg2XD1r9uGqPo1cUbujc+IYdlYdEErWNu69gVcYgdxlmVmzTWnetw==" crossorigin="anonymous" referrerpolicy="no-referrer" />
                {/* 🔐 PASSWORD SECTION */}
                {!note && (
                    <>
                        <h2 className="text-xl font-bold mb-4 text-center">
                            Unlock Secure Note
                        </h2>

                        <input
                            type="password"
                            placeholder="Enter note password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 rounded bg-slate-900 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        {error && (
                            <div className="mt-3 text-red-400 text-sm">
                                {error}
                            </div>
                        )}

                        <button
                            onClick={unlockNote}
                            disabled={loading}
                            className="mt-4 w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 py-2 rounded font-semibold"
                        >
                            {loading ? "Unlocking..." : "Unlock Note"}
                        </button>
                    </>
                )}

                {/* 📄 NOTE VIEW SECTION */}
                {note && (
                    <>
                        <h2 className="text-xl font-bold mb-3 text-center">
                            Secure Note
                        </h2>

                        <textarea
                            value={note}
                            readOnly
                            className="w-full h-40 p-3 rounded bg-slate-900 border border-slate-700 resize-none"
                        />

                        <button
                            onClick={copyNote}
                            className="mt-2 text-sm text-blue-400 hover:underline"
                        >
                            Copy note to clipboard <i className="fa-solid fa-copy ml-1"></i>

                        </button>

                        {/* 🤖 AI SUMMARY */}
                        <div className="mt-6">
                            <button
                                onClick={summarizeNote}
                                className="w-full bg-purple-600 hover:bg-purple-700 py-2 rounded font-semibold"
                            >
                                Summarize using AI <i class="fa-solid fa-wand-magic-sparkles"></i>
                            </button>

                            {showSummary && (
                                <div className="mt-4 bg-slate-900 p-4 rounded">
                                    {aiLoading ? (
                                        <p className="text-slate-400">Summarizing...</p>
                                    ) : (
                                        <pre className="whitespace-pre-wrap font-sans font-extrabold">
                                            {summary}
                                        </pre>
                                    )}
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default ViewNote;
