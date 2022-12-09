(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[1],{

/***/ "./assets/js/theme/catalog.js":
/*!************************************!*\
  !*** ./assets/js/theme/catalog.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CatalogPage; });
/* harmony import */ var _page_manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./page-manager */ "./assets/js/theme/page-manager.js");
/* harmony import */ var _common_utils_url_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./common/utils/url-utils */ "./assets/js/theme/common/utils/url-utils.js");
/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! url */ "./node_modules/url/url.js");
/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(url__WEBPACK_IMPORTED_MODULE_2__);
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }





var CatalogPage = /*#__PURE__*/function (_PageManager) {
  _inheritsLoose(CatalogPage, _PageManager);

  function CatalogPage(context) {
    var _this;

    _this = _PageManager.call(this, context) || this;
    window.addEventListener('beforeunload', function () {
      if (document.activeElement.id === 'sort') {
        window.localStorage.setItem('sortByStatus', 'selected');
      }
    });
    return _this;
  }

  var _proto = CatalogPage.prototype;

  _proto.arrangeFocusOnSortBy = function arrangeFocusOnSortBy() {
    var $sortBySelector = $('[data-sort-by="product"] #sort');

    if (window.localStorage.getItem('sortByStatus')) {
      $sortBySelector.focus();
      window.localStorage.removeItem('sortByStatus');
    }
  };

  _proto.onSortBySubmit = function onSortBySubmit(event, currentTarget) {
    var url = url__WEBPACK_IMPORTED_MODULE_2___default.a.parse(window.location.href, true);
    var queryParams = $(currentTarget).serialize().split('=');
    url.query[queryParams[0]] = queryParams[1];
    delete url.query.page;
    event.preventDefault();
    window.location = url__WEBPACK_IMPORTED_MODULE_2___default.a.format({
      pathname: url.pathname,
      search: _common_utils_url_utils__WEBPACK_IMPORTED_MODULE_1__["default"].buildQueryString(url.query)
    });
  };

  return CatalogPage;
}(_page_manager__WEBPACK_IMPORTED_MODULE_0__["default"]);


/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ }),

/***/ "./assets/js/theme/common/faceted-search.js":
/*!**************************************************!*\
  !*** ./assets/js/theme/common/faceted-search.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var lodash_union__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/union */ "./node_modules/lodash/union.js");
/* harmony import */ var lodash_union__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_union__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash_without__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/without */ "./node_modules/lodash/without.js");
/* harmony import */ var lodash_without__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_without__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash_extend__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash/extend */ "./node_modules/lodash/extend.js");
/* harmony import */ var lodash_extend__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash_extend__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! url */ "./node_modules/url/url.js");
/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(url__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _utils_url_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/url-utils */ "./assets/js/theme/common/utils/url-utils.js");
/* harmony import */ var _global_modal__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../global/modal */ "./assets/js/theme/global/modal.js");
/* harmony import */ var _collapsible__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./collapsible */ "./assets/js/theme/common/collapsible.js");
/* harmony import */ var _utils_form_utils__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./utils/form-utils */ "./assets/js/theme/common/utils/form-utils.js");
/* harmony import */ var _nod__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./nod */ "./assets/js/theme/common/nod.js");










var defaultOptions = {
  accordionToggleSelector: '#facetedSearch .accordion-navigation, #facetedSearch .facetedSearch-toggle',
  blockerSelector: '#facetedSearch .blocker',
  clearFacetSelector: '#facetedSearch .facetedSearch-clearLink',
  componentSelector: '#facetedSearch-navList',
  facetNavListSelector: '#facetedSearch .navList',
  priceRangeErrorSelector: '#facet-range-form .form-inlineMessage',
  priceRangeFieldsetSelector: '#facet-range-form .form-fieldset',
  priceRangeFormSelector: '#facet-range-form',
  priceRangeMaxPriceSelector: '#facet-range-form [name=max_price]',
  priceRangeMinPriceSelector: '#facet-range-form [name=min_price]',
  showMoreToggleSelector: '#facetedSearch .accordion-content .toggleLink',
  facetedSearchFilterItems: '#facetedSearch-filterItems .form-input',
  modal: Object(_global_modal__WEBPACK_IMPORTED_MODULE_6__["default"])('#modal')[0],
  modalOpen: false
};
/**
 * Faceted search view component
 */

