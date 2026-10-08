import { escapeHtml, unescapeHtml } from './escapeHtml';

describe('escapeHtml & unescapeHtml', () => {
  it('should escape special HTML characters to prevent XSS injection', () => {
    expect(escapeHtml('<script>alert("XSS & danger")</script>')).toBe(
      '&lt;script&gt;alert(&quot;XSS &amp; danger&quot;)&lt;/script&gt;'
    );
    expect(escapeHtml("Tom & Jerry's")).toBe('Tom &amp; Jerry&#39;s');
  });

  it('should unescape HTML entities back to characters', () => {
    expect(
      unescapeHtml('&lt;script&gt;alert(&quot;XSS &amp; danger&quot;)&lt;/script&gt;')
    ).toBe('<script>alert("XSS & danger")</script>');
    expect(unescapeHtml('Tom &amp; Jerry&#39;s')).toBe("Tom & Jerry's");
    expect(unescapeHtml('Tom &amp; Jerry&#x27;s')).toBe("Tom & Jerry's");
  });

  it('should handle empty or invalid inputs', () => {
    expect(escapeHtml('')).toBe('');
    expect(escapeHtml(null as any)).toBe('');
    expect(unescapeHtml('')).toBe('');
    expect(unescapeHtml(null as any)).toBe('');
  });
});
