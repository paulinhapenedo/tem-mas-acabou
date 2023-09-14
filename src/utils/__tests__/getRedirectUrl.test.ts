import { getURL } from '../getRedirectUrl';

describe('getRedirectUrl', () => {
  test(`should return localhost when NEXT_PUBLIC_SITE_URL isn't available`, () => {
    const url = getURL();

    expect(url).toBe('http://localhost:3000/');
  });
  test(`localhost shouldn't have https`, () => {
    const url = getURL();

    expect(url).toBe('http://localhost:3000/');
  });
  test('return the value from the NEXT_PUBLIC_SITE_URL when available', () => {
    process.env.NEXT_PUBLIC_SITE_URL = 'https://site.com/';

    const url = getURL();

    expect(url).toBe('https://site.com/');
  });
  test(`should add a trailing slash if URL doesn't have it`, () => {
    process.env.NEXT_PUBLIC_SITE_URL = 'https://site.com';

    const url = getURL();

    expect(url).toBe('https://site.com/');
  });
  test(`add https to URL if it's not localhost`, () => {
    process.env.NEXT_PUBLIC_SITE_URL = 'site.com';
    const url = getURL();

    expect(url).toBe('https://site.com/');
  });
});