var FacetedSearch = /*#__PURE__*/function () {
  /**
   * @param {object} requestOptions - Object with options for the ajax requests
   * @param {function} callback - Function to execute after fetching templates
   * @param {object} options - Configurable options
   * @example
   *
   * let requestOptions = {
   *      templates: {
   *          productListing: 'category/product-listing',
   *          sidebar: 'category/sidebar'
   *     }
   * };
   *
   * let templatesDidLoad = function(content) {
   *     $productListingContainer.html(content.productListing);
   *     $facetedSearchContainer.html(content.sidebar);
   * };
   *
   * let facetedSearch = new FacetedSearch(requestOptions, templatesDidLoad);
   */
  function FacetedSearch(requestOptions, callback, options) {
    var _this = this;

    // Private properties
    this.requestOptions = requestOptions;
    this.callback = callback;
    this.options = lodash_extend__WEBPACK_IMPORTED_MODULE_2___default()({}, defaultOptions, options);
    this.collapsedFacets = [];
    this.collapsedFacetItems = []; // Init collapsibles

    Object(_collapsible__WEBPACK_IMPORTED_MODULE_7__["default"])(); // Init price validator

    this.initPriceValidator(); // Show limited items by default

    $(this.options.facetNavListSelector).each(function (index, navList) {
      _this.collapseFacetItems($(navList));
    }); // Mark initially collapsed accordions

    $(this.options.accordionToggleSelector).each(function (index, accordionToggle) {
      var $accordionToggle = $(accordionToggle);
      var collapsible = $accordionToggle.data('collapsibleInstance');

      if (collapsible.isCollapsed) {
        _this.collapsedFacets.push(collapsible.targetId);
      }
    }); // Collapse all facets if initially hidden
    // NOTE: Need to execute after Collapsible gets bootstrapped

    setTimeout(function () {
      if ($(_this.options.componentSelector).is(':hidden')) {
        _this.collapseAllFacets();
      }
    }); // Observe user events

    this.onStateChange = this.onStateChange.bind(this);
    this.onToggleClick = this.onToggleClick.bind(this);
    this.onAccordionToggle = this.onAccordionToggle.bind(this);
    this.onClearFacet = this.onClearFacet.bind(this);
    this.onFacetClick = this.onFacetClick.bind(this);
    this.onRangeSubmit = this.onRangeSubmit.bind(this);
    this.onSortBySubmit = this.onSortBySubmit.bind(this);
    this.filterFacetItems = this.filterFacetItems.bind(this);
    this.bindEvents();
  } // Public methods


  var _proto = FacetedSearch.prototype;

  _proto.refreshView = function refreshView(content) {
    if (content) {
      this.callback(content);
    } // Init collapsibles


    Object(_collapsible__WEBPACK_IMPORTED_MODULE_7__["default"])(); // Init price validator

    this.initPriceValidator(); // Restore view state

    this.restoreCollapsedFacets();
    this.restoreCollapsedFacetItems(); // Bind events

    this.bindEvents();
  };

  _proto.updateView = function updateView() {
    var _this2 = this;

    $(this.options.blockerSelector).show();
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_3__["api"].getPage(_utils_url_utils__WEBPACK_IMPORTED_MODULE_5__["default"].getUrl(), this.requestOptions, function (err, content) {
      $(_this2.options.blockerSelector).hide();

      if (err) {
        throw new Error(err);
      } // Refresh view with new content


      _this2.refreshView(content);
    });
  };

  _proto.expandFacetItems = function expandFacetItems($navList) {
    var id = $navList.attr('id'); // Remove

    this.collapsedFacetItems = lodash_without__WEBPACK_IMPORTED_MODULE_1___default()(this.collapsedFacetItems, id);
  };

  _proto.collapseFacetItems = function collapseFacetItems($navList) {
    var id = $navList.attr('id');
    var hasMoreResults = $navList.data('hasMoreResults');

    if (hasMoreResults) {
      this.collapsedFacetItems = lodash_union__WEBPACK_IMPORTED_MODULE_0___default()(this.collapsedFacetItems, [id]);
    } else {
      this.collapsedFacetItems = lodash_without__WEBPACK_IMPORTED_MODULE_1___default()(this.collapsedFacetItems, id);
    }
  };

  _proto.toggleFacetItems = function toggleFacetItems($navList) {
    var id = $navList.attr('id'); // Toggle depending on `collapsed` flag

    if (this.collapsedFacetItems.includes(id)) {
      this.getMoreFacetResults($navList);
      return true;
    }

    this.collapseFacetItems($navList);
    return false;
  };

  _proto.getMoreFacetResults = function getMoreFacetResults($navList) {
    var _this3 = this;

    var facet = $navList.data('facet');
    var facetUrl = _utils_url_utils__WEBPACK_IMPORTED_MODULE_5__["default"].getUrl();

    if (this.requestOptions.showMore) {
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_3__["api"].getPage(facetUrl, {
        template: this.requestOptions.showMore,
        params: {
          list_all: facet
        }
      }, function (err, response) {
        if (err) {
          throw new Error(err);
        }

        _this3.options.modal.open();

        _this3.options.modalOpen = true;

        _this3.options.modal.updateContent(response);
      });
    }

    this.collapseFacetItems($navList);
    return false;
  };

  _proto.filterFacetItems = function filterFacetItems(event) {
    var $items = $('.navList-item');
    var query = $(event.currentTarget).val().toLowerCase();
    $items.each(function (index, element) {
      var text = $(element).text().toLowerCase();

      if (text.indexOf(query) !== -1) {
        $(element).show();
      } else {
        $(element).hide();
      }
    });
  };

  _proto.expandFacet = function expandFacet($accordionToggle) {
    var collapsible = $accordionToggle.data('collapsibleInstance');
    collapsible.open();
  };

  _proto.collapseFacet = function collapseFacet($accordionToggle) {
    var collapsible = $accordionToggle.data('collapsibleInstance');
    collapsible.close();
  };

  _proto.collapseAllFacets = function collapseAllFacets() {
    var _this4 = this;

    var $accordionToggles = $(this.options.accordionToggleSelector);
    $accordionToggles.each(function (index, accordionToggle) {
      var $accordionToggle = $(accordionToggle);

      _this4.collapseFacet($accordionToggle);
    });
  };

  _proto.expandAllFacets = function expandAllFacets() {
    var _this5 = this;

    var $accordionToggles = $(this.options.accordionToggleSelector);
    $accordionToggles.each(function (index, accordionToggle) {
      var $accordionToggle = $(accordionToggle);

      _this5.expandFacet($accordionToggle);
    });
  } // Private methods
  ;

  _proto.initPriceValidator = function initPriceValidator() {
    if ($(this.options.priceRangeFormSelector).length === 0) {
      return;
    }

    var validator = Object(_nod__WEBPACK_IMPORTED_MODULE_9__["default"])();
    var selectors = {
      errorSelector: this.options.priceRangeErrorSelector,
      fieldsetSelector: this.options.priceRangeFieldsetSelector,
      formSelector: this.options.priceRangeFormSelector,
      maxPriceSelector: this.options.priceRangeMaxPriceSelector,
      minPriceSelector: this.options.priceRangeMinPriceSelector
    };
    _utils_form_utils__WEBPACK_IMPORTED_MODULE_8__["Validators"].setMinMaxPriceValidation(validator, selectors, this.options.validationErrorMessages);
    this.priceRangeValidator = validator;
  };

  _proto.restoreCollapsedFacetItems = function restoreCollapsedFacetItems() {
    var _this6 = this;

    var $navLists = $(this.options.facetNavListSelector); // Restore collapsed state for each facet

    $navLists.each(function (index, navList) {
      var $navList = $(navList);
      var id = $navList.attr('id');

      var shouldCollapse = _this6.collapsedFacetItems.includes(id);

      if (shouldCollapse) {
        _this6.collapseFacetItems($navList);
      } else {
        _this6.expandFacetItems($navList);
      }
    });
  };

  _proto.restoreCollapsedFacets = function restoreCollapsedFacets() {
    var _this7 = this;

    var $accordionToggles = $(this.options.accordionToggleSelector);
    $accordionToggles.each(function (index, accordionToggle) {
      var $accordionToggle = $(accordionToggle);
      var collapsible = $accordionToggle.data('collapsibleInstance');
      var id = collapsible.targetId;

      var shouldCollapse = _this7.collapsedFacets.includes(id);

      if (shouldCollapse) {
        _this7.collapseFacet($accordionToggle);
      } else {
        _this7.expandFacet($accordionToggle);
      }
    });
  };

  _proto.bindEvents = function bindEvents() {
    // Clean-up
    this.unbindEvents(); // DOM events

    $(window).on('statechange', this.onStateChange);
    $(window).on('popstate', this.onPopState);
    $(document).on('click', this.options.showMoreToggleSelector, this.onToggleClick);
    $(document).on('toggle.collapsible', this.options.accordionToggleSelector, this.onAccordionToggle);
    $(document).on('keyup', this.options.facetedSearchFilterItems, this.filterFacetItems);
    $(this.options.clearFacetSelector).on('click', this.onClearFacet); // Hooks

    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_3__["hooks"].on('facetedSearch-facet-clicked', this.onFacetClick);
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_3__["hooks"].on('facetedSearch-range-submitted', this.onRangeSubmit);
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_3__["hooks"].on('sortBy-submitted', this.onSortBySubmit);
  };

  _proto.unbindEvents = function unbindEvents() {
    // DOM events
    $(window).off('statechange', this.onStateChange);
    $(window).off('popstate', this.onPopState);
    $(document).off('click', this.options.showMoreToggleSelector, this.onToggleClick);
    $(document).off('toggle.collapsible', this.options.accordionToggleSelector, this.onAccordionToggle);
    $(document).off('keyup', this.options.facetedSearchFilterItems, this.filterFacetItems);
    $(this.options.clearFacetSelector).off('click', this.onClearFacet); // Hooks

    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_3__["hooks"].off('facetedSearch-facet-clicked', this.onFacetClick);
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_3__["hooks"].off('facetedSearch-range-submitted', this.onRangeSubmit);
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_3__["hooks"].off('sortBy-submitted', this.onSortBySubmit);
  };

  _proto.onClearFacet = function onClearFacet(event) {
    var $link = $(event.currentTarget);
    var url = $link.attr('href');
    event.preventDefault();
    event.stopPropagation(); // Update URL

    _utils_url_utils__WEBPACK_IMPORTED_MODULE_5__["default"].goToUrl(url);
  };

  _proto.onToggleClick = function onToggleClick(event) {
    var $toggle = $(event.currentTarget);
    var $navList = $($toggle.attr('href')); // Prevent default

    event.preventDefault(); // Toggle visible items

    this.toggleFacetItems($navList);
  };

  _proto.onFacetClick = function onFacetClick(event, currentTarget) {
    var $link = $(currentTarget);
    var url = $link.attr('href');
    event.preventDefault();
    $link.toggleClass('is-selected'); // Update URL

    _utils_url_utils__WEBPACK_IMPORTED_MODULE_5__["default"].goToUrl(url);

    if (this.options.modalOpen) {
      this.options.modal.close();
    }
  };

  _proto.onSortBySubmit = function onSortBySubmit(event, currentTarget) {
    var url = url__WEBPACK_IMPORTED_MODULE_4___default.a.parse(window.location.href, true);
    var queryParams = $(currentTarget).serialize().split('=');
    url.query[queryParams[0]] = queryParams[1];
    delete url.query.page; // Url object `query` is not a traditional JavaScript Object on all systems, clone it instead

    var urlQueryParams = {};
    Object.assign(urlQueryParams, url.query);
    event.preventDefault();
    _utils_url_utils__WEBPACK_IMPORTED_MODULE_5__["default"].goToUrl(url__WEBPACK_IMPORTED_MODULE_4___default.a.format({
      pathname: url.pathname,
      search: _utils_url_utils__WEBPACK_IMPORTED_MODULE_5__["default"].buildQueryString(urlQueryParams)
    }));
  };

  _proto.onRangeSubmit = function onRangeSubmit(event, currentTarget) {
    event.preventDefault();

    if (!this.priceRangeValidator.areAll(_nod__WEBPACK_IMPORTED_MODULE_9__["default"].constants.VALID)) {
      return;
    }

    var url = url__WEBPACK_IMPORTED_MODULE_4___default.a.parse(window.location.href, true);
    var queryParams = decodeURI($(currentTarget).serialize()).split('&');
    queryParams = _utils_url_utils__WEBPACK_IMPORTED_MODULE_5__["default"].parseQueryParams(queryParams);

    for (var key in queryParams) {
      if (queryParams.hasOwnProperty(key)) {
        url.query[key] = queryParams[key];
      }
    } // Url object `query` is not a traditional JavaScript Object on all systems, clone it instead


    var urlQueryParams = {};
    Object.assign(urlQueryParams, url.query);
    _utils_url_utils__WEBPACK_IMPORTED_MODULE_5__["default"].goToUrl(url__WEBPACK_IMPORTED_MODULE_4___default.a.format({
      pathname: url.pathname,
      search: _utils_url_utils__WEBPACK_IMPORTED_MODULE_5__["default"].buildQueryString(urlQueryParams)
    }));
  };

  _proto.onStateChange = function onStateChange() {
    this.updateView();
  };

  _proto.onAccordionToggle = function onAccordionToggle(event) {
    var $accordionToggle = $(event.currentTarget);
    var collapsible = $accordionToggle.data('collapsibleInstance');
    var id = collapsible.targetId;

    if (collapsible.isCollapsed) {
      this.collapsedFacets = lodash_union__WEBPACK_IMPORTED_MODULE_0___default()(this.collapsedFacets, [id]);
    } else {
      this.collapsedFacets = lodash_without__WEBPACK_IMPORTED_MODULE_1___default()(this.collapsedFacets, id);
    }
  };

  _proto.onPopState = function onPopState() {
    var currentUrl = window.location.href;
    var searchParams = new URLSearchParams(currentUrl); // If searchParams does not contain a page value then modify url query string to have page=1

    if (!searchParams.has('page')) {
      var linkUrl = $('.pagination-link').attr('href');
      var re = /page=[0-9]+/i;
      var updatedLinkUrl = linkUrl.replace(re, 'page=1');
      window.history.replaceState({}, document.title, updatedLinkUrl);
    }

    $(window).trigger('statechange');
  };

  return FacetedSearch;
}();

/* harmony default export */ __webpack_exports__["default"] = (FacetedSearch);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ }),

/***/ "./assets/js/theme/common/utils/url-utils.js":
/*!***************************************************!*\
  !*** ./assets/js/theme/common/utils/url-utils.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! url */ "./node_modules/url/url.js");
/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(url__WEBPACK_IMPORTED_MODULE_0__);

var urlUtils = {
  getUrl: function getUrl() {
    return "" + window.location.pathname + window.location.search;
  },
  goToUrl: function goToUrl(url) {
    window.history.pushState({}, document.title, url);
    $(window).trigger('statechange');
  },
  replaceParams: function replaceParams(url, params) {
    var parsed = url__WEBPACK_IMPORTED_MODULE_0___default.a.parse(url, true);
    var param; // Let the formatter use the query object to build the new url

    parsed.search = null;

    for (param in params) {
      if (params.hasOwnProperty(param)) {
        parsed.query[param] = params[param];
      }
    }

    return url__WEBPACK_IMPORTED_MODULE_0___default.a.format(parsed);
  },
  buildQueryString: function buildQueryString(queryData) {
    var out = '';
    var key;

    for (key in queryData) {
      if (queryData.hasOwnProperty(key)) {
        if (Array.isArray(queryData[key])) {
          var ndx = void 0;

          for (ndx in queryData[key]) {
            if (queryData[key].hasOwnProperty(ndx)) {
              out += "&" + key + "=" + queryData[key][ndx];
            }
          }
        } else {
          out += "&" + key + "=" + queryData[key];
        }
      }
    }

    return out.substring(1);
  },
  parseQueryParams: function parseQueryParams(queryData) {
    var params = {};

    for (var i = 0; i < queryData.length; i++) {
      var temp = queryData[i].split('=');

      if (temp[0] in params) {
        if (Array.isArray(params[temp[0]])) {
          params[temp[0]].push(temp[1]);
        } else {
          params[temp[0]] = [params[temp[0]], temp[1]];
        }
      } else {
        params[temp[0]] = temp[1];
      }
    }

    return params;
  }
};
/* harmony default export */ __webpack_exports__["default"] = (urlUtils);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ }),

