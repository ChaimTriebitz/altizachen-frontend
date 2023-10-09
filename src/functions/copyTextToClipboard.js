import { showSuccessMsg, showWarningMsg } from './msgEvent';

export const copyTextToClipboard = async (text) => {
   try {
      await navigator.clipboard.writeText(text)
      showSuccessMsg(text + ' Copied to clipboard')
   } catch (error) {
      console.error('Failed to copy text', error);
   }
}