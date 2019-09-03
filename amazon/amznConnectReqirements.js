/*
voice represents the number of voice and video users. 
screenShare repensents the number of presenters simulatinously shareing screens.
*/
module.exports = function (voice, video, screenShare) {
    return new Promise((resolve, reject) => {
        if (typeof(voice) !== 'number') reject(voice);
        if (typeof(video) !== 'number') reject(video);
        if (typeof(screenShare) !== 'number') reject(screenShare);

        const userVoiceCount = voice; 
        const userVideoCount = video; 
        const userScreenShareCount = screenShare;
        const audioSmall = 54; // in Kbps
        const audioLarge = audioSmall + 32; // no more than 32 kbps extra down for 50 callers
        const voiceKbps = userVoiceCount > 10 ? {
            up: (userVoiceCount * audioLarge), down: (userVoiceCount * audioLarge)
        } : {
            up: (userVoiceCount * audioSmall), down: (userVoiceCount * audioSmall)
        };

        const videoSmall = userVideoCount > 0 ? 650 : 0;
        const videoHdUp = (userVideoCount * 1400);
        const videoHdDown = (userVideoCount * 1400);
        const videoMediumUp = (userVideoCount * 450);
        const videoMediumDown = ((userVideoCount - 1) * 400);
        const videoLargeUp = (userVideoCount * 184);
        const videoLargeDown = ((userVideoCount - 1) * 134);
        const videoKbps = userVideoCount <= 4 ? {
            up: videoSmall,down: videoSmall 
        } : userVideoCount <= 16 ? {
                up: videoLargeUp, down: videoLargeDown 
            } : {
                    up: videoMediumUp,
                    down: videoMediumDown,
                };

        const videoHdKbps = {up:videoHdUp, down:videoHdDown};
        const screenSharingUp = userScreenShareCount > 0 ? ((userScreenShareCount * 2048) + (userScreenShareCount + 800)) : 0 // 800 kbps for remote control
        const screenSharingDown =   userScreenShareCount > 0 ? ((userScreenShareCount * 2048) + (userScreenShareCount + 800)) : 0 // 800 kbps for remote control
        const screenSharingKbps = {up: screenSharingUp, down: screenSharingDown};
        const totals = (data, key) => {
            return data.reduce((n,o) => (n + o[key]), 0);
        };
        
        const asMbps = (data) => {
            const {up, down} = data;
            const Mbps = 1024;
            const upMbps = +(up/Mbps).toPrecision(2);
            const downMpbs = +(down/Mbps).toPrecision(2)
            return {up: upMbps, down: downMpbs};
        };
        const totalKbps = {
            up: totals([voiceKbps, videoKbps, videoHdKbps, screenSharingKbps], 'up'),
            down: totals([voiceKbps, videoKbps, videoHdKbps, screenSharingKbps], 'down'),
        };
        const result = {
            voiceKbps, voiceMpbs: asMbps(voiceKbps),
            videoKbps, videoMbps: asMbps(videoKbps), 
            videoHdKbps, videoHdMbps: asMbps(videoHdKbps),
            screenSharingKbps, screenSharingMbps: asMbps(screenSharingKbps),
            totalKbps, totalMbps: asMbps(totalKbps)
        };
        resolve(result);
    });
}