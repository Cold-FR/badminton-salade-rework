const ipc = require("electron").ipcRenderer;

window.addEventListener('load', () => {
	if (document.getElementById('app-version')) {
		ipc.send('version');
		ipc.on('version', (e, data) => {
			document.getElementById('app-version').innerText += ' ' + data;
		});
	}
});