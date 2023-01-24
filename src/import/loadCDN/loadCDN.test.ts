/**
 * @jest-environment jsdom
 */

import loadCDN from './loadCDN';
describe('loadCDN', () => {
  test('CDN을 중복하지 않고 한번만 로딩해온다.', () => {
    loadCDN('test-cdn', 'https://test.cdn.io/404');
    loadCDN('test-cdn', 'https://test.cdn.io/404');
    expect(document.head.querySelectorAll('#test-cdn').length).toBe(1);
  });
});
