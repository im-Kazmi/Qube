import { createRoot } from 'react-dom/client';
import App from './app';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);
root.render(<App />);

// calling IPC exposed from preload script
window.qube.ipcRenderer.once('hello', (arg) => {
  // eslint-disable-next-line no-console
  console.log(arg);
});
window.qube.ipcRenderer.sendMessage('hello', ['ping']);
