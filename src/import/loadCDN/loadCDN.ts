type LoadCDNOptions = {
  async?: boolean;
  defer?: boolean;
  type?: string;
  charset?: string;
  crossorigin?: 'anonymous' | 'use-credentials';
  integrity?: string;
  nonce?: string;
  nomodule?: boolean;
  referrerpolicy?: 'no-referrer' | 'no-referrer-when-downgrade' | 'origin' | 'origin-when-cross-origin' | 'unsafe-url' | 'same-origin';
  // convenient container for data-* attributes
  dataset?: Record<string, string>;
  // allow data-* attributes directly (e.g. "data-test": "value")
  [dataAttr: `data-${string}`]: string | undefined;
};

function loadCDN(id: string, src: string, options?: LoadCDNOptions): Promise<void> {
  if (!document.head.querySelector(`#${id}`)) {
    const CDNNode = document.createElement('script');
    CDNNode.setAttribute('id', id);
    CDNNode.setAttribute('src', src);

    if (options) {
      Object.entries(options).forEach(([key, value]) => {
        CDNNode.setAttribute(key, `${value}`);
      });
    }

    document.head.appendChild(CDNNode);

    return new Promise((resolve, reject) => {
      CDNNode.onload = () => resolve();
      CDNNode.onerror = () => reject(new Error(`Failed to load script: ${src}`));
    });
  }

  return Promise.resolve();
}

export default loadCDN;
