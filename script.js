// بيانات القنوات (يمكن استبدالها بقراءة من ملف JSON أو API)
const channels = [
    { name: "قناة BeIN Sports 1", url: "https://5d00db0e0fcd5.streamlock.net/7236/7236/playlist.m3u8" },
    { name: "قناة BeIN Sports 2", url: "https://5d00db0e0fcd5.streamlock.net/7236/7236/playlist.m3u8" },
    { name: "قناة Al Jazeera Sport", url: "https://5d00db0e0fcd5.streamlock.net/7236/7236/playlist.m3u8" },
    { name: "قناة Match TV", url: "https://5d00db0e0fcd5.streamlock.net/7236/7236/playlist.m3u8" },
];

// اختيار العناصر
const channelList = document.getElementById("channel-list");
const videoPlayer = document.getElementById("video-player");

// إنشاء قائمة القنوات ديناميكيًا
channels.forEach((channel, index) => {
    const listItem = document.createElement("li");
    listItem.textContent = channel.name;
    listItem.dataset.index = index;
    listItem.addEventListener("click", () => selectChannel(index));
    channelList.appendChild(listItem);
});

// تحديد القناة المختارة
function selectChannel(index) {
    const selectedChannel = channels[index];
    if (selectedChannel) {
        // تحديث مصدر الفيديو
        videoPlayer.src = selectedChannel.url;
        videoPlayer.load();
        videoPlayer.play();
    }
}

// تحميل القناة الأولى تلقائيًا عند فتح الصفحة
if (channels.length > 0) {
    selectChannel(0);
}
