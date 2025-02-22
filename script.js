// قائمة القنوات
let channels = [
    { name: "قناة الماتش 1", url: "https://www.sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4" },
    { name: "قناة الماتش 2", url: "https://www.sample-videos.com/video123/mp4/480/big_buck_bunny_480p_1mb.mp4" }
];

// عرض القنوات في الشريط الجانبي
function renderChannels() {
    const channelList = document.getElementById("channel-list");
    channelList.innerHTML = ""; // تفريغ القائمة

    channels.forEach((channel, index) => {
        const li = document.createElement("li");
        li.textContent = channel.name;
        li.onclick = () => selectChannel(index);
        channelList.appendChild(li);
    });
}

// اختيار قناة
function selectChannel(index) {
    const selectedChannel = channels[index];
    document.getElementById("current-channel").textContent = `قناة: ${selectedChannel.name}`;
    const video = document.getElementById("video-stream");
    video.src = selectedChannel.url;
    video.load();
}

// إضافة قناة جديدة
function addChannel() {
    const name = document.getElementById("new-channel-name").value.trim();
    const url = document.getElementById("new-channel-url").value.trim();

    if (name && url) {
        channels.push({ name, url });
        renderChannels();
        document.getElementById("new-channel-name").value = "";
        document.getElementById("new-channel-url").value = "";
    } else {
        alert("يرجى تعبئة جميع الحقول.");
    }
}

// تغيير دقة الفيديو
function changeResolution() {
    const resolution = document.getElementById("resolution").value;
    const video = document.getElementById("video-stream");
    video.width = resolution * 1.77; // نسبة العرض إلى الارتفاع (16:9)
    video.height = resolution;
}

// عند تحميل الصفحة
window.onload = () => {
    renderChannels();
    selectChannel(0); // اختيار القناة الأولى افتراضيًا
}
// حذف قناة
function deleteChannel(index) {
    if (confirm("هل أنت متأكد من حذف هذه القناة؟")) {
        channels.splice(index, 1); // حذف القناة من المصفوفة
        renderChannels(); // إعادة رسم القائمة
        selectChannel(0); // اختيار القناة الأولى افتراضيًا بعد الحذف
    }
}

// عرض القنوات في الشريط الجانبي مع زر الحذف
function renderChannels() {
    const channelList = document.getElementById("channel-list");
    channelList.innerHTML = ""; // تفريغ القائمة

    channels.forEach((channel, index) => {
        const li = document.createElement("li");
        li.textContent = channel.name;

        // إضافة زر حذف
        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-button";
        deleteButton.textContent = "حذف";
        deleteButton.onclick = () => deleteChannel(index);

        // إضافة الزر إلى القناة
        li.appendChild(deleteButton);

        // إضافة المستمع للنقر على القناة
        li.onclick = (event) => {
            if (event.target !== deleteButton) { // التأكد من أن النقر لم يكن على زر الحذف
                selectChannel(index);
            }
        };

        channelList.appendChild(li);
    });
}
