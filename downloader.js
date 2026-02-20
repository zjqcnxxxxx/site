async function download() {
  const url = document.getElementById('url').value.trim();
  const links = document.getElementById('links');
  if (!url) return alert('请输入链接');
  links.style.display = 'block';
  links.textContent = '加载中...';

  // 使用第三方 API，无版权压力
  const api = `https://api.dltube.me/api/v1/analyze?url=` + encodeURIComponent(url);
  const res   = await fetch(api);
  const data  = await res.json();

  if (data.success) {
    let html = '';
    data.formats.forEach(f => {
      html += `${f.quality} - ${f.ext} - ${f.size}\n${f.url}\n\n`;
    });
    links.textContent = html;
  } else {
    links.textContent = data.error || '解析失败';
  }
}
