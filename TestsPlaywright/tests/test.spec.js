const { test, expect } = require('@playwright/test');
const fs = require('fs')
const { MainPage } = require('../framework/pages/main');
const uploadFile = 'input.txt'
const saveFile = 'output.txt'

test.beforeEach(async ({ page }, testInfo) => {
  console.log(`Running ${testInfo.title}`);
  await page.goto('/');
});

test.describe('Tasks', ()=>{
  test('Task 1', async ({page})=>{
    const mainPage = new MainPage(page)
    await mainPage.uploadFile({uploadFilePath:uploadFile})
    await mainPage.saveFile({saveFilePath:saveFile})
    let pageStatusAfterReload = await page.reload()
    expect(pageStatusAfterReload.status()).toEqual(200)
    const uploadedData = fs.readFileSync(`../WebApp/${uploadFile}`, "utf8")
    const downloadedData = fs.readFileSync(`../WebApp/${saveFile}`, "utf8")
    expect(uploadedData, 'Данные не равны').toEqual(downloadedData)
  })

  test('Task 2', async ({page})=>{
    const mainPage = new MainPage(page)
    await mainPage.uploadFile({uploadFilePath: 'some value', saveIt:false})
    await mainPage.saveFile({saveFilePath: 'some value ', saveIt:false})
    await page.reload()
    await expect(await page.locator('[id="uploadInput"]'), 'После обновления инпут на загрузку не пустой').toBeEmpty()
    await expect(await page.locator('[id="saveInput"]'),'После обновления инпут на сохранение не пустой').toBeEmpty()

  })

})