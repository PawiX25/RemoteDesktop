const peer = new Peer();
let connection = null;
let currentMode = null;

const remoteVideo = document.getElementById('remoteVideo');
const shareScreenBtn = document.getElementById('shareScreenBtn');
const connectBtn = document.getElementById('connectBtn');
const peerIdInput = document.getElementById('peerIdInput');
const connectionStatus = document.getElementById('connectionStatus');
const hostControls = document.getElementById('hostControls');
const clientControls = document.getElementById('clientControls');
const modeSelect = document.getElementById('modeSelect');

function selectMode(mode) {
    currentMode = mode;
    modeSelect.style.display = 'none';
    
    if (mode === 'host') {
        hostControls.classList.remove('hidden');
        clientControls.classList.add('hidden');
    } else {
        hostControls.classList.add('hidden');
        clientControls.classList.remove('hidden');
    }
}

function updateConnectionStatus(status, connected = false) {
    const dot = connectionStatus.querySelector('span:first-child');
    const text = connectionStatus.querySelector('span:last-child');
    
    dot.className = `h-3 w-3 rounded-full ${connected ? 'bg-green-500' : 'bg-gray-500'}`;
    text.textContent = status;
}

peer.on('open', (id) => {
    document.getElementById('myPeerId').textContent = `Your ID: ${id}`;
});

peer.on('connection', (conn) => {
    connection = conn;
    updateConnectionStatus('Connected', true);
});

peer.on('call', (call) => {
    call.answer();
    call.on('stream', (remoteStream) => {
        remoteVideo.srcObject = remoteStream;
        document.getElementById('noStreamMessage').style.display = 'none';
        updateConnectionStatus('Stream connected', true);
    });
});

connectBtn.addEventListener('click', () => {
    const peerId = peerIdInput.value;
    if (!peerId) return;
    
    updateConnectionStatus('Connecting...');
    connection = peer.connect(peerId);
    connection.on('open', () => {
        updateConnectionStatus('Connected', true);
    });
});

shareScreenBtn.addEventListener('click', async () => {
    try {
        shareScreenBtn.disabled = true;
        shareScreenBtn.innerHTML = 'Sharing...';
        
        const stream = await navigator.mediaDevices.getDisplayMedia({
            video: true,
            audio: true
        });
        
        stream.getVideoTracks()[0].onended = () => {
            shareScreenBtn.disabled = false;
            shareScreenBtn.innerHTML = '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>Share Screen';
            updateConnectionStatus('Screen sharing ended', false);
        };

        if (connection) {
            const call = peer.call(connection.peer, stream);
            updateConnectionStatus('Screen sharing active', true);
        }
        
        document.getElementById('noStreamMessage').style.display = 'none';
    } catch (err) {
        console.error(err);
        shareScreenBtn.disabled = false;
        shareScreenBtn.innerHTML = '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>Share Screen';
    }
});
