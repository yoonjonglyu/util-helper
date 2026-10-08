import isBrowser from "../../typecheck/isBrowser/isBrowser";

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

const loadingScripts = new Map<string, Promise<void>>();

function loadCDN(id: string, src: string, options?: LoadCDNOptions): Promise<void> {
  if (!isBrowser()) return Promise.resolve();

  // If script already exists in DOM
  const existingNode = document.getElementById(id);
  if (existingNode) {
    // If it's currently loading, return the pending promise
    if (loadingScripts.has(id)) {
      return loadingScripts.get(id)!;
    }
    return Promise.resolve();
  }

  const CDNNode = document.createElement('script');
  CDNNode.id = id;
  CDNNode.src = src;

  if (options) {
    const { dataset, async: isAsync, defer: isDefer, nomodule, ...rest } = options;

    if (isAsync !== undefined) CDNNode.async = isAsync;
    if (isDefer !== undefined) CDNNode.defer = isDefer;
    if (nomodule !== undefined) CDNNode.noModule = nomodule;

    if (dataset) {
      Object.entries(dataset).forEach(([k, v]) => {
        CDNNode.dataset[k] = v;
      });
    }

    Object.entries(rest).forEach(([key, value]) => {
      if (value !== undefined) {
        CDNNode.setAttribute(key, String(value));
      }
    });
  }

  const promise = new Promise<void>((resolve, reject) => {
    CDNNode.onload = () => {
      loadingScripts.delete(id);
      resolve();
    };
    CDNNode.onerror = () => {
      loadingScripts.delete(id);
      CDNNode.remove();
      reject(new Error(`Failed to load script: ${src}`));
    };
  });

  loadingScripts.set(id, promise);
  document.head.appendChild(CDNNode);

  return promise;
}

export default loadCDN;
