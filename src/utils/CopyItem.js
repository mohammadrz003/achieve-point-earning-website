import { toast } from "react-hot-toast";

const defaultCopySuccessMessage = "ID copied!";

const CopyItem = (props) => {
  const { copySuccessMessage = defaultCopySuccessMessage, value } = props;

  function fallbackToCopy(text) {
    if (window.clipboardData && window.clipboardData.setData) {
      // IE specific code path to prevent textarea being shown while dialog is visible.
      return window.clipboardData.setData("Text", text);
    } else if (
      document.queryCommandSupported &&
      document.queryCommandSupported("copy")
    ) {
      const textarea = document.createElement("textarea");
      textarea.innerText = text;
      // const parentElement=document.querySelector(".up-CopyItem-copy-button")
      const parentElement = document.getElementById("copy");
      if (!parentElement) {
        return;
      }
      parentElement.appendChild(textarea);
      textarea.style.position = "fixed"; // Prevent scrolling to bottom of page in MS Edge.
      textarea.select();
      try {
        toast.success(copySuccessMessage);
        document.execCommand("copy"); // Security exception may be thrown by some browsers.
      } catch (ex) {
        console.log("Copy to clipboard failed.", ex);
        toast.error("Copy to clipboard failed.");
        return false;
      } finally {
        parentElement.removeChild(textarea);
      }
    }
  }

  const copyID = () => {
    if (!navigator.clipboard) {
      fallbackToCopy(value);
      return;
    }
    navigator.clipboard.writeText(value);
    toast.success(copySuccessMessage);
  };

  return (
    <span
      id="copy"
      className="bg-purple-500 text-white px-3 py-2 rounded-lg font-semibold"
    >
      <button onClick={copyID}>Copy referral code</button>
    </span>
  );
};
export default CopyItem;
