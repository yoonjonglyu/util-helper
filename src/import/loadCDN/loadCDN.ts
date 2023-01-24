function loadCDN(id: string, src: string) {
  if (document.head.querySelector(`#${id}`) === null) {
    const CDNNode = document.createElement('script');
    CDNNode.id = id;
    CDNNode.src = src;
    document.head.appendChild(CDNNode);
  }
}

export default loadCDN;
