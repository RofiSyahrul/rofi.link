export default function copyToClipboard(
  doc: Document,
  copiedText: string,
) {
  const textarea = doc.createElement('textarea');

  textarea.style.fontSize = '12pt';
  textarea.style.border = '0';
  textarea.style.padding = '0';
  textarea.style.margin = '0';
  textarea.style.position = 'absolute';
  textarea.style.left = '-9999px';
  textarea.style.top = `${window.scrollY ?? doc.documentElement.scrollTop}px`;

  textarea.setAttribute('readonly', '');
  textarea.value = copiedText;
  doc.body.append(textarea);

  textarea.select();
  doc.execCommand('copy');
  textarea.remove();
}
