import { useEffect, useState } from "react";
import axios from "axios";
import SummaryStore from "../store/summaryStore";
import { MdContentCopy } from "react-icons/md";

const Summary = () => {
  const { youtubeUrl, summarizedText, setYoutubeUrl, setSummarizedText } =
    SummaryStore();

  const [copyFeedback, setCopyFeedback] = useState("");

  // Function to summarize the YouTube video
  const summarizeVideo = async () => {
    // Perform summarization logic here, for now, let's just display the URL
    try {
      const response = await axios.get(
        `http://localhost:6969/api/v1/summary/get-summary?url=${youtubeUrl}`
      );
      // console.log(response.data);

      setSummarizedText(response.data);
    } catch (error) {
      console.log(error);
      setSummarizedText("Error fetching summary");
    }
  };

  useEffect(() => {
    // Fetch the YouTube URL from the current tab and set it as input value
    chrome.tabs.query(
      { active: true, currentWindow: true },
      function (tabs: chrome.tabs.Tab[]) {
        const tab: chrome.tabs.Tab = tabs[0];
        if (tab.url?.includes("youtube.com") || tab.url?.includes("youtu.be")) {
          setYoutubeUrl(tab.url);
        }
      }
    );
  }, []);

  useEffect(() => {
    if (youtubeUrl) {
      summarizeVideo();
    }
  }, [youtubeUrl]);

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(summarizedText)
      .then(() => setCopyFeedback("Copied!"))
      .catch(() => setCopyFeedback("Copy failed. Please try again."));
  };

  return (
    <div className="bg-gray-900 flex justify-center items-center  h-[500px]">
      <div className="bg-white shadow-md rounded-lg p-8 h-[480px] w-[480px] ">
        {/* Input and Button */}
        <div className="flex items-center mb-4">
          <input
            type="text"
            value={youtubeUrl}
            onChange={(e) => setYoutubeUrl(e.target.value)}
            className="border-none bg-gray-100 text-black py-2 px-4 w-full placeholder-black"
            placeholder="Enter YouTube URL"
          />
          <button
            onClick={summarizeVideo}
            disabled={!youtubeUrl}
            className="ml-4 px-6 py-2 bg-blue-700 text-white font-semibold rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
          >
            Summarize
          </button>
        </div>
        {/* Summarized Text */}
        <div className="text-sm overflow-auto custom-scrollbar relative  h-[24rem]">
          {summarizedText}
          <button
            onClick={copyToClipboard}
            className="absolute bottom-4 right-4 p-2 bg-gray-200 rounded-full hover:bg-gray-300 focus:outline-none"
            title="Copy Summary"
          >
            <MdContentCopy size={24} />
          </button>
          {/* Copy Feedback */}
          {copyFeedback && (
            <p className="text-xs text-gray-500 absolute bottom-10 right-4">
              {copyFeedback}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Summary;
