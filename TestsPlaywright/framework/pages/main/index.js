class MainPage {
  constructor(page) {
    this.page = page;

  }

  async uploadFile({uploadFilePath, saveIt=true}){
    if (uploadFilePath === undefined) {
      throw new Error('uploadFile is required argument');
    }
    await this.page.click("'Upload and Save'")
    await this.page.fill('input[id="uploadInput"]', uploadFilePath)
    if(saveIt){
      await this.page.click('[id="uploadButton"]')
    }

  }

  async saveFile({saveFilePath, saveIt=true}){
    if (saveFilePath === undefined) {
      throw new Error('saveFile is required argument');
    }
    await this.page.fill('input[id="saveInput"]', saveFilePath)

    if(saveIt){
      await this.page.click('[id="saveButton"]')
    }
  }


}

module.exports = {
  MainPage,
}