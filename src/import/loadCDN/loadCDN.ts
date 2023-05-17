type LoadCDNOptions = {
  [key: string]: any;
};

function loadCDN(id: string, src: string, options?: LoadCDNOptions): void {
  if (!document.head.querySelector(`#${id}`)) {
    const CDNNode = document.createElement('script');
    CDNNode.setAttribute('id', id);
    CDNNode.setAttribute('src', src);

    if (options) {
      Object.entries(options).forEach(([key, value]) => {
        CDNNode.setAttribute(key, value);
      });
    }

    document.head.appendChild(CDNNode);
  }
}

export default loadCDN;
