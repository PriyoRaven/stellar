import React, { useRef, useContext } from "react";
import { FiPaperclip, FiX, FiFile, FiImage } from "react-icons/fi";
import { Context } from "../../context/context";

const FileUpload = () => {
    const fileInputRef = useRef(null);
    const { attachments, addAttachment, removeAttachment } = useContext(Context);

    const handleFileSelect = async (event) => {
        const files = Array.from(event.target.files);

        for (const file of files) {
            // Check file type
            const isImage = file.type.startsWith("image/");
            const isPDF = file.type === "application/pdf";

            if (!isImage && !isPDF) {
                alert("Please upload an image or PDF file.");
                continue;
            }

            // Check file size (max 10MB)
            if (file.size > 10 * 1024 * 1024) {
                alert(`File ${file.name} is too large. Maximum size is 10MB.`);
                continue;
            }

            // Convert to base64
            const reader = new FileReader();
            reader.onload = () => {
                const base64 = reader.result.split(",")[1]; // Remove data:...;base64, prefix
                addAttachment({
                    name: file.name,
                    type: isImage ? "image" : "pdf",
                    mimeType: file.type,
                    data: base64,
                    preview: isImage ? reader.result : null,
                });
            };
            reader.readAsDataURL(file);
        }

        // Reset input
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    return (
        <>
            {/* Hidden file input */}
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*,.pdf"
                multiple
                onChange={handleFileSelect}
                className="hidden"
            />

            {/* Upload button - compact for inside search box */}
            <button
                onClick={() => fileInputRef.current?.click()}
                className="p-2 hover:bg-primary-200 rounded-full transition-all duration-200 text-text hover:scale-110"
                title="Attach image or PDF"
            >
                <FiPaperclip size={20} />
            </button>

            {/* Attachment previews - shown as floating badges above the input */}
            {attachments.length > 0 && (
                <div className="absolute bottom-full left-5 mb-2 flex gap-2 flex-wrap max-w-[80%]">
                    {attachments.map((att, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-1 px-2 py-1 bg-primary-200 rounded-lg shadow-sm"
                        >
                            {att.type === "image" ? (
                                att.preview ? (
                                    <img
                                        src={att.preview}
                                        alt={att.name}
                                        className="w-6 h-6 object-cover rounded"
                                    />
                                ) : (
                                    <FiImage size={14} />
                                )
                            ) : (
                                <FiFile size={14} className="text-red-500" />
                            )}
                            <span className="text-xs max-w-24 truncate">{att.name}</span>
                            <button
                                onClick={() => removeAttachment(index)}
                                className="ml-1 p-0.5 hover:bg-red-500 hover:text-white rounded-full transition-all"
                            >
                                <FiX size={12} />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
};

export default FileUpload;
