import DOMPurify from 'dompurify';

const getSanitizedParagraphContent = (htmlContent, charLimit) => {
    const sanitizedContent = DOMPurify.sanitize(htmlContent);
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = sanitizedContent;

    // Extract only the paragraph tags
    const paragraphs = tempDiv.querySelectorAll("p");
    const paragraphText = Array.from(paragraphs)
        .map((p) => p.innerText)
        .join(" ")
        .slice(0, charLimit); // Limiting to the specified character limit for preview

    return paragraphText + (paragraphText.length >= charLimit ? "..." : "");
};

export default getSanitizedParagraphContent;