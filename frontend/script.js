const form = document.getElementById('specForm');
const result = document.getElementById('result');
const statusP = document.getElementById('status');
const downloadLink = document.getElementById('downloadLink');
const previewFrame = document.getElementById('previewFrame');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  result.hidden = false;
  statusP.textContent = 'جاري إرسال الطلب إلى الخادم...';
  const data = {
    title: document.getElementById('title').value,
    type: document.getElementById('type').value,
    colors: document.getElementById('colors').value,
    desc: document.getElementById('desc').value
  };
  try {
    const resp = await fetch('http://localhost:3000/generate', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(data)
    });
    const j = await resp.json();
    if (j.error) {
      statusP.textContent = 'خطأ: ' + j.error;
      return;
    }
    statusP.textContent = 'تم الإنشاء! جاهز للتحميل والمعاينة.';
    downloadLink.href = j.zip_url;
    previewFrame.src = j.preview_url || '';
  } catch (err) {
    statusP.textContent = 'فشل الاتصال بالخادم: ' + err.message;
    console.error(err);
  }
});
