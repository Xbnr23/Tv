// اختيار العناصر
const channelList = document.getElementById("channel-list");
const videoPlayer = document.getElementById("video-player");

// قراءة ملف نصي الذي يحتوي على القنوات
async function loadChannels() {
    try {
        const response = await fetch("channelslist.txt");
        const text = await response.text();

        // تحليل الملف النصي واستخراجه كقائمة قنوات
        const channels = text
            .trim() // إزالة الأحرف الفارغة من البداية والنهاية
            .split("\n") // تقسيم النص إلى صفوف
            .map(line => line.split("|")) // تقسيم كل صف إلى اسم القناة ورابط البث
            .filter(channel => channel.length === 2) // التأكد من وجود اسم القناة ورابط البث
            .map(([name, url]) => ({ name, url })); // تحويل الصفوف إلى أوبجكت

        // إنشاء قائمة القنوات ديناميكيًا
        channels.forEach((channel, index) => {
            const listItem = document.createElement("li");
            listItem.textContent = channel.name;
            listItem.dataset.index = index;
            listItem.addEventListener("click", () => selectChannel(index, channels));
            channelList.appendChild(listItem);
        });

        // تحميل القناة الأولى تلقائيًا عند فتح الصفحة
        if (channels.length > 0) {
            selectChannel(0, channels);
        }
    } catch (error) {
        console.error("حدث خطأ أثناء تحميل القنوات:", error);
    }
}

// تحديد القناة المختارة
function selectChannel(index, channels) {
    const selectedChannel = channels[index];
    if (selectedChannel) {
        // تحديث مصدر الفيديو
        videoPlayer.src = selectedChannel.url;
        videoPlayer.load();
        videoPlayer.play();
    }
}

// تشغيل الوظيفة الرئيسية لتحميل القنوات
loadChannels();