/***/ "./assets/js/theme/global/compare-products.js":
/*!****************************************************!*\
  !*** ./assets/js/theme/global/compare-products.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./assets/js/theme/global/modal.js");


function decrementCounter(counter, item) {
  var index = counter.indexOf(item);

  if (index > -1) {
    counter.splice(index, 1);
  }
}

function incrementCounter(counter, item) {
  counter.push(item);
}

function updateCounterNav(counter, $link, urls) {
  if (counter.length !== 0) {
    if (!$link.is('visible')) {
      $link.addClass('show');
    }

    $link.attr('href', urls.compare + "/" + counter.join('/'));
    $link.find('span.countPill').html(counter.length);
  } else {
    $link.removeClass('show');
  }
}

/* harmony default export */ __webpack_exports__["default"] = (function (_ref) {
  var noCompareMessage = _ref.noCompareMessage,
      urls = _ref.urls;
  var compareCounter = [];
  var $compareLink = $('a[data-compare-nav]');
  $('body').on('compareReset', function () {
    var $checked = $('body').find('input[name="products\[\]"]:checked');
    compareCounter = $checked.length ? $checked.map(function (index, element) {
      return element.value;
    }).get() : [];
    updateCounterNav(compareCounter, $compareLink, urls);
  });
  $('body').triggerHandler('compareReset');
  $('body').on('click', '[data-compare-id]', function (event) {
    var product = event.currentTarget.value;
    var $clickedCompareLink = $('a[data-compare-nav]');

    if (event.currentTarget.checked) {
      incrementCounter(compareCounter, product);
    } else {
      decrementCounter(compareCounter, product);
    }

    updateCounterNav(compareCounter, $clickedCompareLink, urls);
  });
  $('body').on('click', 'a[data-compare-nav]', function () {
    var $clickedCheckedInput = $('body').find('input[name="products\[\]"]:checked');

    if ($clickedCheckedInput.length <= 1) {
      Object(_modal__WEBPACK_IMPORTED_MODULE_0__["showAlertModal"])(noCompareMessage);
      return false;
    }
  });
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvY2F0YWxvZy5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvY29tbW9uL2ZhY2V0ZWQtc2VhcmNoLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy90aGVtZS9jb21tb24vdXRpbHMvdXJsLXV0aWxzLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy90aGVtZS9nbG9iYWwvY29tcGFyZS1wcm9kdWN0cy5qcyJdLCJuYW1lcyI6WyJDYXRhbG9nUGFnZSIsImNvbnRleHQiLCJ3aW5kb3ciLCJhZGRFdmVudExpc3RlbmVyIiwiZG9jdW1lbnQiLCJhY3RpdmVFbGVtZW50IiwiaWQiLCJsb2NhbFN0b3JhZ2UiLCJzZXRJdGVtIiwiYXJyYW5nZUZvY3VzT25Tb3J0QnkiLCIkc29ydEJ5U2VsZWN0b3IiLCIkIiwiZ2V0SXRlbSIsImZvY3VzIiwicmVtb3ZlSXRlbSIsIm9uU29ydEJ5U3VibWl0IiwiZXZlbnQiLCJjdXJyZW50VGFyZ2V0IiwidXJsIiwiVXJsIiwicGFyc2UiLCJsb2NhdGlvbiIsImhyZWYiLCJxdWVyeVBhcmFtcyIsInNlcmlhbGl6ZSIsInNwbGl0IiwicXVlcnkiLCJwYWdlIiwicHJldmVudERlZmF1bHQiLCJmb3JtYXQiLCJwYXRobmFtZSIsInNlYXJjaCIsInVybFV0aWxzIiwiYnVpbGRRdWVyeVN0cmluZyIsIlBhZ2VNYW5hZ2VyIiwiZGVmYXVsdE9wdGlvbnMiLCJhY2NvcmRpb25Ub2dnbGVTZWxlY3RvciIsImJsb2NrZXJTZWxlY3RvciIsImNsZWFyRmFjZXRTZWxlY3RvciIsImNvbXBvbmVudFNlbGVjdG9yIiwiZmFjZXROYXZMaXN0U2VsZWN0b3IiLCJwcmljZVJhbmdlRXJyb3JTZWxlY3RvciIsInByaWNlUmFuZ2VGaWVsZHNldFNlbGVjdG9yIiwicHJpY2VSYW5nZUZvcm1TZWxlY3RvciIsInByaWNlUmFuZ2VNYXhQcmljZVNlbGVjdG9yIiwicHJpY2VSYW5nZU1pblByaWNlU2VsZWN0b3IiLCJzaG93TW9yZVRvZ2dsZVNlbGVjdG9yIiwiZmFjZXRlZFNlYXJjaEZpbHRlckl0ZW1zIiwibW9kYWwiLCJtb2RhbEZhY3RvcnkiLCJtb2RhbE9wZW4iLCJGYWNldGVkU2VhcmNoIiwicmVxdWVzdE9wdGlvbnMiLCJjYWxsYmFjayIsIm9wdGlvbnMiLCJjb2xsYXBzZWRGYWNldHMiLCJjb2xsYXBzZWRGYWNldEl0ZW1zIiwiY29sbGFwc2libGVGYWN0b3J5IiwiaW5pdFByaWNlVmFsaWRhdG9yIiwiZWFjaCIsImluZGV4IiwibmF2TGlzdCIsImNvbGxhcHNlRmFjZXRJdGVtcyIsImFjY29yZGlvblRvZ2dsZSIsIiRhY2NvcmRpb25Ub2dnbGUiLCJjb2xsYXBzaWJsZSIsImRhdGEiLCJpc0NvbGxhcHNlZCIsInB1c2giLCJ0YXJnZXRJZCIsInNldFRpbWVvdXQiLCJpcyIsImNvbGxhcHNlQWxsRmFjZXRzIiwib25TdGF0ZUNoYW5nZSIsImJpbmQiLCJvblRvZ2dsZUNsaWNrIiwib25BY2NvcmRpb25Ub2dnbGUiLCJvbkNsZWFyRmFjZXQiLCJvbkZhY2V0Q2xpY2siLCJvblJhbmdlU3VibWl0IiwiZmlsdGVyRmFjZXRJdGVtcyIsImJpbmRFdmVudHMiLCJyZWZyZXNoVmlldyIsImNvbnRlbnQiLCJyZXN0b3JlQ29sbGFwc2VkRmFjZXRzIiwicmVzdG9yZUNvbGxhcHNlZEZhY2V0SXRlbXMiLCJ1cGRhdGVWaWV3Iiwic2hvdyIsImFwaSIsImdldFBhZ2UiLCJnZXRVcmwiLCJlcnIiLCJoaWRlIiwiRXJyb3IiLCJleHBhbmRGYWNldEl0ZW1zIiwiJG5hdkxpc3QiLCJhdHRyIiwiaGFzTW9yZVJlc3VsdHMiLCJ0b2dnbGVGYWNldEl0ZW1zIiwiaW5jbHVkZXMiLCJnZXRNb3JlRmFjZXRSZXN1bHRzIiwiZmFjZXQiLCJmYWNldFVybCIsInNob3dNb3JlIiwidGVtcGxhdGUiLCJwYXJhbXMiLCJsaXN0X2FsbCIsInJlc3BvbnNlIiwib3BlbiIsInVwZGF0ZUNvbnRlbnQiLCIkaXRlbXMiLCJ2YWwiLCJ0b0xvd2VyQ2FzZSIsImVsZW1lbnQiLCJ0ZXh0IiwiaW5kZXhPZiIsImV4cGFuZEZhY2V0IiwiY29sbGFwc2VGYWNldCIsImNsb3NlIiwiJGFjY29yZGlvblRvZ2dsZXMiLCJleHBhbmRBbGxGYWNldHMiLCJsZW5ndGgiLCJ2YWxpZGF0b3IiLCJub2QiLCJzZWxlY3RvcnMiLCJlcnJvclNlbGVjdG9yIiwiZmllbGRzZXRTZWxlY3RvciIsImZvcm1TZWxlY3RvciIsIm1heFByaWNlU2VsZWN0b3IiLCJtaW5QcmljZVNlbGVjdG9yIiwiVmFsaWRhdG9ycyIsInNldE1pbk1heFByaWNlVmFsaWRhdGlvbiIsInZhbGlkYXRpb25FcnJvck1lc3NhZ2VzIiwicHJpY2VSYW5nZVZhbGlkYXRvciIsIiRuYXZMaXN0cyIsInNob3VsZENvbGxhcHNlIiwidW5iaW5kRXZlbnRzIiwib24iLCJvblBvcFN0YXRlIiwiaG9va3MiLCJvZmYiLCIkbGluayIsInN0b3BQcm9wYWdhdGlvbiIsImdvVG9VcmwiLCIkdG9nZ2xlIiwidG9nZ2xlQ2xhc3MiLCJ1cmxRdWVyeVBhcmFtcyIsIk9iamVjdCIsImFzc2lnbiIsImFyZUFsbCIsImNvbnN0YW50cyIsIlZBTElEIiwiZGVjb2RlVVJJIiwicGFyc2VRdWVyeVBhcmFtcyIsImtleSIsImhhc093blByb3BlcnR5IiwiY3VycmVudFVybCIsInNlYXJjaFBhcmFtcyIsIlVSTFNlYXJjaFBhcmFtcyIsImhhcyIsImxpbmtVcmwiLCJyZSIsInVwZGF0ZWRMaW5rVXJsIiwicmVwbGFjZSIsImhpc3RvcnkiLCJyZXBsYWNlU3RhdGUiLCJ0aXRsZSIsInRyaWdnZXIiLCJwdXNoU3RhdGUiLCJyZXBsYWNlUGFyYW1zIiwicGFyc2VkIiwicGFyYW0iLCJxdWVyeURhdGEiLCJvdXQiLCJBcnJheSIsImlzQXJyYXkiLCJuZHgiLCJzdWJzdHJpbmciLCJpIiwidGVtcCIsImRlY3JlbWVudENvdW50ZXIiLCJjb3VudGVyIiwiaXRlbSIsInNwbGljZSIsImluY3JlbWVudENvdW50ZXIiLCJ1cGRhdGVDb3VudGVyTmF2IiwidXJscyIsImFkZENsYXNzIiwiY29tcGFyZSIsImpvaW4iLCJmaW5kIiwiaHRtbCIsInJlbW92ZUNsYXNzIiwibm9Db21wYXJlTWVzc2FnZSIsImNvbXBhcmVDb3VudGVyIiwiJGNvbXBhcmVMaW5rIiwiJGNoZWNrZWQiLCJtYXAiLCJ2YWx1ZSIsImdldCIsInRyaWdnZXJIYW5kbGVyIiwicHJvZHVjdCIsIiRjbGlja2VkQ29tcGFyZUxpbmsiLCJjaGVja2VkIiwiJGNsaWNrZWRDaGVja2VkSW5wdXQiLCJzaG93QWxlcnRNb2RhbCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7O0lBRXFCQSxXOzs7RUFDakIscUJBQVlDLE9BQVosRUFBcUI7SUFBQTs7SUFDakIsZ0NBQU1BLE9BQU47SUFFQUMsTUFBTSxDQUFDQyxnQkFBUCxDQUF3QixjQUF4QixFQUF3QyxZQUFNO01BQzFDLElBQUlDLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QkMsRUFBdkIsS0FBOEIsTUFBbEMsRUFBMEM7UUFDdENKLE1BQU0sQ0FBQ0ssWUFBUCxDQUFvQkMsT0FBcEIsQ0FBNEIsY0FBNUIsRUFBNEMsVUFBNUM7TUFDSDtJQUNKLENBSkQ7SUFIaUI7RUFRcEI7Ozs7U0FFREMsb0IsR0FBQSxnQ0FBdUI7SUFDbkIsSUFBTUMsZUFBZSxHQUFHQyxDQUFDLENBQUMsZ0NBQUQsQ0FBekI7O0lBRUEsSUFBSVQsTUFBTSxDQUFDSyxZQUFQLENBQW9CSyxPQUFwQixDQUE0QixjQUE1QixDQUFKLEVBQWlEO01BQzdDRixlQUFlLENBQUNHLEtBQWhCO01BQ0FYLE1BQU0sQ0FBQ0ssWUFBUCxDQUFvQk8sVUFBcEIsQ0FBK0IsY0FBL0I7SUFDSDtFQUNKLEM7O1NBRURDLGMsR0FBQSx3QkFBZUMsS0FBZixFQUFzQkMsYUFBdEIsRUFBcUM7SUFDakMsSUFBTUMsR0FBRyxHQUFHQywwQ0FBRyxDQUFDQyxLQUFKLENBQVVsQixNQUFNLENBQUNtQixRQUFQLENBQWdCQyxJ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SUFBSWMsb0JBQW9CLENBQUNuRixNQUFyQixJQUErQixDQUFuQyxFQUFzQztNQUNsQ29GLDZEQUFjLENBQUNaLGdCQUFELENBQWQ7TUFDQSxPQUFPLEtBQVA7SUFDSDtFQUNKLENBUEQ7QUFRSCxDIiwiZmlsZSI6InRoZW1lLWJ1bmRsZS5jaHVuay4xLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFBhZ2VNYW5hZ2VyIGZyb20gJy4vcGFnZS1tYW5hZ2VyJztcbmltcG9ydCB1cmxVdGlscyBmcm9tICcuL2NvbW1vbi91dGlscy91cmwtdXRpbHMnO1xuaW1wb3J0IFVybCBmcm9tICd1cmwnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDYXRhbG9nUGFnZSBleHRlbmRzIFBhZ2VNYW5hZ2VyIHtcbiAgICBjb25zdHJ1Y3Rvcihjb250ZXh0KSB7XG4gICAgICAgIHN1cGVyKGNvbnRleHQpO1xuXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdiZWZvcmV1bmxvYWQnLCAoKSA9PiB7XG4gICAgICAgICAgICBpZiAoZG9jdW1lbnQuYWN0aXZlRWxlbWVudC5pZCA9PT0gJ3NvcnQnKSB7XG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKCdzb3J0QnlTdGF0dXMnLCAnc2VsZWN0ZWQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYXJyYW5nZUZvY3VzT25Tb3J0QnkoKSB7XG4gICAgICAgIGNvbnN0ICRzb3J0QnlTZWxlY3RvciA9ICQoJ1tkYXRhLXNvcnQtYnk9XCJwcm9kdWN0XCJdICNzb3J0Jyk7XG5cbiAgICAgICAgaWYgKHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnc29ydEJ5U3RhdHVzJykpIHtcbiAgICAgICAgICAgICRzb3J0QnlTZWxlY3Rvci5mb2N1cygpO1xuICAgICAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdzb3J0QnlTdGF0dXMnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uU29ydEJ5U3VibWl0KGV2ZW50LCBjdXJyZW50VGFyZ2V0KSB7XG4gICAgICAgIGNvbnN0IHVybCA9IFVybC5wYXJzZSh3aW5kb3cubG9jYXRpb24uaHJlZiwgdHJ1ZSk7XG4gICAgICAgIGNvbnN0IHF1ZXJ5UGFyYW1zID0gJChjdXJyZW50VGFyZ2V0KS5zZXJpYWxpemUoKS5zcGxpdCgnPScpO1xuXG4gICAgICAgIHVybC5xdWVyeVtxdWVyeVBhcmFtc1swXV0gPSBxdWVyeVBhcmFtc1sxXTtcbiAgICAgICAgZGVsZXRlIHVybC5xdWVyeS5wYWdlO1xuXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbiA9IFVybC5mb3JtYXQoeyBwYXRobmFtZTogdXJsLnBhdGhuYW1lLCBzZWFyY2g6IHVybFV0aWxzLmJ1aWxkUXVlcnlTdHJpbmcodXJsLnF1ZXJ5KSB9KTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBob29rcywgYXBpIH0gZnJvbSAnQGJpZ2NvbW1lcmNlL3N0ZW5jaWwtdXRpbHMnO1xuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCBVcmwgZnJvbSAndXJsJztcbmltcG9ydCB1cmxVdGlscyBmcm9tICcuL3V0aWxzL3VybC11dGlscyc7XG5pbXBvcnQgbW9kYWxGYWN0b3J5IGZyb20gJy4uL2dsb2JhbC9tb2RhbCc7XG5pbXBvcnQgY29sbGFwc2libGVGYWN0b3J5IGZyb20gJy4vY29sbGFwc2libGUnO1xuaW1wb3J0IHsgVmFsaWRhdG9ycyB9IGZyb20gJy4vdXRpbHMvZm9ybS11dGlscyc7XG5pbXBvcnQgbm9kIGZyb20gJy4vbm9kJztcblxuXG5jb25zdCBkZWZhdWx0T3B0aW9ucyA9IHtcbiAgICBhY2NvcmRpb25Ub2dnbGVTZWxlY3RvcjogJyNmYWNldGVkU2VhcmNoIC5hY2NvcmRpb24tbmF2aWdhdGlvbiwgI2ZhY2V0ZWRTZWFyY2ggLmZhY2V0ZWRTZWFyY2gtdG9nZ2xlJyxcbiAgICBibG9ja2VyU2VsZWN0b3I6ICcjZmFjZXRlZFNlYXJjaCAuYmxvY2tlcicsXG4gICAgY2xlYXJGYWNldFNlbGVjdG9yOiAnI2ZhY2V0ZWRTZWFyY2ggLmZhY2V0ZWRTZWFyY2gtY2xlYXJMaW5rJyxcbiAgICBjb21wb25lbnRTZWxlY3RvcjogJyNmYWNldGVkU2VhcmNoLW5hdkxpc3QnLFxuICAgIGZhY2V0TmF2TGlzdFNlbGVjdG9yOiAnI2ZhY2V0ZWRTZWFyY2ggLm5hdkxpc3QnLFxuICAgIHByaWNlUmFuZ2VFcnJvclNlbGVjdG9yOiAnI2ZhY2V0LXJhbmdlLWZvcm0gLmZvcm0taW5saW5lTWVzc2FnZScsXG4gICAgcHJpY2VSYW5nZUZpZWxkc2V0U2VsZWN0b3I6ICcjZmFjZXQtcmFuZ2UtZm9ybSAuZm9ybS1maWVsZHNldCcsXG4gICAgcHJpY2VSYW5nZUZvcm1TZWxlY3RvcjogJyNmYWNldC1yYW5nZS1mb3JtJyxcbiAgICBwcmljZVJhbmdlTWF4UHJpY2VTZWxlY3RvcjogJyNmYWNldC1yYW5nZS1mb3JtIFtuYW1lPW1heF9wcmljZV0nLFxuICAgIHByaWNlUmFuZ2VNaW5QcmljZVNlbGVjdG9yOiAnI2ZhY2V0LXJhbmdlLWZvcm0gW25hbWU9bWluX3ByaWNlXScsXG4gICAgc2hvd01vcmVUb2dnbGVTZWxlY3RvcjogJyNmYWNldGVkU2VhcmNoIC5hY2NvcmRpb24tY29udGVudCAudG9nZ2xlTGluaycsXG4gICAgZmFjZXRlZFNlYXJjaEZpbHRlckl0ZW1zOiAnI2ZhY2V0ZWRTZWFyY2gtZmlsdGVySXRlbXMgLmZvcm0taW5wdXQnLFxuICAgIG1vZGFsOiBtb2RhbEZhY3RvcnkoJyNtb2RhbCcpWzBdLFxuICAgIG1vZGFsT3BlbjogZmFsc2UsXG59O1xuXG4vKipcbiAqIEZhY2V0ZWQgc2VhcmNoIHZpZXcgY29tcG9uZW50XG4gKi9cbmNsYXNzIEZhY2V0ZWRTZWFyY2gge1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSByZXF1ZXN0T3B0aW9ucyAtIE9iamVjdCB3aXRoIG9wdGlvbnMgZm9yIHRoZSBhamF4IHJlcXVlc3RzXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2sgLSBGdW5jdGlvbiB0byBleGVjdXRlIGFmdGVyIGZldGNoaW5nIHRlbXBsYXRlc1xuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zIC0gQ29uZmlndXJhYmxlIG9wdGlvbnNcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogbGV0IHJlcXVlc3RPcHRpb25zID0ge1xuICAgICAqICAgICAgdGVtcGxhdGVzOiB7XG4gICAgICogICAgICAgICAgcHJvZHVjdExpc3Rpbmc6ICdjYXRlZ29yeS9wcm9kdWN0LWxpc3RpbmcnLFxuICAgICAqICAgICAgICAgIHNpZGViYXI6ICdjYXRlZ29yeS9zaWRlYmFyJ1xuICAgICAqICAgICB9XG4gICAgICogfTtcbiAgICAgKlxuICAgICAqIGxldCB0ZW1wbGF0ZXNEaWRMb2FkID0gZnVuY3Rpb24oY29udGVudCkge1xuICAgICAqICAgICAkcHJvZHVjdExpc3RpbmdDb250YWluZXIuaHRtbChjb250ZW50LnByb2R1Y3RMaXN0aW5nKTtcbiAgICAgKiAgICAgJGZhY2V0ZWRTZWFyY2hDb250YWluZXIuaHRtbChjb250ZW50LnNpZGViYXIpO1xuICAgICAqIH07XG4gICAgICpcbiAgICAgKiBsZXQgZmFjZXRlZFNlYXJjaCA9IG5ldyBGYWNldGVkU2VhcmNoKHJlcXVlc3RPcHRpb25zLCB0ZW1wbGF0ZXNEaWRMb2FkKTtcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihyZXF1ZXN0T3B0aW9ucywgY2FsbGJhY2ssIG9wdGlvbnMpIHtcbiAgICAgICAgLy8gUHJpdmF0ZSBwcm9wZXJ0aWVzXG4gICAgICAgIHRoaXMucmVxdWVzdE9wdGlvbnMgPSByZXF1ZXN0T3B0aW9ucztcbiAgICAgICAgdGhpcy5jYWxsYmFjayA9IGNhbGxiYWNrO1xuICAgICAgICB0aGlzLm9wdGlvbnMgPSBfLmV4dGVuZCh7fSwgZGVmYXVsdE9wdGlvbnMsIG9wdGlvbnMpO1xuICAgICAgICB0aGlzLmNvbGxhcHNlZEZhY2V0cyA9IFtdO1xuICAgICAgICB0aGlzLmNvbGxhcHNlZEZhY2V0SXRlbXMgPSBbXTtcblxuICAgICAgICAvLyBJbml0IGNvbGxhcHNpYmxlc1xuICAgICAgICBjb2xsYXBzaWJsZUZhY3RvcnkoKTtcblxuICAgICAgICAvLyBJbml0IHByaWNlIHZhbGlkYXRvclxuICAgICAgICB0aGlzLmluaXRQcmljZVZhbGlkYXRvcigpO1xuXG4gICAgICAgIC8vIFNob3cgbGltaXRlZCBpdGVtcyBieSBkZWZhdWx0XG4gICAgICAgICQodGhpcy5vcHRpb25zLmZhY2V0TmF2TGlzdFNlbGVjdG9yKS5lYWNoKChpbmRleCwgbmF2TGlzdCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5jb2xsYXBzZUZhY2V0SXRlbXMoJChuYXZMaXN0KSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIE1hcmsgaW5pdGlhbGx5IGNvbGxhcHNlZCBhY2NvcmRpb25zXG4gICAgICAgICQodGhpcy5vcHRpb25zLmFjY29yZGlvblRvZ2dsZVNlbGVjdG9yKS5lYWNoKChpbmRleCwgYWNjb3JkaW9uVG9nZ2xlKSA9PiB7XG4gICAgICAgICAgICBjb25zdCAkYWNjb3JkaW9uVG9nZ2xlID0gJChhY2NvcmRpb25Ub2dnbGUpO1xuICAgICAgICAgICAgY29uc3QgY29sbGFwc2libGUgPSAkYWNjb3JkaW9uVG9nZ2xlLmRhdGEoJ2NvbGxhcHNpYmxlSW5zdGFuY2UnKTtcblxuICAgICAgICAgICAgaWYgKGNvbGxhcHNpYmxlLmlzQ29sbGFwc2VkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb2xsYXBzZWRGYWNldHMucHVzaChjb2xsYXBzaWJsZS50YXJnZXRJZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIENvbGxhcHNlIGFsbCBmYWNldHMgaWYgaW5pdGlhbGx5IGhpZGRlblxuICAgICAgICAvLyBOT1RFOiBOZWVkIHRvIGV4ZWN1dGUgYWZ0ZXIgQ29sbGFwc2libGUgZ2V0cyBib290c3RyYXBwZWRcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBpZiAoJCh0aGlzLm9wdGlvbnMuY29tcG9uZW50U2VsZWN0b3IpLmlzKCc6aGlkZGVuJykpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbGxhcHNlQWxsRmFjZXRzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIE9ic2VydmUgdXNlciBldmVudHNcbiAgICAgICAgdGhpcy5vblN0YXRlQ2hhbmdlID0gdGhpcy5vblN0YXRlQ2hhbmdlLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMub25Ub2dnbGVDbGljayA9IHRoaXMub25Ub2dnbGVDbGljay5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLm9uQWNjb3JkaW9uVG9nZ2xlID0gdGhpcy5vbkFjY29yZGlvblRvZ2dsZS5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLm9uQ2xlYXJGYWNldCA9IHRoaXMub25DbGVhckZhY2V0LmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMub25GYWNldENsaWNrID0gdGhpcy5vbkZhY2V0Q2xpY2suYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5vblJhbmdlU3VibWl0ID0gdGhpcy5vblJhbmdlU3VibWl0LmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMub25Tb3J0QnlTdWJtaXQgPSB0aGlzLm9uU29ydEJ5U3VibWl0LmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuZmlsdGVyRmFjZXRJdGVtcyA9IHRoaXMuZmlsdGVyRmFjZXRJdGVtcy5iaW5kKHRoaXMpO1xuXG4gICAgICAgIHRoaXMuYmluZEV2ZW50cygpO1xuICAgIH1cblxuICAgIC8vIFB1YmxpYyBtZXRob2RzXG4gICAgcmVmcmVzaFZpZXcoY29udGVudCkge1xuICAgICAgICBpZiAoY29udGVudCkge1xuICAgICAgICAgICAgdGhpcy5jYWxsYmFjayhjb250ZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEluaXQgY29sbGFwc2libGVzXG4gICAgICAgIGNvbGxhcHNpYmxlRmFjdG9yeSgpO1xuXG4gICAgICAgIC8vIEluaXQgcHJpY2UgdmFsaWRhdG9yXG4gICAgICAgIHRoaXMuaW5pdFByaWNlVmFsaWRhdG9yKCk7XG5cbiAgICAgICAgLy8gUmVzdG9yZSB2aWV3IHN0YXRlXG4gICAgICAgIHRoaXMucmVzdG9yZUNvbGxhcHNlZEZhY2V0cygpO1xuICAgICAgICB0aGlzLnJlc3RvcmVDb2xsYXBzZWRGYWNldEl0ZW1zKCk7XG5cbiAgICAgICAgLy8gQmluZCBldmVudHNcbiAgICAgICAgdGhpcy5iaW5kRXZlbnRzKCk7XG4gICAgfVxuXG4gICAgdXBkYXRlVmlldygpIHtcbiAgICAgICAgJCh0aGlzLm9wdGlvbnMuYmxvY2tlclNlbGVjdG9yKS5zaG93KCk7XG5cbiAgICAgICAgYXBpLmdldFBhZ2UodXJsVXRpbHMuZ2V0VXJsKCksIHRoaXMucmVxdWVzdE9wdGlvbnMsIChlcnIsIGNvbnRlbnQpID0+IHtcbiAgICAgICAgICAgICQodGhpcy5vcHRpb25zLmJsb2NrZXJTZWxlY3RvcikuaGlkZSgpO1xuXG4gICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIFJlZnJlc2ggdmlldyB3aXRoIG5ldyBjb250ZW50XG4gICAgICAgICAgICB0aGlzLnJlZnJlc2hWaWV3KGNvbnRlbnQpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBleHBhbmRGYWNldEl0ZW1zKCRuYXZMaXN0KSB7XG4gICAgICAgIGNvbnN0IGlkID0gJG5hdkxpc3QuYXR0cignaWQnKTtcblxuICAgICAgICAvLyBSZW1vdmVcbiAgICAgICAgdGhpcy5jb2xsYXBzZWRGYWNldEl0ZW1zID0gXy53aXRob3V0KHRoaXMuY29sbGFwc2VkRmFjZXRJdGVtcywgaWQpO1xuICAgIH1cblxuICAgIGNvbGxhcHNlRmFjZXRJdGVtcygkbmF2TGlzdCkge1xuICAgICAgICBjb25zdCBpZCA9ICRuYXZMaXN0LmF0dHIoJ2lkJyk7XG4gICAgICAgIGNvbnN0IGhhc01vcmVSZXN1bHRzID0gJG5hdkxpc3QuZGF0YSgnaGFzTW9yZVJlc3VsdHMnKTtcblxuICAgICAgICBpZiAoaGFzTW9yZVJlc3VsdHMpIHtcbiAgICAgICAgICAgIHRoaXMuY29sbGFwc2VkRmFjZXRJdGVtcyA9IF8udW5pb24odGhpcy5jb2xsYXBzZWRGYWNldEl0ZW1zLCBbaWRdKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY29sbGFwc2VkRmFjZXRJdGVtcyA9IF8ud2l0aG91dCh0aGlzLmNvbGxhcHNlZEZhY2V0SXRlbXMsIGlkKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHRvZ2dsZUZhY2V0SXRlbXMoJG5hdkxpc3QpIHtcbiAgICAgICAgY29uc3QgaWQgPSAkbmF2TGlzdC5hdHRyKCdpZCcpO1xuXG4gICAgICAgIC8vIFRvZ2dsZSBkZXBlbmRpbmcgb24gYGNvbGxhcHNlZGAgZmxhZ1xuICAgICAgICBpZiAodGhpcy5jb2xsYXBzZWRGYWNldEl0ZW1zLmluY2x1ZGVzKGlkKSkge1xuICAgICAgICAgICAgdGhpcy5nZXRNb3JlRmFjZXRSZXN1bHRzKCRuYXZMaXN0KTtcblxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNvbGxhcHNlRmFjZXRJdGVtcygkbmF2TGlzdCk7XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGdldE1vcmVGYWNldFJlc3VsdHMoJG5hdkxpc3QpIHtcbiAgICAgICAgY29uc3QgZmFjZXQgPSAkbmF2TGlzdC5kYXRhKCdmYWNldCcpO1xuICAgICAgICBjb25zdCBmYWNldFVybCA9IHVybFV0aWxzLmdldFVybCgpO1xuXG4gICAgICAgIGlmICh0aGlzLnJlcXVlc3RPcHRpb25zLnNob3dNb3JlKSB7XG4gICAgICAgICAgICBhcGkuZ2V0UGFnZShmYWNldFVybCwge1xuICAgICAgICAgICAgICAgIHRlbXBsYXRlOiB0aGlzLnJlcXVlc3RPcHRpb25zLnNob3dNb3JlLFxuICAgICAgICAgICAgICAgIHBhcmFtczoge1xuICAgICAgICAgICAgICAgICAgICBsaXN0X2FsbDogZmFjZXQsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sIChlcnIsIHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnMubW9kYWwub3BlbigpO1xuICAgICAgICAgICAgICAgIHRoaXMub3B0aW9ucy5tb2RhbE9wZW4gPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMub3B0aW9ucy5tb2RhbC51cGRhdGVDb250ZW50KHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jb2xsYXBzZUZhY2V0SXRlbXMoJG5hdkxpc3QpO1xuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBmaWx0ZXJGYWNldEl0ZW1zKGV2ZW50KSB7XG4gICAgICAgIGNvbnN0ICRpdGVtcyA9ICQoJy5uYXZMaXN0LWl0ZW0nKTtcbiAgICAgICAgY29uc3QgcXVlcnkgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpLnZhbCgpLnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgICAgJGl0ZW1zLmVhY2goKGluZGV4LCBlbGVtZW50KSA9PiB7XG4gICAgICAgICAgICBjb25zdCB0ZXh0ID0gJChlbGVtZW50KS50ZXh0KCkudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgIGlmICh0ZXh0LmluZGV4T2YocXVlcnkpICE9PSAtMSkge1xuICAgICAgICAgICAgICAgICQoZWxlbWVudCkuc2hvdygpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkKGVsZW1lbnQpLmhpZGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZXhwYW5kRmFjZXQoJGFjY29yZGlvblRvZ2dsZSkge1xuICAgICAgICBjb25zdCBjb2xsYXBzaWJsZSA9ICRhY2NvcmRpb25Ub2dnbGUuZGF0YSgnY29sbGFwc2libGVJbnN0YW5jZScpO1xuXG4gICAgICAgIGNvbGxhcHNpYmxlLm9wZW4oKTtcbiAgICB9XG5cbiAgICBjb2xsYXBzZUZhY2V0KCRhY2NvcmRpb25Ub2dnbGUpIHtcbiAgICAgICAgY29uc3QgY29sbGFwc2libGUgPSAkYWNjb3JkaW9uVG9nZ2xlLmRhdGEoJ2NvbGxhcHNpYmxlSW5zdGFuY2UnKTtcblxuICAgICAgICBjb2xsYXBzaWJsZS5jbG9zZSgpO1xuICAgIH1cblxuICAgIGNvbGxhcHNlQWxsRmFjZXRzKCkge1xuICAgICAgICBjb25zdCAkYWNjb3JkaW9uVG9nZ2xlcyA9ICQodGhpcy5vcHRpb25zLmFjY29yZGlvblRvZ2dsZVNlbGVjdG9yKTtcblxuICAgICAgICAkYWNjb3JkaW9uVG9nZ2xlcy5lYWNoKChpbmRleCwgYWNjb3JkaW9uVG9nZ2xlKSA9PiB7XG4gICAgICAgICAgICBjb25zdCAkYWNjb3JkaW9uVG9nZ2xlID0gJChhY2NvcmRpb25Ub2dnbGUpO1xuXG4gICAgICAgICAgICB0aGlzLmNvbGxhcHNlRmFjZXQoJGFjY29yZGlvblRvZ2dsZSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGV4cGFuZEFsbEZhY2V0cygpIHtcbiAgICAgICAgY29uc3QgJGFjY29yZGlvblRvZ2dsZXMgPSAkKHRoaXMub3B0aW9ucy5hY2NvcmRpb25Ub2dnbGVTZWxlY3Rvcik7XG5cbiAgICAgICAgJGFjY29yZGlvblRvZ2dsZXMuZWFjaCgoaW5kZXgsIGFjY29yZGlvblRvZ2dsZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgJGFjY29yZGlvblRvZ2dsZSA9ICQoYWNjb3JkaW9uVG9nZ2xlKTtcblxuICAgICAgICAgICAgdGhpcy5leHBhbmRGYWNldCgkYWNjb3JkaW9uVG9nZ2xlKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gUHJpdmF0ZSBtZXRob2RzXG4gICAgaW5pdFByaWNlVmFsaWRhdG9yKCkge1xuICAgICAgICBpZiAoJCh0aGlzLm9wdGlvbnMucHJpY2VSYW5nZUZvcm1TZWxlY3RvcikubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB2YWxpZGF0b3IgPSBub2QoKTtcbiAgICAgICAgY29uc3Qgc2VsZWN0b3JzID0ge1xuICAgICAgICAgICAgZXJyb3JTZWxlY3RvcjogdGhpcy5vcHRpb25zLnByaWNlUmFuZ2VFcnJvclNlbGVjdG9yLFxuICAgICAgICAgICAgZmllbGRzZXRTZWxlY3RvcjogdGhpcy5vcHRpb25zLnByaWNlUmFuZ2VGaWVsZHNldFNlbGVjdG9yLFxuICAgICAgICAgICAgZm9ybVNlbGVjdG9yOiB0aGlzLm9wdGlvbnMucHJpY2VSYW5nZUZvcm1TZWxlY3RvcixcbiAgICAgICAgICAgIG1heFByaWNlU2VsZWN0b3I6IHRoaXMub3B0aW9ucy5wcmljZVJhbmdlTWF4UHJpY2VTZWxlY3RvcixcbiAgICAgICAgICAgIG1pblByaWNlU2VsZWN0b3I6IHRoaXMub3B0aW9ucy5wcmljZVJhbmdlTWluUHJpY2VTZWxlY3RvcixcbiAgICAgICAgfTtcblxuICAgICAgICBWYWxpZGF0b3JzLnNldE1pbk1heFByaWNlVmFsaWRhdGlvbih2YWxpZGF0b3IsIHNlbGVjdG9ycywgdGhpcy5vcHRpb25zLnZhbGlkYXRpb25FcnJvck1lc3NhZ2VzKTtcblxuICAgICAgICB0aGlzLnByaWNlUmFuZ2VWYWxpZGF0b3IgPSB2YWxpZGF0b3I7XG4gICAgfVxuXG4gICAgcmVzdG9yZUNvbGxhcHNlZEZhY2V0SXRlbXMoKSB7XG4gICAgICAgIGNvbnN0ICRuYXZMaXN0cyA9ICQodGhpcy5vcHRpb25zLmZhY2V0TmF2TGlzdFNlbGVjdG9yKTtcblxuICAgICAgICAvLyBSZXN0b3JlIGNvbGxhcHNlZCBzdGF0ZSBmb3IgZWFjaCBmYWNldFxuICAgICAgICAkbmF2TGlzdHMuZWFjaCgoaW5kZXgsIG5hdkxpc3QpID0+IHtcbiAgICAgICAgICAgIGNvbnN0ICRuYXZMaXN0ID0gJChuYXZMaXN0KTtcbiAgICAgICAgICAgIGNvbnN0IGlkID0gJG5hdkxpc3QuYXR0cignaWQnKTtcbiAgICAgICAgICAgIGNvbnN0IHNob3VsZENvbGxhcHNlID0gdGhpcy5jb2xsYXBzZWRGYWNldEl0ZW1zLmluY2x1ZGVzKGlkKTtcblxuICAgICAgICAgICAgaWYgKHNob3VsZENvbGxhcHNlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb2xsYXBzZUZhY2V0SXRlbXMoJG5hdkxpc3QpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmV4cGFuZEZhY2V0SXRlbXMoJG5hdkxpc3QpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZXN0b3JlQ29sbGFwc2VkRmFjZXRzKCkge1xuICAgICAgICBjb25zdCAkYWNjb3JkaW9uVG9nZ2xlcyA9ICQodGhpcy5vcHRpb25zLmFjY29yZGlvblRvZ2dsZVNlbGVjdG9yKTtcblxuICAgICAgICAkYWNjb3JkaW9uVG9nZ2xlcy5lYWNoKChpbmRleCwgYWNjb3JkaW9uVG9nZ2xlKSA9PiB7XG4gICAgICAgICAgICBjb25zdCAkYWNjb3JkaW9uVG9nZ2xlID0gJChhY2NvcmRpb25Ub2dnbGUpO1xuICAgICAgICAgICAgY29uc3QgY29sbGFwc2libGUgPSAkYWNjb3JkaW9uVG9nZ2xlLmRhdGEoJ2NvbGxhcHNpYmxlSW5zdGFuY2UnKTtcbiAgICAgICAgICAgIGNvbnN0IGlkID0gY29sbGFwc2libGUudGFyZ2V0SWQ7XG4gICAgICAgICAgICBjb25zdCBzaG91bGRDb2xsYXBzZSA9IHRoaXMuY29sbGFwc2VkRmFjZXRzLmluY2x1ZGVzKGlkKTtcblxuICAgICAgICAgICAgaWYgKHNob3VsZENvbGxhcHNlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb2xsYXBzZUZhY2V0KCRhY2NvcmRpb25Ub2dnbGUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmV4cGFuZEZhY2V0KCRhY2NvcmRpb25Ub2dnbGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBiaW5kRXZlbnRzKCkge1xuICAgICAgICAvLyBDbGVhbi11cFxuICAgICAgICB0aGlzLnVuYmluZEV2ZW50cygpO1xuXG4gICAgICAgIC8vIERPTSBldmVudHNcbiAgICAgICAgJCh3aW5kb3cpLm9uKCdzdGF0ZWNoYW5nZScsIHRoaXMub25TdGF0ZUNoYW5nZSk7XG4gICAgICAgICQod2luZG93KS5vbigncG9wc3RhdGUnLCB0aGlzLm9uUG9wU3RhdGUpO1xuICAgICAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCB0aGlzLm9wdGlvbnMuc2hvd01vcmVUb2dnbGVTZWxlY3RvciwgdGhpcy5vblRvZ2dsZUNsaWNrKTtcbiAgICAgICAgJChkb2N1bWVudCkub24oJ3RvZ2dsZS5jb2xsYXBzaWJsZScsIHRoaXMub3B0aW9ucy5hY2NvcmRpb25Ub2dnbGVTZWxlY3RvciwgdGhpcy5vbkFjY29yZGlvblRvZ2dsZSk7XG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdrZXl1cCcsIHRoaXMub3B0aW9ucy5mYWNldGVkU2VhcmNoRmlsdGVySXRlbXMsIHRoaXMuZmlsdGVyRmFjZXRJdGVtcyk7XG4gICAgICAgICQodGhpcy5vcHRpb25zLmNsZWFyRmFjZXRTZWxlY3Rvcikub24oJ2NsaWNrJywgdGhpcy5vbkNsZWFyRmFjZXQpO1xuXG4gICAgICAgIC8vIEhvb2tzXG4gICAgICAgIGhvb2tzLm9uKCdmYWNldGVkU2VhcmNoLWZhY2V0LWNsaWNrZWQnLCB0aGlzLm9uRmFjZXRDbGljayk7XG4gICAgICAgIGhvb2tzLm9uKCdmYWNldGVkU2VhcmNoLXJhbmdlLXN1Ym1pdHRlZCcsIHRoaXMub25SYW5nZVN1Ym1pdCk7XG4gICAgICAgIGhvb2tzLm9uKCdzb3J0Qnktc3VibWl0dGVkJywgdGhpcy5vblNvcnRCeVN1Ym1pdCk7XG4gICAgfVxuXG4gICAgdW5iaW5kRXZlbnRzKCkge1xuICAgICAgICAvLyBET00gZXZlbnRzXG4gICAgICAgICQod2luZG93KS5vZmYoJ3N0YXRlY2hhbmdlJywgdGhpcy5vblN0YXRlQ2hhbmdlKTtcbiAgICAgICAgJCh3aW5kb3cpLm9mZigncG9wc3RhdGUnLCB0aGlzLm9uUG9wU3RhdGUpO1xuICAgICAgICAkKGRvY3VtZW50KS5vZmYoJ2NsaWNrJywgdGhpcy5vcHRpb25zLnNob3dNb3JlVG9nZ2xlU2VsZWN0b3IsIHRoaXMub25Ub2dnbGVDbGljayk7XG4gICAgICAgICQoZG9jdW1lbnQpLm9mZigndG9nZ2xlLmNvbGxhcHNpYmxlJywgdGhpcy5vcHRpb25zLmFjY29yZGlvblRvZ2dsZVNlbGVjdG9yLCB0aGlzLm9uQWNjb3JkaW9uVG9nZ2xlKTtcbiAgICAgICAgJChkb2N1bWVudCkub2ZmKCdrZXl1cCcsIHRoaXMub3B0aW9ucy5mYWNldGVkU2VhcmNoRmlsdGVySXRlbXMsIHRoaXMuZmlsdGVyRmFjZXRJdGVtcyk7XG4gICAgICAgICQodGhpcy5vcHRpb25zLmNsZWFyRmFjZXRTZWxlY3Rvcikub2ZmKCdjbGljaycsIHRoaXMub25DbGVhckZhY2V0KTtcblxuICAgICAgICAvLyBIb29rc1xuICAgICAgICBob29rcy5vZmYoJ2ZhY2V0ZWRTZWFyY2gtZmFjZXQtY2xpY2tlZCcsIHRoaXMub25GYWNldENsaWNrKTtcbiAgICAgICAgaG9va3Mub2ZmKCdmYWNldGVkU2VhcmNoLXJhbmdlLXN1Ym1pdHRlZCcsIHRoaXMub25SYW5nZVN1Ym1pdCk7XG4gICAgICAgIGhvb2tzLm9mZignc29ydEJ5LXN1Ym1pdHRlZCcsIHRoaXMub25Tb3J0QnlTdWJtaXQpO1xuICAgIH1cblxuICAgIG9uQ2xlYXJGYWNldChldmVudCkge1xuICAgICAgICBjb25zdCAkbGluayA9ICQoZXZlbnQuY3VycmVudFRhcmdldCk7XG4gICAgICAgIGNvbnN0IHVybCA9ICRsaW5rLmF0dHIoJ2hyZWYnKTtcblxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgICAvLyBVcGRhdGUgVVJMXG4gICAgICAgIHVybFV0aWxzLmdvVG9VcmwodXJsKTtcbiAgICB9XG5cbiAgICBvblRvZ2dsZUNsaWNrKGV2ZW50KSB7XG4gICAgICAgIGNvbnN0ICR0b2dnbGUgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpO1xuICAgICAgICBjb25zdCAkbmF2TGlzdCA9ICQoJHRvZ2dsZS5hdHRyKCdocmVmJykpO1xuXG4gICAgICAgIC8vIFByZXZlbnQgZGVmYXVsdFxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIC8vIFRvZ2dsZSB2aXNpYmxlIGl0ZW1zXG4gICAgICAgIHRoaXMudG9nZ2xlRmFjZXRJdGVtcygkbmF2TGlzdCk7XG4gICAgfVxuXG4gICAgb25GYWNldENsaWNrKGV2ZW50LCBjdXJyZW50VGFyZ2V0KSB7XG4gICAgICAgIGNvbnN0ICRsaW5rID0gJChjdXJyZW50VGFyZ2V0KTtcbiAgICAgICAgY29uc3QgdXJsID0gJGxpbmsuYXR0cignaHJlZicpO1xuXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgJGxpbmsudG9nZ2xlQ2xhc3MoJ2lzLXNlbGVjdGVkJyk7XG5cbiAgICAgICAgLy8gVXBkYXRlIFVSTFxuICAgICAgICB1cmxVdGlscy5nb1RvVXJsKHVybCk7XG5cbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5tb2RhbE9wZW4pIHtcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy5tb2RhbC5jbG9zZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25Tb3J0QnlTdWJtaXQoZXZlbnQsIGN1cnJlbnRUYXJnZXQpIHtcbiAgICAgICAgY29uc3QgdXJsID0gVXJsLnBhcnNlKHdpbmRvdy5sb2NhdGlvbi5ocmVmLCB0cnVlKTtcbiAgICAgICAgY29uc3QgcXVlcnlQYXJhbXMgPSAkKGN1cnJlbnRUYXJnZXQpLnNlcmlhbGl6ZSgpLnNwbGl0KCc9Jyk7XG5cbiAgICAgICAgdXJsLnF1ZXJ5W3F1ZXJ5UGFyYW1zWzBdXSA9IHF1ZXJ5UGFyYW1zWzFdO1xuICAgICAgICBkZWxldGUgdXJsLnF1ZXJ5LnBhZ2U7XG5cbiAgICAgICAgLy8gVXJsIG9iamVjdCBgcXVlcnlgIGlzIG5vdCBhIHRyYWRpdGlvbmFsIEphdmFTY3JpcHQgT2JqZWN0IG9uIGFsbCBzeXN0ZW1zLCBjbG9uZSBpdCBpbnN0ZWFkXG4gICAgICAgIGNvbnN0IHVybFF1ZXJ5UGFyYW1zID0ge307XG4gICAgICAgIE9iamVjdC5hc3NpZ24odXJsUXVlcnlQYXJhbXMsIHVybC5xdWVyeSk7XG5cbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICB1cmxVdGlscy5nb1RvVXJsKFVybC5mb3JtYXQoeyBwYXRobmFtZTogdXJsLnBhdGhuYW1lLCBzZWFyY2g6IHVybFV0aWxzLmJ1aWxkUXVlcnlTdHJpbmcodXJsUXVlcnlQYXJhbXMpIH0pKTtcbiAgICB9XG5cbiAgICBvblJhbmdlU3VibWl0KGV2ZW50LCBjdXJyZW50VGFyZ2V0KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgaWYgKCF0aGlzLnByaWNlUmFuZ2VWYWxpZGF0b3IuYXJlQWxsKG5vZC5jb25zdGFudHMuVkFMSUQpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB1cmwgPSBVcmwucGFyc2Uod2luZG93LmxvY2F0aW9uLmhyZWYsIHRydWUpO1xuICAgICAgICBsZXQgcXVlcnlQYXJhbXMgPSBkZWNvZGVVUkkoJChjdXJyZW50VGFyZ2V0KS5zZXJpYWxpemUoKSkuc3BsaXQoJyYnKTtcbiAgICAgICAgcXVlcnlQYXJhbXMgPSB1cmxVdGlscy5wYXJzZVF1ZXJ5UGFyYW1zKHF1ZXJ5UGFyYW1zKTtcblxuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBxdWVyeVBhcmFtcykge1xuICAgICAgICAgICAgaWYgKHF1ZXJ5UGFyYW1zLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgICAgICB1cmwucXVlcnlba2V5XSA9IHF1ZXJ5UGFyYW1zW2tleV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBVcmwgb2JqZWN0IGBxdWVyeWAgaXMgbm90IGEgdHJhZGl0aW9uYWwgSmF2YVNjcmlwdCBPYmplY3Qgb24gYWxsIHN5c3RlbXMsIGNsb25lIGl0IGluc3RlYWRcbiAgICAgICAgY29uc3QgdXJsUXVlcnlQYXJhbXMgPSB7fTtcbiAgICAgICAgT2JqZWN0LmFzc2lnbih1cmxRdWVyeVBhcmFtcywgdXJsLnF1ZXJ5KTtcblxuICAgICAgICB1cmxVdGlscy5nb1RvVXJsKFVybC5mb3JtYXQoeyBwYXRobmFtZTogdXJsLnBhdGhuYW1lLCBzZWFyY2g6IHVybFV0aWxzLmJ1aWxkUXVlcnlTdHJpbmcodXJsUXVlcnlQYXJhbXMpIH0pKTtcbiAgICB9XG5cbiAgICBvblN0YXRlQ2hhbmdlKCkge1xuICAgICAgICB0aGlzLnVwZGF0ZVZpZXcoKTtcbiAgICB9XG5cbiAgICBvbkFjY29yZGlvblRvZ2dsZShldmVudCkge1xuICAgICAgICBjb25zdCAkYWNjb3JkaW9uVG9nZ2xlID0gJChldmVudC5jdXJyZW50VGFyZ2V0KTtcbiAgICAgICAgY29uc3QgY29sbGFwc2libGUgPSAkYWNjb3JkaW9uVG9nZ2xlLmRhdGEoJ2NvbGxhcHNpYmxlSW5zdGFuY2UnKTtcbiAgICAgICAgY29uc3QgaWQgPSBjb2xsYXBzaWJsZS50YXJnZXRJZDtcblxuICAgICAgICBpZiAoY29sbGFwc2libGUuaXNDb2xsYXBzZWQpIHtcbiAgICAgICAgICAgIHRoaXMuY29sbGFwc2VkRmFjZXRzID0gXy51bmlvbih0aGlzLmNvbGxhcHNlZEZhY2V0cywgW2lkXSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmNvbGxhcHNlZEZhY2V0cyA9IF8ud2l0aG91dCh0aGlzLmNvbGxhcHNlZEZhY2V0cywgaWQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25Qb3BTdGF0ZSgpIHtcbiAgICAgICAgY29uc3QgY3VycmVudFVybCA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmO1xuICAgICAgICBjb25zdCBzZWFyY2hQYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKGN1cnJlbnRVcmwpO1xuICAgICAgICAvLyBJZiBzZWFyY2hQYXJhbXMgZG9lcyBub3QgY29udGFpbiBhIHBhZ2UgdmFsdWUgdGhlbiBtb2RpZnkgdXJsIHF1ZXJ5IHN0cmluZyB0byBoYXZlIHBhZ2U9MVxuICAgICAgICBpZiAoIXNlYXJjaFBhcmFtcy5oYXMoJ3BhZ2UnKSkge1xuICAgICAgICAgICAgY29uc3QgbGlua1VybCA9ICQoJy5wYWdpbmF0aW9uLWxpbmsnKS5hdHRyKCdocmVmJyk7XG4gICAgICAgICAgICBjb25zdCByZSA9IC9wYWdlPVswLTldKy9pO1xuICAgICAgICAgICAgY29uc3QgdXBkYXRlZExpbmtVcmwgPSBsaW5rVXJsLnJlcGxhY2UocmUsICdwYWdlPTEnKTtcbiAgICAgICAgICAgIHdpbmRvdy5oaXN0b3J5LnJlcGxhY2VTdGF0ZSh7fSwgZG9jdW1lbnQudGl0bGUsIHVwZGF0ZWRMaW5rVXJsKTtcbiAgICAgICAgfVxuICAgICAgICAkKHdpbmRvdykudHJpZ2dlcignc3RhdGVjaGFuZ2UnKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEZhY2V0ZWRTZWFyY2g7XG4iLCJpbXBvcnQgVXJsIGZyb20gJ3VybCc7XG5cbmNvbnN0IHVybFV0aWxzID0ge1xuICAgIGdldFVybDogKCkgPT4gYCR7d2luZG93LmxvY2F0aW9uLnBhdGhuYW1lfSR7d2luZG93LmxvY2F0aW9uLnNlYXJjaH1gLFxuXG4gICAgZ29Ub1VybDogKHVybCkgPT4ge1xuICAgICAgICB3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUoe30sIGRvY3VtZW50LnRpdGxlLCB1cmwpO1xuICAgICAgICAkKHdpbmRvdykudHJpZ2dlcignc3RhdGVjaGFuZ2UnKTtcbiAgICB9LFxuXG4gICAgcmVwbGFjZVBhcmFtczogKHVybCwgcGFyYW1zKSA9PiB7XG4gICAgICAgIGNvbnN0IHBhcnNlZCA9IFVybC5wYXJzZSh1cmwsIHRydWUpO1xuICAgICAgICBsZXQgcGFyYW07XG5cbiAgICAgICAgLy8gTGV0IHRoZSBmb3JtYXR0ZXIgdXNlIHRoZSBxdWVyeSBvYmplY3QgdG8gYnVpbGQgdGhlIG5ldyB1cmxcbiAgICAgICAgcGFyc2VkLnNlYXJjaCA9IG51bGw7XG5cbiAgICAgICAgZm9yIChwYXJhbSBpbiBwYXJhbXMpIHtcbiAgICAgICAgICAgIGlmIChwYXJhbXMuaGFzT3duUHJvcGVydHkocGFyYW0pKSB7XG4gICAgICAgICAgICAgICAgcGFyc2VkLnF1ZXJ5W3BhcmFtXSA9IHBhcmFtc1twYXJhbV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gVXJsLmZvcm1hdChwYXJzZWQpO1xuICAgIH0sXG5cbiAgICBidWlsZFF1ZXJ5U3RyaW5nOiAocXVlcnlEYXRhKSA9PiB7XG4gICAgICAgIGxldCBvdXQgPSAnJztcbiAgICAgICAgbGV0IGtleTtcbiAgICAgICAgZm9yIChrZXkgaW4gcXVlcnlEYXRhKSB7XG4gICAgICAgICAgICBpZiAocXVlcnlEYXRhLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShxdWVyeURhdGFba2V5XSkpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5keDtcblxuICAgICAgICAgICAgICAgICAgICBmb3IgKG5keCBpbiBxdWVyeURhdGFba2V5XSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHF1ZXJ5RGF0YVtrZXldLmhhc093blByb3BlcnR5KG5keCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdXQgKz0gYCYke2tleX09JHtxdWVyeURhdGFba2V5XVtuZHhdfWA7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBvdXQgKz0gYCYke2tleX09JHtxdWVyeURhdGFba2V5XX1gO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBvdXQuc3Vic3RyaW5nKDEpO1xuICAgIH0sXG5cbiAgICBwYXJzZVF1ZXJ5UGFyYW1zOiAocXVlcnlEYXRhKSA9PiB7XG4gICAgICAgIGNvbnN0IHBhcmFtcyA9IHt9O1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcXVlcnlEYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCB0ZW1wID0gcXVlcnlEYXRhW2ldLnNwbGl0KCc9Jyk7XG5cbiAgICAgICAgICAgIGlmICh0ZW1wWzBdIGluIHBhcmFtcykge1xuICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHBhcmFtc1t0ZW1wWzBdXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcGFyYW1zW3RlbXBbMF1dLnB1c2godGVtcFsxXSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcGFyYW1zW3RlbXBbMF1dID0gW3BhcmFtc1t0ZW1wWzBdXSwgdGVtcFsxXV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBwYXJhbXNbdGVtcFswXV0gPSB0ZW1wWzFdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHBhcmFtcztcbiAgICB9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgdXJsVXRpbHM7XG4iLCJpbXBvcnQgeyBzaG93QWxlcnRNb2RhbCB9IGZyb20gJy4vbW9kYWwnO1xuXG5mdW5jdGlvbiBkZWNyZW1lbnRDb3VudGVyKGNvdW50ZXIsIGl0ZW0pIHtcbiAgICBjb25zdCBpbmRleCA9IGNvdW50ZXIuaW5kZXhPZihpdGVtKTtcblxuICAgIGlmIChpbmRleCA+IC0xKSB7XG4gICAgICAgIGNvdW50ZXIuc3BsaWNlKGluZGV4LCAxKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGluY3JlbWVudENvdW50ZXIoY291bnRlciwgaXRlbSkge1xuICAgIGNvdW50ZXIucHVzaChpdGVtKTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlQ291bnRlck5hdihjb3VudGVyLCAkbGluaywgdXJscykge1xuICAgIGlmIChjb3VudGVyLmxlbmd0aCAhPT0gMCkge1xuICAgICAgICBpZiAoISRsaW5rLmlzKCd2aXNpYmxlJykpIHtcbiAgICAgICAgICAgICRsaW5rLmFkZENsYXNzKCdzaG93Jyk7XG4gICAgICAgIH1cbiAgICAgICAgJGxpbmsuYXR0cignaHJlZicsIGAke3VybHMuY29tcGFyZX0vJHtjb3VudGVyLmpvaW4oJy8nKX1gKTtcbiAgICAgICAgJGxpbmsuZmluZCgnc3Bhbi5jb3VudFBpbGwnKS5odG1sKGNvdW50ZXIubGVuZ3RoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAkbGluay5yZW1vdmVDbGFzcygnc2hvdycpO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHsgbm9Db21wYXJlTWVzc2FnZSwgdXJscyB9KSB7XG4gICAgbGV0IGNvbXBhcmVDb3VudGVyID0gW107XG5cbiAgICBjb25zdCAkY29tcGFyZUxpbmsgPSAkKCdhW2RhdGEtY29tcGFyZS1uYXZdJyk7XG5cbiAgICAkKCdib2R5Jykub24oJ2NvbXBhcmVSZXNldCcsICgpID0+IHtcbiAgICAgICAgY29uc3QgJGNoZWNrZWQgPSAkKCdib2R5JykuZmluZCgnaW5wdXRbbmFtZT1cInByb2R1Y3RzXFxbXFxdXCJdOmNoZWNrZWQnKTtcblxuICAgICAgICBjb21wYXJlQ291bnRlciA9ICRjaGVja2VkLmxlbmd0aCA/ICRjaGVja2VkLm1hcCgoaW5kZXgsIGVsZW1lbnQpID0+IGVsZW1lbnQudmFsdWUpLmdldCgpIDogW107XG4gICAgICAgIHVwZGF0ZUNvdW50ZXJOYXYoY29tcGFyZUNvdW50ZXIsICRjb21wYXJlTGluaywgdXJscyk7XG4gICAgfSk7XG5cbiAgICAkKCdib2R5JykudHJpZ2dlckhhbmRsZXIoJ2NvbXBhcmVSZXNldCcpO1xuXG4gICAgJCgnYm9keScpLm9uKCdjbGljaycsICdbZGF0YS1jb21wYXJlLWlkXScsIGV2ZW50ID0+IHtcbiAgICAgICAgY29uc3QgcHJvZHVjdCA9IGV2ZW50LmN1cnJlbnRUYXJnZXQudmFsdWU7XG4gICAgICAgIGNvbnN0ICRjbGlja2VkQ29tcGFyZUxpbmsgPSAkKCdhW2RhdGEtY29tcGFyZS1uYXZdJyk7XG5cbiAgICAgICAgaWYgKGV2ZW50LmN1cnJlbnRUYXJnZXQuY2hlY2tlZCkge1xuICAgICAgICAgICAgaW5jcmVtZW50Q291bnRlcihjb21wYXJlQ291bnRlciwgcHJvZHVjdCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkZWNyZW1lbnRDb3VudGVyKGNvbXBhcmVDb3VudGVyLCBwcm9kdWN0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHVwZGF0ZUNvdW50ZXJOYXYoY29tcGFyZUNvdW50ZXIsICRjbGlja2VkQ29tcGFyZUxpbmssIHVybHMpO1xuICAgIH0pO1xuXG4gICAgJCgnYm9keScpLm9uKCdjbGljaycsICdhW2RhdGEtY29tcGFyZS1uYXZdJywgKCkgPT4ge1xuICAgICAgICBjb25zdCAkY2xpY2tlZENoZWNrZWRJbnB1dCA9ICQoJ2JvZHknKS5maW5kKCdpbnB1dFtuYW1lPVwicHJvZHVjdHNcXFtcXF1cIl06Y2hlY2tlZCcpO1xuXG4gICAgICAgIGlmICgkY2xpY2tlZENoZWNrZWRJbnB1dC5sZW5ndGggPD0gMSkge1xuICAgICAgICAgICAgc2hvd0FsZXJ0TW9kYWwobm9Db21wYXJlTWVzc2FnZSk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=