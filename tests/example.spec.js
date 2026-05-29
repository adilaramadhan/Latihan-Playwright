const { test, expect } = require('@playwright/test');

// Test 1: Verifikasi halaman login muncul
test('TC-001 | Halaman login berhasil ditampilkan', async ({ page }) => {
  await page.goto('https://stag-cbt.adv.my.id/login');

  await expect(page.locator('h3:has-text("Login")')).toBeVisible();
  await expect(page.locator('text=Masuk untuk memulai ujian online')).toBeVisible();
  await expect(page.locator('input[placeholder="Masukkan Email / NISN / NIP"]')).toBeVisible();
  await expect(page.locator('input[placeholder="Masukkan password"]')).toBeVisible();
  await expect(page.locator('button:has-text("Masuk")')).toBeVisible();

  console.log('TC-001 PASSED: Halaman login tampil dengan benar');
});

// Test 2: Login berhasil
test('TC-002 | Login berhasil dengan kredensial valid', async ({ page }) => {
  await page.goto('https://stag-cbt.adv.my.id/login');

  await page.fill('input[placeholder="Masukkan Email / NISN / NIP"]', 'test');
  await page.fill('input[placeholder="Masukkan password"]', 'test');
  await page.click('button:has-text("Masuk")');
  await page.waitForLoadState('networkidle');

  // Verifikasi pindah dari halaman login
  await expect(page).not.toHaveURL(/login/);
  console.log('TC-002 PASSED: Login berhasil');
});

// Test 3: Login dengan password salah
test('TC-003 | Login gagal dengan password salah', async ({ page }) => {
  await page.goto('https://stag-cbt.adv.my.id/login');

  await page.fill('input[placeholder="Masukkan Email / NISN / NIP"]', 'test');
  await page.fill('input[placeholder="Masukkan password"]', 'passwordsalah123');
  await page.click('button:has-text("Masuk")');
  await page.waitForLoadState('networkidle');

  // Verifikasi tetap di halaman login
  await expect(page).toHaveURL(/login/);
  console.log('TC-003 PASSED: Login gagal seperti ekspektasi');
});

// Test 4: Login dengan email salah
test('TC-004 | Login gagal dengan email salah', async ({ page }) => {
  await page.goto('https://stag-cbt.adv.my.id/login');

  await page.fill('input[placeholder="Masukkan Email / NISN / NIP"]', 'emailsalah@test.com');
  await page.fill('input[placeholder="Masukkan password"]', 'test');
  await page.click('button:has-text("Masuk")');
  await page.waitForLoadState('networkidle');

  await expect(page).toHaveURL(/login/);
  console.log('TC-004 PASSED: Login gagal dengan email salah');
});

// Test 5: Login dengan field kosong semua
test('TC-005 | Login gagal dengan field kosong', async ({ page }) => {
  await page.goto('https://stag-cbt.adv.my.id/login');

  await page.click('button:has-text("Masuk")');
  await page.waitForLoadState('networkidle');

  await expect(page).toHaveURL(/login/);
  console.log('TC-005 PASSED: Validasi field kosong berjalan');
});

// Test 6: Login dengan email kosong
test('TC-006 | Login gagal dengan email kosong', async ({ page }) => {
  await page.goto('https://stag-cbt.adv.my.id/login');

  await page.fill('input[placeholder="Masukkan password"]', 'test');
  await page.click('button:has-text("Masuk")');
  await page.waitForLoadState('networkidle');

  await expect(page).toHaveURL(/login/);
  console.log('TC-006 PASSED: Validasi email kosong berjalan');
});

// Test 7: Login dengan password kosong
test('TC-007 | Login gagal dengan password kosong', async ({ page }) => {
  await page.goto('https://stag-cbt.adv.my.id/login');

  await page.fill('input[placeholder="Masukkan Email / NISN / NIP"]', 'test');
  await page.click('button:has-text("Masuk")');
  await page.waitForLoadState('networkidle');

  await expect(page).toHaveURL(/login/);
  console.log('TC-007 PASSED: Validasi password kosong berjalan');
});

// Test 8: Cek tombol show/hide password
test('TC-008 | Tombol show hide password berfungsi', async ({ page }) => {
  await page.goto('https://stag-cbt.adv.my.id/login');

  const passwordInput = page.locator('input[placeholder="Masukkan password"]');

  // Default harusnya type=password (tersembunyi)
  await expect(passwordInput).toHaveAttribute('type', 'password');

  // Klik tombol show password
  await page.click('button.focus\\:outline-none');

  // Setelah klik harusnya type=text (terlihat)
  await expect(passwordInput).toHaveAttribute('type', 'text');

  console.log('TC-008 PASSED: Show hide password berfungsi');
});