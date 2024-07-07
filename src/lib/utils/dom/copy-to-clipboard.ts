export default async function copyToClipboard(
  win: Window,
  doc: Document,
  copiedText: string,
) {
  let isCopied = false;

  try {
    await win.navigator.clipboard.writeText(copiedText);
    isCopied = true;
  } catch {
    // silent
  }

  if (isCopied) {
    return;
  }

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
