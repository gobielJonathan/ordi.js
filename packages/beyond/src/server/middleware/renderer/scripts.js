export const mainBundles = ['main', 'runtime', 'vendors~main'];

export default function createScriptTag({
  src,
  type = '',
  nomodule = false,
  nonce,
}) {
  if (src) {
    const nonceString = nonce ? `nonce="${nonce}"` : '';
    return `<script defer="defer" src="${process.env.HOST_CLIENT}/${src}.js" ${
      type ? `type="${type}"` : ''
    } ${
      nomodule ? 'nomodule' : ''
    } crossorigin="anonymous" ${nonceString}></script>`;
  }
  return '';
}
