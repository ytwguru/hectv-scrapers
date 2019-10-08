(function(e, a) {
  for (var i in a) e[i] = a[i];
})(
  exports,
  /******/ (function(modules) {
    // webpackBootstrap
    /******/ // The module cache
    /******/ var installedModules = {}; // The require function
    /******/
    /******/ /******/ function __webpack_require__(moduleId) {
      /******/
      /******/ // Check if module is in cache
      /******/ if (installedModules[moduleId]) {
        /******/ return installedModules[moduleId].exports;
        /******/
      } // Create a new module (and put it into the cache)
      /******/ /******/ var module = (installedModules[moduleId] = {
        /******/ i: moduleId,
        /******/ l: false,
        /******/ exports: {}
        /******/
      }); // Execute the module function
      /******/
      /******/ /******/ modules[moduleId].call(
        module.exports,
        module,
        module.exports,
        __webpack_require__
      ); // Flag the module as loaded
      /******/
      /******/ /******/ module.l = true; // Return the exports of the module
      /******/
      /******/ /******/ return module.exports;
      /******/
    } // expose the modules object (__webpack_modules__)
    /******/
    /******/
    /******/ /******/ __webpack_require__.m = modules; // expose the module cache
    /******/
    /******/ /******/ __webpack_require__.c = installedModules; // define getter function for harmony exports
    /******/
    /******/ /******/ __webpack_require__.d = function(exports, name, getter) {
      /******/ if (!__webpack_require__.o(exports, name)) {
        /******/ Object.defineProperty(exports, name, {
          enumerable: true,
          get: getter
        });
        /******/
      }
      /******/
    }; // define __esModule on exports
    /******/
    /******/ /******/ __webpack_require__.r = function(exports) {
      /******/ if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
        /******/ Object.defineProperty(exports, Symbol.toStringTag, {
          value: "Module"
        });
        /******/
      }
      /******/ Object.defineProperty(exports, "__esModule", { value: true });
      /******/
    }; // create a fake namespace object // mode & 1: value is a module id, require it // mode & 2: merge all properties of value into the ns // mode & 4: return value when already ns object // mode & 8|1: behave like require
    /******/
    /******/ /******/ /******/ /******/ /******/ /******/ __webpack_require__.t = function(
      value,
      mode
    ) {
      /******/ if (mode & 1) value = __webpack_require__(value);
      /******/ if (mode & 8) return value;
      /******/ if (
        mode & 4 &&
        typeof value === "object" &&
        value &&
        value.__esModule
      )
        return value;
      /******/ var ns = Object.create(null);
      /******/ __webpack_require__.r(ns);
      /******/ Object.defineProperty(ns, "default", {
        enumerable: true,
        value: value
      });
      /******/ if (mode & 2 && typeof value != "string")
        for (var key in value)
          __webpack_require__.d(
            ns,
            key,
            function(key) {
              return value[key];
            }.bind(null, key)
          );
      /******/ return ns;
      /******/
    }; // getDefaultExport function for compatibility with non-harmony modules
    /******/
    /******/ /******/ __webpack_require__.n = function(module) {
      /******/ var getter =
        module && module.__esModule
          ? /******/ function getDefault() {
              return module["default"];
            }
          : /******/ function getModuleExports() {
              return module;
            };
      /******/ __webpack_require__.d(getter, "a", getter);
      /******/ return getter;
      /******/
    }; // Object.prototype.hasOwnProperty.call
    /******/
    /******/ /******/ __webpack_require__.o = function(object, property) {
      return Object.prototype.hasOwnProperty.call(object, property);
    }; // __webpack_public_path__
    /******/
    /******/ /******/ __webpack_require__.p = ""; // Load entry module and return exports
    /******/
    /******/
    /******/ /******/ return __webpack_require__(
      (__webpack_require__.s = "./api/sites.js")
    );
    /******/
  })(
    /************************************************************************/
    /******/ {
      /***/ "./api/sites.js":
        /*!**********************!*\
  !*** ./api/sites.js ***!
  \**********************/
        /*! exports provided: scrape, default */
        /***/ function(module, __webpack_exports__, __webpack_require__) {
          "use strict";
          eval(
            '__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scrape", function() { return scrape; });\n/* harmony import */ var _lib_helpers_request__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/helpers/request */ "./lib/helpers/request.js");\n/* harmony import */ var _lib_helpers_response__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/helpers/response */ "./lib/helpers/response.js");\n/* harmony import */ var _lib_scraper_riverfront_times__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../lib/scraper/riverfront_times */ "./lib/scraper/riverfront_times/index.js");\n/* harmony import */ var _lib_scraper_test_request__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../lib/scraper/test_request */ "./lib/scraper/test_request/index.js");\n/* harmony import */ var _lib_scraper_do314__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../lib/scraper/do314 */ "./lib/scraper/do314/index.js");\n/* harmony import */ var _lib_validation_scrapedata__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../lib/validation/scrapedata */ "./lib/validation/scrapedata/index.js");\n/* harmony import */ var _lib_store__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../lib/store */ "./lib/store/index.js");\n\n\n\n\n\n\n\nconst scrape = async event => {\n  /* eslint global-require: ["off"] */\n  const db = __webpack_require__(/*! ../lib/models */ "./lib/models/index.js").default;\n\n  const {\n    pathParameters: {\n      id,\n      page\n    } = {}\n  } = event;\n  let scrapeResult = [];\n\n  try {\n    await db.sequelize.authenticate();\n  } catch (err) {\n    console.log(\'Unable to connect to the database: \', err.message);\n  }\n\n  switch (id) {\n    case \'riverfronttimes\':\n      try {\n        scrapeResult = await Object(_lib_scraper_riverfront_times__WEBPACK_IMPORTED_MODULE_2__["default"])({\n          fetch: _lib_helpers_request__WEBPACK_IMPORTED_MODULE_0__["fetch"],\n          currentPage: page\n        });\n      } catch (err) {\n        return Object(_lib_helpers_response__WEBPACK_IMPORTED_MODULE_1__["error"])({\n          errorMessage: `Unable to scrape the site. ${err.message}`\n        });\n      }\n\n      break;\n\n    case "testRequest":\n      scrapeResult = await Object(_lib_scraper_test_request__WEBPACK_IMPORTED_MODULE_3__["default"])({\n        fetch: _lib_helpers_request__WEBPACK_IMPORTED_MODULE_0__["fetch"],\n        currentPage: page\n      });\n      return Object(_lib_helpers_response__WEBPACK_IMPORTED_MODULE_1__["success"])({\n        success: scrapeResult\n      });\n      break;\n\n    case \'do314\':\n      try {\n        scrapeResult = await Object(_lib_scraper_do314__WEBPACK_IMPORTED_MODULE_4__["default"])({\n          fetch: _lib_helpers_request__WEBPACK_IMPORTED_MODULE_0__["fetch"],\n          currentPage: page\n        });\n      } catch (err) {\n        return Object(_lib_helpers_response__WEBPACK_IMPORTED_MODULE_1__["error"])({\n          errorMessage: `Unable to scrape the site. ${err.message}`\n        });\n      }\n\n      break;\n\n    default:\n      return Object(_lib_helpers_response__WEBPACK_IMPORTED_MODULE_1__["error"])({\n        errorMessage: \'The requested site is not supported.\'\n      });\n  }\n\n  try {\n    if (Object(_lib_validation_scrapedata__WEBPACK_IMPORTED_MODULE_5__["default"])(scrapeResult)) {\n      await Object(_lib_store__WEBPACK_IMPORTED_MODULE_6__["default"])({\n        db,\n        data: scrapeResult\n      });\n      return Object(_lib_helpers_response__WEBPACK_IMPORTED_MODULE_1__["success"])({\n        success: `${scrapeResult.events ? scrapeResult.events.length : 0} results created`\n      });\n    }\n\n    return Object(_lib_helpers_response__WEBPACK_IMPORTED_MODULE_1__["error"])({\n      errorMessage: \'Cannot validate the results.\'\n    });\n  } catch (err) {\n    return Object(_lib_helpers_response__WEBPACK_IMPORTED_MODULE_1__["error"])({\n      errorMessage: `Cannot store the results: ${err.message}`\n    });\n  }\n};\n/* harmony default export */ __webpack_exports__["default"] = (event => Object(_lib_helpers_response__WEBPACK_IMPORTED_MODULE_1__["success"])(event));\n\n//# sourceURL=webpack:///./api/sites.js?'
          );

          /***/
        },

      /***/ "./lib/helpers/request.js":
        /*!********************************!*\
  !*** ./lib/helpers/request.js ***!
  \********************************/
        /*! exports provided: fetch, default */
        /***/ function(module, __webpack_exports__, __webpack_require__) {
          "use strict";
          eval(
            '__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetch", function() { return fetch; });\n/* harmony import */ var node_fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! node-fetch */ "node-fetch");\n/* harmony import */ var node_fetch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_fetch__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var user_agents__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! user-agents */ "user-agents");\n/* harmony import */ var user_agents__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(user_agents__WEBPACK_IMPORTED_MODULE_1__);\n\n\nconst userAgent = new user_agents__WEBPACK_IMPORTED_MODULE_1___default.a();\nconst headers = {\n  \'User-Agent\': userAgent.toString(),\n  Accept: \'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3\'\n};\nconst fetch = (url, options = {}) => node_fetch__WEBPACK_IMPORTED_MODULE_0___default()(url, Object.assign(options, {\n  headers,\n  follow: 5,\n  timeout: 10000\n}));\n/* harmony default export */ __webpack_exports__["default"] = (fetch);\n\n//# sourceURL=webpack:///./lib/helpers/request.js?'
          );

          /***/
        },

      /***/ "./lib/helpers/response.js":
        /*!*********************************!*\
  !*** ./lib/helpers/response.js ***!
  \*********************************/
        /*! exports provided: clean, error, failure, success */
        /***/ function(module, __webpack_exports__, __webpack_require__) {
          "use strict";
          eval(
            "__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"clean\", function() { return clean; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"error\", function() { return error; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"failure\", function() { return failure; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"success\", function() { return success; });\nfunction buildResponse(statusCode, body) {\n  return {\n    statusCode,\n    headers: {\n      'Access-Control-Allow-Origin': '*',\n      'Access-Control-Allow-Credentials': true\n    },\n    body: JSON.stringify(body)\n  };\n}\n\nconst clean = value => value && value.length ? value.trim() : '';\nconst error = body => buildResponse(400, body);\nconst failure = body => buildResponse(500, body);\nconst success = body => buildResponse(200, body);\n\n//# sourceURL=webpack:///./lib/helpers/response.js?"
          );

          /***/
        },

      /***/ "./lib/models/hectv_events.js":
        /*!************************************!*\
  !*** ./lib/models/hectv_events.js ***!
  \************************************/
        /*! no static exports found */
        /***/ function(module, exports) {
          eval(
            "const hectvEvents = (sequelize, DataTypes) => sequelize.define('hectv_events', {\n  id: {\n    allowNull: false,\n    autoIncrement: true,\n    primaryKey: true,\n    type: DataTypes.INTEGER\n  },\n  name: {\n    type: DataTypes.TEXT\n  },\n  handle: {\n    type: DataTypes.CHAR(255)\n  },\n  uri: {\n    type: DataTypes.TEXT\n  },\n  image: {\n    type: DataTypes.TEXT\n  },\n  date: {\n    type: DataTypes.TEXT\n  },\n  startDate: {\n    type: DataTypes.TEXT\n  },\n  endDate: {\n    type: DataTypes.TEXT\n  },\n  price: {\n    type: DataTypes.TEXT\n  },\n  description: {\n    type: DataTypes.TEXT\n  },\n  location: {\n    type: DataTypes.TEXT\n  },\n  address1: {\n    type: DataTypes.TEXT\n  },\n  address2: {\n    type: DataTypes.TEXT\n  },\n  city: {\n    type: DataTypes.TEXT\n  },\n  state: {\n    type: DataTypes.TEXT\n  },\n  zip: {\n    type: DataTypes.TEXT\n  },\n  phone: {\n    type: DataTypes.TEXT\n  },\n  siteId: {\n    type: DataTypes.INTEGER,\n    references: {\n      model: 'hectv_sites',\n      key: 'id'\n    },\n    allowNull: false\n  }\n}, {});\n\nhectvEvents.associate = models => {\n  hectvEvents.hasOne(models.hectv_sites, {\n    foreignKey: 'siteId'\n  });\n};\n\nmodule.exports = hectvEvents;\n\n//# sourceURL=webpack:///./lib/models/hectv_events.js?"
          );

          /***/
        },

      /***/ "./lib/models/hectv_sites.js":
        /*!***********************************!*\
  !*** ./lib/models/hectv_sites.js ***!
  \***********************************/
        /*! no static exports found */
        /***/ function(module, exports) {
          eval(
            "const hectvSites = (sequelize, DataTypes) => sequelize.define('hectv_sites', {\n  id: {\n    allowNull: false,\n    autoIncrement: true,\n    primaryKey: true,\n    type: DataTypes.INTEGER\n  },\n  name: {\n    type: DataTypes.TEXT\n  },\n  handle: {\n    type: DataTypes.CHAR(255)\n  },\n  uri: {\n    type: DataTypes.TEXT\n  }\n}, {});\n\nmodule.exports = hectvSites;\n\n//# sourceURL=webpack:///./lib/models/hectv_sites.js?"
          );

          /***/
        },

      /***/ "./lib/models/index.js":
        /*!*****************************!*\
  !*** ./lib/models/index.js ***!
  \*****************************/
        /*! exports provided: default */
        /***/ function(module, __webpack_exports__, __webpack_require__) {
          "use strict";
          eval(
            '__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var sequelize__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sequelize */ "sequelize");\n/* harmony import */ var sequelize__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sequelize__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var mysql2__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! mysql2 */ "mysql2");\n/* harmony import */ var mysql2__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(mysql2__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _hectv_events__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./hectv_events */ "./lib/models/hectv_events.js");\n/* harmony import */ var _hectv_events__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_hectv_events__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _wp_postmeta__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./wp_postmeta */ "./lib/models/wp_postmeta.js");\n/* harmony import */ var _wp_postmeta__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wp_postmeta__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _wp_posts__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./wp_posts */ "./lib/models/wp_posts.js");\n/* harmony import */ var _wp_posts__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wp_posts__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _hectv_sites__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./hectv_sites */ "./lib/models/hectv_sites.js");\n/* harmony import */ var _hectv_sites__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_hectv_sites__WEBPACK_IMPORTED_MODULE_5__);\n\n\n\n\n\n\nconst {\n  MYSQL_DATABASE,\n  MYSQL_USERNAME,\n  MYSQL_PASSWORD,\n  MYSQL_PORT,\n  MYSQL_HOST\n} = process.env;\nconst sequelize = new sequelize__WEBPACK_IMPORTED_MODULE_0___default.a(MYSQL_DATABASE, MYSQL_USERNAME, MYSQL_PASSWORD, {\n  host: MYSQL_HOST,\n  dialect: \'mysql\',\n  port: MYSQL_PORT,\n  logging: false,\n  dialectModule: mysql2__WEBPACK_IMPORTED_MODULE_1___default.a\n});\nconst db = {};\ndb.hectvSites = _hectv_sites__WEBPACK_IMPORTED_MODULE_5___default()(sequelize, sequelize__WEBPACK_IMPORTED_MODULE_0___default.a);\ndb.hectvEvents = _hectv_events__WEBPACK_IMPORTED_MODULE_2___default()(sequelize, sequelize__WEBPACK_IMPORTED_MODULE_0___default.a);\ndb.wpPostmeta = _wp_postmeta__WEBPACK_IMPORTED_MODULE_3___default()(sequelize, sequelize__WEBPACK_IMPORTED_MODULE_0___default.a);\ndb.wpPosts = _wp_posts__WEBPACK_IMPORTED_MODULE_4___default()(sequelize, sequelize__WEBPACK_IMPORTED_MODULE_0___default.a);\ndb.sequelize = sequelize;\ndb.Sequelize = sequelize__WEBPACK_IMPORTED_MODULE_0___default.a;\n/* harmony default export */ __webpack_exports__["default"] = (db);\n\n//# sourceURL=webpack:///./lib/models/index.js?'
          );

          /***/
        },

      /***/ "./lib/models/wp_postmeta.js":
        /*!***********************************!*\
  !*** ./lib/models/wp_postmeta.js ***!
  \***********************************/
        /*! no static exports found */
        /***/ function(module, exports) {
          eval(
            "const Postmeta = (sequelize, DataTypes) => sequelize.define('wp_postmeta', {\n  meta_id: {\n    allowNull: false,\n    autoIncrement: true,\n    primaryKey: true,\n    type: DataTypes.BIGINT\n  },\n  post_id: {\n    type: DataTypes.BIGINT\n  },\n  meta_key: {\n    type: DataTypes.STRING\n  },\n  meta_value: {\n    type: DataTypes.TEXT\n  }\n}, {\n  createdAt: false,\n  updatedAt: false\n});\n\nmodule.exports = Postmeta;\n\n//# sourceURL=webpack:///./lib/models/wp_postmeta.js?"
          );

          /***/
        },

      /***/ "./lib/models/wp_posts.js":
        /*!********************************!*\
  !*** ./lib/models/wp_posts.js ***!
  \********************************/
        /*! no static exports found */
        /***/ function(module, exports) {
          eval(
            "const Posts = (sequelize, DataTypes) => sequelize.define('wp_posts', {\n  id: {\n    allowNull: false,\n    autoIncrement: true,\n    primaryKey: true,\n    type: DataTypes.BIGINT\n  },\n  post_author: {\n    type: DataTypes.BIGINT,\n    defaultValue: 0,\n    allowNull: false\n  },\n  post_title: {\n    type: DataTypes.TEXT,\n    defaultValue: '',\n    allowNull: false\n  },\n  post_content: {\n    type: DataTypes.TEXT,\n    defaultValue: '',\n    allowNull: false\n  },\n  post_excerpt: {\n    type: DataTypes.TEXT,\n    defaultValue: '',\n    allowNull: false\n  },\n  post_status: {\n    type: DataTypes.STRING,\n    defaultValue: '',\n    allowNull: false\n  },\n  post_type: {\n    type: DataTypes.STRING,\n    defaultValue: '',\n    allowNull: false\n  },\n  post_name: {\n    type: DataTypes.STRING,\n    defaultValue: '',\n    allowNull: false\n  },\n  guid: {\n    type: DataTypes.STRING,\n    defaultValue: '',\n    allowNull: false\n  },\n  post_parent: {\n    type: DataTypes.BIGINT,\n    defaultValue: 0,\n    allowNull: false\n  },\n  menu_order: {\n    type: DataTypes.INTEGER,\n    defaultValue: 0,\n    allowNull: false\n  },\n  post_modified_gmt: {\n    type: DataTypes.DATE,\n    defaultValue: '0000-00-00 00:00:00',\n    allowNull: false\n  },\n  post_date_gmt: {\n    type: DataTypes.DATE,\n    defaultValue: '0000-00-00 00:00:00',\n    allowNull: false\n  },\n  to_ping: {\n    type: DataTypes.STRING,\n    defaultValue: '',\n    allowNull: false\n  },\n  pinged: {\n    type: DataTypes.STRING,\n    defaultValue: '',\n    allowNull: false\n  },\n  post_content_filtered: {\n    type: DataTypes.STRING,\n    defaultValue: '',\n    allowNull: false\n  },\n  post_mime_type: {\n    type: DataTypes.STRING,\n    defaultValue: '',\n    allowNull: false\n  }\n}, {\n  freezeTableName: true,\n  createdAt: 'post_date',\n  updatedAt: 'post_modified'\n});\n\nmodule.exports = Posts;\n\n//# sourceURL=webpack:///./lib/models/wp_posts.js?"
          );

          /***/
        },

      /***/ "./lib/scraper/do314/index.js":
        /*!************************************!*\
  !*** ./lib/scraper/do314/index.js ***!
  \************************************/
        /*! exports provided: default */
        /***/ function(module, __webpack_exports__, __webpack_require__) {
          "use strict";
          eval(
            "__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var cheerio__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cheerio */ \"cheerio\");\n/* harmony import */ var cheerio__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(cheerio__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dayjs */ \"dayjs\");\n/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _helpers_response__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../helpers/response */ \"./lib/helpers/response.js\");\n\n\n\n\nconst scrape = async ({\n  fetch,\n  results,\n  limit,\n  currentPage = '2018-08-15'\n}) => {\n  const newResults = results || {\n    siteName: 'do314',\n    handle: 'do314',\n    uri: 'https://do314.com',\n    events: []\n  };\n  const date = dayjs__WEBPACK_IMPORTED_MODULE_1___default()(currentPage, 'YYYY-MM-DD').format('YYYY/MM/DD');\n  const res = await fetch(`https://do314.com/events/${date}`);\n  const text = await res.text();\n  let $listings = cheerio__WEBPACK_IMPORTED_MODULE_0___default.a.load(text)('.ds-event-listings .ds-events-page > .ds-events-group > .ds-listing');\n\n  if (!$listings.length) {\n    return newResults;\n  }\n\n  if (limit) {\n    $listings = $listings.slice(0, limit);\n  }\n\n  await Promise.all(\n  /* eslint no-async-promise-executor: [\"off\"] */\n  $listings.toArray().map(e => new Promise(async resolve => {\n    try {\n      let href = Object(_helpers_response__WEBPACK_IMPORTED_MODULE_2__[\"clean\"])(cheerio__WEBPACK_IMPORTED_MODULE_0___default()(e).find('a.ds-listing-event-title.url').attr('href'));\n\n      if (!href) {\n        throw Error(`Unable to locate href from event: ${cheerio__WEBPACK_IMPORTED_MODULE_0___default()(e).html()}`);\n      }\n\n      if (href.match(/^(http|https)/) === null) {\n        href = `https://do314.com${href}`;\n      }\n\n      const evRes = await fetch(href);\n      const evText = await evRes.text();\n      const $ = cheerio__WEBPACK_IMPORTED_MODULE_0___default.a.load(evText);\n      let address;\n      let phone;\n      let uri;\n      let locationHref = Object(_helpers_response__WEBPACK_IMPORTED_MODULE_2__[\"clean\"])($('.ds-event-meta [itemprop=location] .ds-venue-name a[itemprop=url]').attr('href'));\n\n      if (locationHref) {\n        if (locationHref.match(/^(http|https)/) === null) {\n          locationHref = `https://do314.com${locationHref}`;\n        }\n\n        const locationResp = await fetch(locationHref);\n        const locationText = await locationResp.text();\n        const l$ = cheerio__WEBPACK_IMPORTED_MODULE_0___default.a.load(locationText);\n\n        if (l$) {\n          address = {\n            address1: Object(_helpers_response__WEBPACK_IMPORTED_MODULE_2__[\"clean\"])(l$('.ds-detail-meta > .ds-detail-address > [itemprop=streetAddress]').attr('content')),\n            city: Object(_helpers_response__WEBPACK_IMPORTED_MODULE_2__[\"clean\"])(l$('.ds-detail-meta > .ds-detail-address > [itemprop=addressLocality]').attr('content')),\n            state: Object(_helpers_response__WEBPACK_IMPORTED_MODULE_2__[\"clean\"])(l$('.ds-detail-meta > .ds-detail-address > [itemprop=addressRegion]').attr('content')),\n            zip: Object(_helpers_response__WEBPACK_IMPORTED_MODULE_2__[\"clean\"])(l$('.ds-detail-meta > .ds-detail-address > [itemprop=postalCode]').attr('content'))\n          };\n          phone = Object(_helpers_response__WEBPACK_IMPORTED_MODULE_2__[\"clean\"])((l$('.ds-detail-meta > .ds-detail-phone > a').attr('href') || '').replace('tel:', ''));\n          uri = Object(_helpers_response__WEBPACK_IMPORTED_MODULE_2__[\"clean\"])(l$('.ds-detail-meta > .ds-detail-website > a').attr('href'));\n        }\n      }\n\n      const coverImage = $('.ds-event-detail > .ds-event-detail-main .ds-cover-image');\n      let image = '';\n\n      if (coverImage) {\n        const style = coverImage.attr('style');\n        let bgImageDQ = '';\n        let bgImageSQ = '';\n\n        if (style) {\n          bgImageDQ = style.match(/background-image:.*url\\(\"([^\"]+)/);\n          bgImageSQ = style.match(/background-image:.*url\\('([^']+)/);\n        }\n\n        if (bgImageDQ && bgImageDQ.length > 1) {\n          [, image] = bgImageDQ;\n        } else if (bgImageSQ && bgImageSQ.length > 1) {\n          [, image] = bgImageSQ;\n        }\n      }\n\n      const startDate = Object(_helpers_response__WEBPACK_IMPORTED_MODULE_2__[\"clean\"])($('.ds-event-detail > .ds-event-detail-main .ds-event-meta-container [itemprop=startDate]').attr('content'));\n      const endDate = Object(_helpers_response__WEBPACK_IMPORTED_MODULE_2__[\"clean\"])($('.ds-event-detail > .ds-event-detail-main .ds-event-meta-container [itemprop=endDate]').attr('content'));\n      const displayDate = Object(_helpers_response__WEBPACK_IMPORTED_MODULE_2__[\"clean\"])($('.ds-event-detail > .ds-event-detail-main .ds-event-meta-container .ds-event-time > span').attr('data-datetime'));\n      newResults.events.push({\n        eventName: Object(_helpers_response__WEBPACK_IMPORTED_MODULE_2__[\"clean\"])($('.ds-event-detail > .ds-event-detail-main .ds-event-title-text').text()),\n        handle: href,\n        date: displayDate,\n        startDate: startDate || displayDate,\n        endDate: endDate || displayDate,\n        description: Object(_helpers_response__WEBPACK_IMPORTED_MODULE_2__[\"clean\"])($('.ds-event-description-inner').text()),\n        location: Object(_helpers_response__WEBPACK_IMPORTED_MODULE_2__[\"clean\"])($('.ds-event-detail > .ds-event-detail-main .ds-venue-name [itemprop=name]').text()),\n        price: Object(_helpers_response__WEBPACK_IMPORTED_MODULE_2__[\"clean\"])($('.ds-event-detail > .ds-event-detail-main .ds-event-meta-container h2[itemprop=price]').attr('title')),\n        address,\n        phone,\n        image,\n        uri\n      });\n      resolve(newResults);\n    } catch (err) {\n      console.log('Unable to read content. ', err.message);\n      resolve(err);\n    }\n  })));\n  return newResults;\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (scrape);\n\n//# sourceURL=webpack:///./lib/scraper/do314/index.js?"
          );

          /***/
        },

      /***/ "./lib/scraper/riverfront_times/index.js":
        /*!***********************************************!*\
  !*** ./lib/scraper/riverfront_times/index.js ***!
  \***********************************************/
        /*! exports provided: default */
        /***/ function(module, __webpack_exports__, __webpack_require__) {
          "use strict";
          eval(
            "__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var cheerio__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cheerio */ \"cheerio\");\n/* harmony import */ var cheerio__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(cheerio__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _helpers_response__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../helpers/response */ \"./lib/helpers/response.js\");\n\n\n\nconst scrape = async ({\n  fetch,\n  results,\n  currentPage = 1,\n  limit\n}) => {\n  const newResults = results || {\n    siteName: 'Riverfront Times',\n    handle: 'riverfront_times',\n    uri: 'https://riverfronttimes.com',\n    events: []\n  };\n  const res = await fetch(`https://riverfronttimes.com/stlouis/EventSearch?page=${currentPage}`);\n  const text = await res.text();\n  let $listings = cheerio__WEBPACK_IMPORTED_MODULE_0___default.a.load(text)('#searchResults > .results-container > .EventListing');\n\n  if (!$listings.length) {\n    return newResults;\n  }\n\n  if (limit) {\n    $listings = $listings.slice(0, limit);\n  }\n\n  await Promise.all(\n  /* eslint no-async-promise-executor: [\"off\"] */\n  $listings.toArray().map(e => new Promise(async resolve => {\n    const $$ = cheerio__WEBPACK_IMPORTED_MODULE_0___default()(e);\n    const href = $$.find('> .listing > h3 > a').attr('href');\n    const imgTag = $$.find('> .imageTools > .listingImage > img').attr('src');\n    let image = '';\n\n    if (!href) {\n      throw Error(`Unable to locate href from event: ${$$.html()}`);\n    }\n\n    if (imgTag) {\n      image = imgTag;\n    }\n\n    try {\n      const evRes = await fetch(href);\n      const evText = await evRes.text();\n      const TEXT_NODE_TYPE = 3;\n      const $ = cheerio__WEBPACK_IMPORTED_MODULE_0___default.a.load(evText);\n      const date = Object(_helpers_response__WEBPACK_IMPORTED_MODULE_1__[\"clean\"])($('#EventMetaData > .eventWhen').contents().filter((idx, el) => el.nodeType === TEXT_NODE_TYPE).text());\n      newResults.events.push({\n        eventName: Object(_helpers_response__WEBPACK_IMPORTED_MODULE_1__[\"clean\"])($('#EventMetaData > .EventDetails > .listingTitle').contents().filter((idx, el) => el.nodeType === TEXT_NODE_TYPE).text()),\n        handle: href,\n        uri: Object(_helpers_response__WEBPACK_IMPORTED_MODULE_1__[\"clean\"])($('#EventLocation > ul > .locationItem > ul > li > .locationUrl > a').attr('href')),\n        price: Object(_helpers_response__WEBPACK_IMPORTED_MODULE_1__[\"clean\"])($('#EventMetaData > .eventPrice').contents().filter((idx, el) => el.nodeType === TEXT_NODE_TYPE).text()),\n        description: (() => {\n          const $descr = $('#EventDescription > .descr_txt');\n          $descr.contents().filter((idx, el) => el.attribs && el.attribs.class === 'author_txt').remove();\n          return Object(_helpers_response__WEBPACK_IMPORTED_MODULE_1__[\"clean\"])($descr.html());\n        })(),\n        location: Object(_helpers_response__WEBPACK_IMPORTED_MODULE_1__[\"clean\"])($('#EventLocation > ul > .locationItem > h4 > a').text()),\n        address: {\n          address1: Object(_helpers_response__WEBPACK_IMPORTED_MODULE_1__[\"clean\"])($('#EventLocation > ul > .locationItem > ul > .adr > .street-address').text()),\n          address2: Object(_helpers_response__WEBPACK_IMPORTED_MODULE_1__[\"clean\"])($('#EventLocation > ul > .locationItem > ul > .adr > .extended-address').text()),\n          city: Object(_helpers_response__WEBPACK_IMPORTED_MODULE_1__[\"clean\"])($('#EventLocation > ul > .locationItem > ul > .adr > span > .locality').text()),\n          state: Object(_helpers_response__WEBPACK_IMPORTED_MODULE_1__[\"clean\"])($('#EventLocation > ul > .locationItem > ul > .adr > .region').text()),\n          zip: Object(_helpers_response__WEBPACK_IMPORTED_MODULE_1__[\"clean\"])($('#EventLocation > ul > .locationItem > ul > .adr .postal-address').text())\n        },\n        phone: Object(_helpers_response__WEBPACK_IMPORTED_MODULE_1__[\"clean\"])($('#EventLocation > ul > .locationItem > ul > li > .locationPhone > .value').text()),\n        image,\n        startDate: date,\n        endDate: date,\n        date\n      });\n      resolve(true);\n    } catch (err) {\n      console.log('Unable to read content. ', err.message);\n      resolve(err);\n    }\n  })));\n  return newResults;\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (scrape);\n\n//# sourceURL=webpack:///./lib/scraper/riverfront_times/index.js?"
          );

          /***/
        },

      /***/ "./lib/scraper/test_request/index.js":
        /*!*******************************************!*\
  !*** ./lib/scraper/test_request/index.js ***!
  \*******************************************/
        /*! exports provided: default */
        /***/ function(module, __webpack_exports__, __webpack_require__) {
          "use strict";
          eval(
            "__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var cheerio__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cheerio */ \"cheerio\");\n/* harmony import */ var cheerio__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(cheerio__WEBPACK_IMPORTED_MODULE_0__);\n\n\nconst scrape = async ({\n  fetch,\n  currentPage = 1\n}) => {\n  const newResults = {\n    siteName: 'Test Request',\n    handle: 'test_request',\n    uri: 'https://google.com',\n    events: []\n  };\n  const res = await fetch(`https://google.com?page=${currentPage}`);\n  const text = await res.text();\n  const links = cheerio__WEBPACK_IMPORTED_MODULE_0___default.a.load(text)('a');\n  newResults.links = links.text();\n  console.dir(newResults.links, {\n    depth: 15\n  });\n  return newResults;\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (scrape);\n\n//# sourceURL=webpack:///./lib/scraper/test_request/index.js?"
          );

          /***/
        },

      /***/ "./lib/store/index.js":
        /*!****************************!*\
  !*** ./lib/store/index.js ***!
  \****************************/
        /*! exports provided: default */
        /***/ function(module, __webpack_exports__, __webpack_require__) {
          "use strict";
          eval(
            "__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! moment */ \"moment\");\n/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var sequelize__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! sequelize */ \"sequelize\");\n/* harmony import */ var sequelize__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(sequelize__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var chrono_node__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! chrono-node */ \"chrono-node\");\n/* harmony import */ var chrono_node__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(chrono_node__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _models__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../models */ \"./lib/models/index.js\");\n\n\n\n\n\nconst createSites = data => _models__WEBPACK_IMPORTED_MODULE_3__[\"default\"].hectvSites.findOrCreate({\n  where: {\n    handle: data.handle\n  },\n  defaults: {\n    name: data.siteName,\n    handle: data.handle,\n    uri: data.uri\n  }\n});\n\nconst createEvents = (data, siteId) => _models__WEBPACK_IMPORTED_MODULE_3__[\"default\"].hectvEvents.findOrCreate({\n  where: {\n    handle: data.handle\n  },\n  defaults: {\n    uri: data.uri,\n    name: data.eventName,\n    handle: data.handle,\n    date: data.date,\n    startDate: data.startDate,\n    endDate: data.endDate,\n    price: data.price ? data.price : '',\n    location: data.location,\n    address1: data.address ? data.address.address1 : '',\n    address2: data.address ? data.address.address2 : '',\n    city: data.address ? data.address.city : '',\n    zip: data.address ? data.address.zip : '',\n    phone: data.phone,\n    description: JSON.parse(JSON.stringify(data.description)),\n    image: data.image,\n    siteId\n  }\n});\n\nconst createPost = data => _models__WEBPACK_IMPORTED_MODULE_3__[\"default\"].wpPosts.findOrCreate({\n  where: {\n    guid: data.handle\n  },\n  defaults: {\n    post_author: 0,\n    post_title: data.name,\n    post_content: data.description ? data.description : '',\n    post_excerpt: data.description ? data.description.substring(0, 100) : '',\n    post_status: 'draft',\n    post_type: 'event',\n    post_name: data.name ? `${data.name.toLowerCase().replace(/\\s/gi, '-').replace(/[^\\-a-zA-Z0-9]+/gi, '')}-${data.id}` : '',\n    guid: data.handle,\n    post_parent: 0,\n    menu_order: 0,\n    post_date_gmt: moment__WEBPACK_IMPORTED_MODULE_0___default.a.utc(),\n    post_modified_gmt: moment__WEBPACK_IMPORTED_MODULE_0___default.a.utc()\n  }\n});\n\nconst updatePost = data => new Promise(resolve => _models__WEBPACK_IMPORTED_MODULE_3__[\"default\"].wpPosts.update({\n  post_author: 0,\n  post_title: data.name,\n  post_content: data.description ? data.description : '',\n  post_excerpt: data.description ? data.description.substring(0, 100) : '',\n  post_status: 'draft',\n  post_type: 'event',\n  post_name: data.name ? `${data.name.toLowerCase().replace(/\\s/gi, '-').replace(/[^\\-a-zA-Z0-9]+/gi, '')}-${data.id}` : '',\n  guid: data.handle,\n  post_parent: 0,\n  menu_order: 0,\n  post_modified_gmt: moment__WEBPACK_IMPORTED_MODULE_0___default.a.utc()\n}, {\n  where: {\n    guid: data.handle\n  }\n}).then(() => resolve(_models__WEBPACK_IMPORTED_MODULE_3__[\"default\"].wpPosts.findOne({\n  where: {\n    guid: data.handle\n  }\n}))));\n\nconst createPostmeta = (id, key, value) => _models__WEBPACK_IMPORTED_MODULE_3__[\"default\"].wpPostmeta.findOrCreate({\n  where: {\n    post_id: id,\n    meta_key: key\n  },\n  defaults: {\n    post_id: id,\n    meta_key: key,\n    meta_value: value\n  }\n});\n\nconst findLikePostmeta = (id, key, value) => _models__WEBPACK_IMPORTED_MODULE_3__[\"default\"].wpPostmeta.findOne({\n  where: {\n    post_id: id,\n    meta_key: {\n      [sequelize__WEBPACK_IMPORTED_MODULE_1___default.a.Op.like]: [`%${key}%`]\n    },\n    meta_value: value\n  }\n});\n\nconst updatePostmeta = (id, key, value) => _models__WEBPACK_IMPORTED_MODULE_3__[\"default\"].wpPostmeta.update({\n  post_id: id,\n  meta_key: key,\n  meta_value: value\n}, {\n  where: {\n    post_id: id,\n    meta_key: key\n  }\n});\n\nconst createOrUpdatePostmeta = async (id, key, value) => new Promise((resolve, reject) => {\n  /* eslint-disable no-console */\n  createPostmeta(id, key, value).then(([newPostmeta, created]) => {\n    if (!created) {\n      updatePostmeta(id, key, value).then(updates => {\n        resolve(updates);\n      });\n    } else {\n      resolve(newPostmeta);\n    }\n  }).catch(err => {\n    console.log(`Error Creating Post: ${err.message}`);\n    reject(err);\n  });\n  /* esline-enable no-console */\n});\n\nconst cuEvent = async (id, key, value, startDate, endDate) => new Promise((resolve, reject) => {\n  /* eslint-disable no-console */\n  const index = value - 1;\n  console.log(`EVENTS - start time: ${startDate}. end time: ${endDate}`);\n  findLikePostmeta(id, '_end_time', endDate).then(async postmeta => {\n    if (postmeta) {\n      resolve(true);\n    } else {\n      try {\n        await createPostmeta(id, `event_dates_${index}_end_time`, endDate);\n      } catch (err) {\n        console.log(`Error at event_dates_${index}_end_time`);\n        reject(err);\n      }\n\n      try {\n        await createPostmeta(id, `event_dates_${index}_start_time`, startDate);\n      } catch (err) {\n        console.log(`Error at event_dates_${index}_start_time`);\n        reject(err);\n      }\n\n      try {\n        const hasEvent = await createPostmeta(id, key, value);\n\n        if (!hasEvent.created) {\n          await cuEvent(id, key, value + 1, startDate, endDate);\n        }\n\n        resolve(postmeta);\n      } catch (err) {\n        console.log(`Error at ${key}`);\n        reject(err);\n      }\n    }\n  });\n});\n\nconst createOrUpdatePostmetaHelper = (postId, event) => Promise.all([createOrUpdatePostmeta(postId, 'venue', event.location ? event.location : ''), createOrUpdatePostmeta(postId, 'event_price', event.price ? event.price : ''), createOrUpdatePostmeta(postId, 'web_address', event.handle), createOrUpdatePostmeta(postId, 'external_image', event.image), createOrUpdatePostmeta(postId, 'event_date_info', event.date)]);\n\nconst createOrUpdatePostHelper = async (event, newPost) => {\n  if (event.date) {\n    try {\n      const startDate = chrono_node__WEBPACK_IMPORTED_MODULE_2___default.a.casual.parseDate(event.startDate);\n      const endDate = chrono_node__WEBPACK_IMPORTED_MODULE_2___default.a.casual.parseDate(event.endDate);\n\n      if (startDate && endDate) {\n        console.log(`Postmeta EVENTS  - startDate: ${startDate}. endDate: ${endDate}`);\n        await cuEvent(newPost.id, 'event_dates', 1, moment__WEBPACK_IMPORTED_MODULE_0___default()(startDate).format('YYYY-MM-DD HH:mm:ss'), moment__WEBPACK_IMPORTED_MODULE_0___default()(endDate).format('YYYY-MM-DD HH:mm:ss'));\n      } else {\n        console.log(`INVALID START DATE  - ${event.startDate} - ${startDate}.`);\n        console.log(`INVALID END DATE  - ${event.endDate} - ${endDate}.`);\n      }\n    } catch (error) {\n      console.log(`Error creating or updating event date. ${error.message}`);\n    }\n  }\n\n  try {\n    await createOrUpdatePostmetaHelper(newPost.id, event);\n  } catch (err) {\n    console.log(`Error creating postmeta data. ${err.message}`);\n  }\n};\n\nconst createOrUpdatePost = async (event, created) => new Promise((resolve, reject) => {\n  /* eslint-disable no-console */\n  if (created) {\n    createPost(event).then(async ([newPost]) => {\n      console.log(`Creating Postmeta: ${newPost.id}`);\n      await createOrUpdatePostHelper(event, newPost);\n      resolve(newPost);\n    }).catch(err => {\n      console.log(`Error Creating Postmeta: ${err.message}`);\n      reject(err);\n    });\n  } else {\n    updatePost(event).then(async updatedPost => {\n      console.log(`Updating Postmeta - Event id: ${event.id}.`);\n      await createOrUpdatePostHelper(event, updatedPost);\n      resolve(updatedPost);\n    }).catch(err => {\n      console.log(`Error Updating Postmeta: ${err.message}`);\n      reject(err);\n    });\n  }\n  /* esline-enable no-console */\n\n});\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (({\n  data\n}) => new Promise((resolve, reject) => {\n  /* eslint-disable no-console */\n  _models__WEBPACK_IMPORTED_MODULE_3__[\"default\"].sequelize.authenticate().then(() => {\n    try {\n      createSites(data).then(async ([site]) => {\n        try {\n          const response = await Promise.all(data.events.map(e => e && createEvents(e, site.id).then(([event, created]) => createOrUpdatePost(event, created)).catch(err => {\n            console.error(`Failed to create or update post: ${err.message}`);\n          })));\n          resolve(response);\n        } catch (err) {\n          console.error(`Failed to create events: ${err.message}`);\n          reject(err);\n        }\n      }).catch(err => {\n        console.error(`Failed to generate responses: ${err.message}`);\n        reject(err);\n      });\n    } catch (err) {\n      console.log(`Database error: ${err.message}`);\n      reject(err);\n    }\n  }).catch(err => {\n    console.log('Unable to connect to the database:', err);\n  });\n  /* esline-enable no-console */\n}));\n\n//# sourceURL=webpack:///./lib/store/index.js?"
          );

          /***/
        },

      /***/ "./lib/validation/scrapedata/index.js":
        /*!********************************************!*\
  !*** ./lib/validation/scrapedata/index.js ***!
  \********************************************/
        /*! exports provided: default */
        /***/ function(module, __webpack_exports__, __webpack_require__) {
          "use strict";
          eval(
            '__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var ajv__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ajv */ "ajv");\n/* harmony import */ var ajv__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(ajv__WEBPACK_IMPORTED_MODULE_0__);\n\n\nconst schema = __webpack_require__(/*! ./schema.json */ "./lib/validation/scrapedata/schema.json");\n\nconst ajv = new ajv__WEBPACK_IMPORTED_MODULE_0___default.a();\n/* harmony default export */ __webpack_exports__["default"] = (data => {\n  if (!ajv.validate(schema, data)) {\n    /* eslint-disable no-console */\n    console.error(ajv.errorsText(ajv.errors));\n    /* eslint-enable no-console */\n\n    return false;\n  }\n\n  return true;\n});\n\n//# sourceURL=webpack:///./lib/validation/scrapedata/index.js?'
          );

          /***/
        },

      /***/ "./lib/validation/scrapedata/schema.json":
        /*!***********************************************!*\
  !*** ./lib/validation/scrapedata/schema.json ***!
  \***********************************************/
        /*! exports provided: schema, title, description, type, required, properties, definitions, default */
        /***/ function(module) {
          eval(
            'module.exports = JSON.parse("{\\"schema\\":\\"http://json.schema.org/draft-07/schema#\\",\\"title\\":\\"Site and Scrape Data\\",\\"description\\":\\"Site and scrape data from a crawl\\",\\"type\\":\\"object\\",\\"required\\":[\\"siteName\\",\\"handle\\",\\"uri\\",\\"events\\"],\\"properties\\":{\\"siteName\\":{\\"description\\":\\"The name of the site\\",\\"type\\":\\"string\\"},\\"handle\\":{\\"description\\":\\"Unique identifier for site\\",\\"type\\":\\"string\\"},\\"uri\\":{\\"description\\":\\"The base uri of the site\\",\\"type\\":\\"string\\",\\"format\\":\\"uri\\"},\\"events\\":{\\"type\\":\\"array\\",\\"items\\":{\\"$ref\\":\\"#/definitions/event\\"}}},\\"definitions\\":{\\"event\\":{\\"type\\":\\"object\\",\\"required\\":[\\"eventName\\",\\"handle\\"],\\"properties\\":{\\"uri\\":{\\"type\\":\\"string\\",\\"description\\":\\"Url of the actual page the event was taken from\\"},\\"eventName\\":{\\"type\\":\\"string\\",\\"description\\":\\"The name or title of the event\\"},\\"handle\\":{\\"type\\":\\"string\\",\\"description\\":\\"Unique identifier for event\\"},\\"date\\":{\\"type\\":\\"string\\",\\"description\\":\\"The date of the event\\"},\\"price\\":{\\"type\\":\\"string\\",\\"description\\":\\"The price of the event\\"},\\"location\\":{\\"type\\":\\"string\\",\\"description\\":\\"The name of the location of the event\\"},\\"address\\":{\\"type\\":\\"object\\",\\"required\\":[],\\"properties\\":{\\"address1\\":{\\"type\\":\\"string\\"},\\"address2\\":{\\"type\\":\\"string\\"},\\"city\\":{\\"type\\":\\"string\\"},\\"state\\":{\\"type\\":\\"string\\"},\\"zip\\":{\\"type\\":\\"string\\"}}},\\"phone\\":{\\"type\\":\\"string\\"},\\"description\\":{\\"type\\":\\"string\\",\\"description\\":\\"Description of the event\\"}}}}}");\n\n//# sourceURL=webpack:///./lib/validation/scrapedata/schema.json?'
          );

          /***/
        },

      /***/ ajv:
        /*!**********************!*\
  !*** external "ajv" ***!
  \**********************/
        /*! no static exports found */
        /***/ function(module, exports) {
          eval(
            'module.exports = require("ajv");\n\n//# sourceURL=webpack:///external_%22ajv%22?'
          );

          /***/
        },

      /***/ cheerio:
        /*!**************************!*\
  !*** external "cheerio" ***!
  \**************************/
        /*! no static exports found */
        /***/ function(module, exports) {
          eval(
            'module.exports = require("cheerio");\n\n//# sourceURL=webpack:///external_%22cheerio%22?'
          );

          /***/
        },

      /***/ "chrono-node":
        /*!******************************!*\
  !*** external "chrono-node" ***!
  \******************************/
        /*! no static exports found */
        /***/ function(module, exports) {
          eval(
            'module.exports = require("chrono-node");\n\n//# sourceURL=webpack:///external_%22chrono-node%22?'
          );

          /***/
        },

      /***/ dayjs:
        /*!************************!*\
  !*** external "dayjs" ***!
  \************************/
        /*! no static exports found */
        /***/ function(module, exports) {
          eval(
            'module.exports = require("dayjs");\n\n//# sourceURL=webpack:///external_%22dayjs%22?'
          );

          /***/
        },

      /***/ moment:
        /*!*************************!*\
  !*** external "moment" ***!
  \*************************/
        /*! no static exports found */
        /***/ function(module, exports) {
          eval(
            'module.exports = require("moment");\n\n//# sourceURL=webpack:///external_%22moment%22?'
          );

          /***/
        },

      /***/ mysql2:
        /*!*************************!*\
  !*** external "mysql2" ***!
  \*************************/
        /*! no static exports found */
        /***/ function(module, exports) {
          eval(
            'module.exports = require("mysql2");\n\n//# sourceURL=webpack:///external_%22mysql2%22?'
          );

          /***/
        },

      /***/ "node-fetch":
        /*!*****************************!*\
  !*** external "node-fetch" ***!
  \*****************************/
        /*! no static exports found */
        /***/ function(module, exports) {
          eval(
            'module.exports = require("node-fetch");\n\n//# sourceURL=webpack:///external_%22node-fetch%22?'
          );

          /***/
        },

      /***/ sequelize:
        /*!****************************!*\
  !*** external "sequelize" ***!
  \****************************/
        /*! no static exports found */
        /***/ function(module, exports) {
          eval(
            'module.exports = require("sequelize");\n\n//# sourceURL=webpack:///external_%22sequelize%22?'
          );

          /***/
        },

      /***/ "user-agents":
        /*!******************************!*\
  !*** external "user-agents" ***!
  \******************************/
        /*! no static exports found */
        /***/ function(module, exports) {
          eval(
            'module.exports = require("user-agents");\n\n//# sourceURL=webpack:///external_%22user-agents%22?'
          );

          /***/
        }

      /******/
    }
  )
);
