export default function copyToClipboard(copiedText: string) {
  if (typeof document === 'undefined') return;

  const textarea = document.createElement('textarea');

  textarea.style.fontSize = '12pt';
  textarea.style.border = '0';
  textarea.style.padding = '0';
  textarea.style.margin = '0';
  textarea.style.position = 'absolute';
  textarea.style.left = '-9999px';
  textarea.style.top = `${window.scrollY ?? document.documentElement.scrollTop}px`;

  textarea.setAttribute('readonly', '');
  textarea.value = copiedText;
  document.body.appendChild(textarea);

  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
}
