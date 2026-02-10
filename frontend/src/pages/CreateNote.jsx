import { useState } from "react";

function CreateNote() {
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [result, setResult] = useState(null);

    const createNote = async () => {
        setError("");

        if (!text.trim()) {
            setError("Note cannot be empty");
            return;
        }

        if (text.length > 500) {
            setError("Note cannot exceed 500 characters");
            return;
        }

        // 🔔 Confirmation dialog
        const confirm = window.confirm(
            "Once submitted, you will NOT be able to edit this note.\n\nDo you want to continue?"
        );

        if (!confirm) return;

        try {
            setLoading(true);

            const res = await fetch("https://secure-notes-backend-beta.vercel.app/api/notes/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ text }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || "Something went wrong");
                return;
            }

            setResult(data);
        } catch (err) {
            setError("Failed to connect to server");
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = (value) => {
        navigator.clipboard.writeText(value);

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
                <h1 className="text-2xl font-bold mb-4 text-center">
                    Create Secure Note
                </h1>

                <textarea
                    className="w-full h-32 p-3 rounded bg-slate-900 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                    placeholder="Write your private note here (max 500 characters)..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    disabled={!!result}
                />

                <div className="text-sm text-slate-400 mt-1 text-right">
                    {text.length}/500
                </div>

                {error && (
                    <div className="mt-3 text-red-400 text-sm">
                        {error}
                    </div>
                )}

                {!result && (
                    <button
                        onClick={createNote}
                        disabled={loading}
                        className="mt-4 w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 py-2 rounded font-semibold"
                    >
                        {loading ? "Creating..." : "Create Note"}
                    </button>
                )}

                {result && (
                    <div className="mt-5 bg-slate-900 p-4 rounded">
                        <p className="text-green-400 font-semibold mb-3">
                            Note Created Successfully ✅
                        </p>

                        <div className="mb-2">
                            <p className="text-sm break-all">
                                <span className="font-semibold">Link:</span>{" "}
                                http://secure-notes-u3ul.vercel.app/note/{result.noteId}
                            </p>
                            <button
                                onClick={() =>
                                    copyToClipboard(
                                        `http://secure-notes-u3ul.vercel.app/note/${result.noteId}`
                                    )
                                }
                                className="text-sm text-blue-400 hover:underline mt-1"
                            >
                                Copy link<i className="fa-solid fa-copy ml-1"></i>
                            </button>
                        </div>

                        <div>
                            <p className="text-sm">
                                <span className="font-semibold">Password:</span>{" "}
                                {result.password}
                            </p>
                            <button
                                onClick={() => copyToClipboard(result.password)}
                                className="text-sm text-blue-400 hover:underline mt-1"
                            >
                                Copy password <i className="fa-solid fa-copy ml-1"></i>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CreateNote;
