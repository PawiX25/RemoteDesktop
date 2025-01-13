# ScreenPeer

A lightweight peer-to-peer screen sharing application built with WebRTC.

## Features

- Direct peer-to-peer connection
- No server requirements
- Adjustable quality settings
- Real-time screen sharing
- Audio support
- Connection status monitoring

## Technologies

- PeerJS (WebRTC)
- TailwindCSS
- Vanilla JavaScript

## Setup

1. Clone the repository
2. Open index.html in a modern browser
3. No build process required

## Usage

### As Host
1. Click "Host Screen"
2. Share your ID with the viewer
3. Select quality settings
4. Click "Share Screen"
5. Choose the screen/window to share

### As Viewer
1. Click "View Screen"
2. Enter the host's ID
3. Click "Connect"
4. Wait for the host to start sharing

## Quality Settings

- High: 1920x1080 @ 30fps
- Medium: 1280x720 @ 25fps
- Low: 854x480 @ 15fps

## Known Issues

### Connection Limitations
This application currently uses direct peer-to-peer connections only. It may not work in all network configurations due to:
- Missing TURN server support
- Firewall restrictions
- Symmetric NAT configurations

To make it work reliably in production:
1. Set up a TURN server
2. Configure PeerJS with ICE servers in app.js

## Browser Support

Works in modern browsers that support WebRTC:
- Chrome
- Firefox
- Edge
- Opera