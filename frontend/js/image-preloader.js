export const preloadImages = {
  retina: window.devicePixelRatio > 1,
  loadedImage: {},

  load(urls = []) {
    const filteredUrl = this.filter(urls);

    return Promise.all(
      filteredUrl.map((url) => {
        if (!this.loadedImage[url]) {
          this.loadedImage[url] = this.loadImage(url);
        }
        return this.loadedImage[url];
      })
    );
  },

  loadImage(url) {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => {
        resolve(url);
      };
      image.src = url;

      if (image.complete) {
        resolve(url);
      }

      image.onerror = (e) => {
        reject(e);
      };
    });
  },

  filter(urls = []) {
    return this.combine(this.parse(urls));
  },

  parse(urls = []) {
    return urls.map(url => this.parseItem(url));
  },

  parseItem(url) {
    const splitedUrlByDots = url.split('.');
    const latestItem = splitedUrlByDots.length === 2 ? 1 : 2;

    const hash = splitedUrlByDots.length === 2 ? null : splitedUrlByDots[1];
    const isRetina = this.checkIsRetina(splitedUrlByDots[0]);
    const name = this.getImageName(splitedUrlByDots[0]);
    const ext = this.getExtension(splitedUrlByDots[latestItem]);
    const query = this.getQuery(splitedUrlByDots[latestItem]);

    return { hash, isRetina, name, ext, query };
  },

  combine(imageObjects) {
    const resultUrls = [];
    const imagesByName = {};

    imageObjects.forEach((imageObject) => {
      if (!imagesByName[imageObject.name]) {
        imagesByName[imageObject.name] = {};
      }
      imagesByName[imageObject.name][imageObject.isRetina ? 'retina' : 'default'] = imageObject;
    });

    return Object.keys(imagesByName)
      .map((key) => {
        if (preloadImages.retina && imagesByName[key].retina) {
          return imagesByName[key].retina;
        } else {
          return imagesByName[key].default;
        }
      })
      .map(this.convertToUrl);
  },

  convertToUrl(imageObject) {
    const result = [];

    result.push(imageObject.name);

    if (imageObject.isRetina) {
      result[0] += '@2x';
    }

    if (imageObject.hash) {
      result.push(imageObject.hash);
    }

    result.push(imageObject.ext);

    if (imageObject.query) {
      result[result.length - 1] += `?${imageObject.query}`;
    }

    return result.join('.');
  },

  checkIsRetina(string) {
    return string.indexOf('@2x') !== -1;
  },

  getImageName(string) {
    return string.split('@2x')[0];
  },

  getExtension(string) {
    return string.split('?')[0];
  },

  getQuery(string) {
    return string.split('?')[1] || null;
  }
}
