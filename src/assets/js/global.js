const ipc = window.electronAPI;

window.addEventListener('load', () => {
	if (document.getElementById('app-version')) {
		ipc.sendVersion();
	}
});