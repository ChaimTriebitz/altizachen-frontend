function on(eventName, listener) {

   const callListener = ({ detail }) => {
      listener(detail);
   };

   window.addEventListener(eventName, callListener);

   return () => {
      window.removeEventListener(eventName, callListener);
   };
}

function emit(eventName, data) {
   window.dispatchEvent(new CustomEvent(eventName, { detail: data }));
}

export const msgEvent = { on, emit };

export function showMsg(txt, type = '') {
   msgEvent.emit('show-msg', { txt, type })
}
export function showSuccessMsg(txt) {
   showMsg(txt, 'success')
}
export function showErrorMsg(txt) {
   showMsg(txt, 'error')
}
export function showWarningMsg(txt) {
   showMsg(txt, 'warning')
}

window.myBus = msgEvent;
window.showMsg = showMsg;
