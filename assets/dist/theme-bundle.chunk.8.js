(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[8],{

/***/ "./assets/js/theme/cart.js":
/*!*********************************!*\
  !*** ./assets/js/theme/cart.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Cart; });
/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/debounce */ "./node_modules/lodash/debounce.js");
/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_debounce__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash_bind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/bind */ "./node_modules/lodash/bind.js");
/* harmony import */ var lodash_bind__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_bind__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _page_manager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./page-manager */ "./assets/js/theme/page-manager.js");
/* harmony import */ var _common_gift_certificate_validator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./common/gift-certificate-validator */ "./assets/js/theme/common/gift-certificate-validator.js");
/* harmony import */ var _common_utils_translations_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./common/utils/translations-utils */ "./assets/js/theme/common/utils/translations-utils.js");
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var _cart_shipping_estimator__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./cart/shipping-estimator */ "./assets/js/theme/cart/shipping-estimator.js");
/* harmony import */ var _global_modal__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./global/modal */ "./assets/js/theme/global/modal.js");
/* harmony import */ var _common_cart_item_details__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./common/cart-item-details */ "./assets/js/theme/common/cart-item-details.js");



function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }









var Cart = /*#__PURE__*/function (_PageManager) {
  _inheritsLoose(Cart, _PageManager);

  function Cart() {
    return _PageManager.apply(this, arguments) || this;
  }

  var _proto = Cart.prototype;

  _proto.onReady = function onReady() {
    this.$modal = null;
    this.$cartPageContent = $('[data-cart]');
    this.$cartContent = $('[data-cart-content]');
    this.$cartMessages = $('[data-cart-status]');
    this.$cartTotals = $('[data-cart-totals]');
    this.$cartAdditionalCheckoutBtns = $('[data-cart-additional-checkout-buttons]');
    this.$overlay = $('[data-cart] .loadingOverlay').hide(); // TODO: temporary until roper pulls in his cart components

    this.$activeCartItemId = null;
    this.$activeCartItemBtnAction = null;
    this.setApplePaySupport();
    this.bindEvents();
  };

  _proto.setApplePaySupport = function setApplePaySupport() {
    if (window.ApplePaySession) {
      this.$cartPageContent.addClass('apple-pay-supported');
    }
  };

  _proto.cartUpdate = function cartUpdate($target) {
    var _this = this;

    var itemId = $target.data('cartItemid');
    this.$activeCartItemId = itemId;
    this.$activeCartItemBtnAction = $target.data('action');
    var $el = $("#qty-" + itemId);
    var oldQty = parseInt($el.val(), 10);
    var maxQty = parseInt($el.data('quantityMax'), 10);
    var minQty = parseInt($el.data('quantityMin'), 10);
    var minError = $el.data('quantityMinError');
    var maxError = $el.data('quantityMaxError');
    var newQty = $target.data('action') === 'inc' ? oldQty + 1 : oldQty - 1; // Does not quality for min/max quantity

    if (newQty < minQty) {
      return Object(_global_modal__WEBPACK_IMPORTED_MODULE_7__["showAlertModal"])(minError);
    } else if (maxQty > 0 && newQty > maxQty) {
      return Object(_global_modal__WEBPACK_IMPORTED_MODULE_7__["showAlertModal"])(maxError);
    }

    this.$overlay.show();
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_5__["default"].api.cart.itemUpdate(itemId, newQty, function (err, response) {
      _this.$overlay.hide();

      if (response.data.status === 'succeed') {
        // if the quantity is changed "1" from "0", we have to remove the row.
        var remove = newQty === 0;

        _this.refreshContent(remove);
      } else {
        $el.val(oldQty);
        Object(_global_modal__WEBPACK_IMPORTED_MODULE_7__["showAlertModal"])(response.data.errors.join('\n'));
      }
    });
  };

  _proto.cartUpdateQtyTextChange = function cartUpdateQtyTextChange($target, preVal) {
    var _this2 = this;

    if (preVal === void 0) {
      preVal = null;
    }

    var itemId = $target.data('cartItemid');
    var $el = $("#qty-" + itemId);
    var maxQty = parseInt($el.data('quantityMax'), 10);
    var minQty = parseInt($el.data('quantityMin'), 10);
    var oldQty = preVal !== null ? preVal : minQty;
    var minError = $el.data('quantityMinError');
    var maxError = $el.data('quantityMaxError');
    var newQty = parseInt(Number($el.val()), 10);
    var invalidEntry; // Does not quality for min/max quantity

    if (!newQty) {
      invalidEntry = $el.val();
      $el.val(oldQty);
      return Object(_global_modal__WEBPACK_IMPORTED_MODULE_7__["showAlertModal"])(this.context.invalidEntryMessage.replace('[ENTRY]', invalidEntry));
    } else if (newQty < minQty) {
      $el.val(oldQty);
      return Object(_global_modal__WEBPACK_IMPORTED_MODULE_7__["showAlertModal"])(minError);
    } else if (maxQty > 0 && newQty > maxQty) {
      $el.val(oldQty);
      return Object(_global_modal__WEBPACK_IMPORTED_MODULE_7__["showAlertModal"])(maxError);
    }

    this.$overlay.show();
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_5__["default"].api.cart.itemUpdate(itemId, newQty, function (err, response) {
      _this2.$overlay.hide();

      if (response.data.status === 'succeed') {
        // if the quantity is changed "1" from "0", we have to remove the row.
        var remove = newQty === 0;

        _this2.refreshContent(remove);
      } else {
        $el.val(oldQty);
        return Object(_global_modal__WEBPACK_IMPORTED_MODULE_7__["showAlertModal"])(response.data.errors.join('\n'));
      }
    });
  };

  _proto.cartRemoveItem = function cartRemoveItem(itemId) {
    var _this3 = this;

    this.$overlay.show();
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_5__["default"].api.cart.itemRemove(itemId, function (err, response) {
      if (response.data.status === 'succeed') {
        _this3.refreshContent(true);
      } else {
        _this3.$overlay.hide();

        Object(_global_modal__WEBPACK_IMPORTED_MODULE_7__["showAlertModal"])(response.data.errors.join('\n'));
      }
    });
  };

  _proto.cartEditOptions = function cartEditOptions(itemId, productId) {
    var _this4 = this;

    var context = Object.assign({
      productForChangeId: productId
    }, this.context);
    var modal = Object(_global_modal__WEBPACK_IMPORTED_MODULE_7__["defaultModal"])();

    if (this.$modal === null) {
      this.$modal = $('#modal');
    }

    var options = {
      template: 'cart/modals/configure-product'
    };
    modal.open();
    this.$modal.find('.modal-content').addClass('hide-content');
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_5__["default"].api.productAttributes.configureInCart(itemId, options, function (err, response) {
      modal.updateContent(response.content);

      var optionChangeHandler = function optionChangeHandler() {
        var $productOptionsContainer = $('[data-product-attributes-wrapper]', _this4.$modal);
        var modalBodyReservedHeight = $productOptionsContainer.outerHeight();

        if ($productOptionsContainer.length && modalBodyReservedHeight) {
          $productOptionsContainer.css('height', modalBodyReservedHeight);
        }
      };

      if (_this4.$modal.hasClass('open')) {
        optionChangeHandler();
      } else {
        _this4.$modal.one(_global_modal__WEBPACK_IMPORTED_MODULE_7__["ModalEvents"].opened, optionChangeHandler);
      }

      _this4.productDetails = new _common_cart_item_details__WEBPACK_IMPORTED_MODULE_8__["default"](_this4.$modal, context);

      _this4.bindGiftWrappingForm();
    });
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_5__["default"].hooks.on('product-option-change', function (event, currentTarget) {
      var $form = $(currentTarget).find('form');
      var $submit = $('input.button', $form);
      var $messageBox = $('.alertMessageBox');
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_5__["default"].api.productAttributes.optionChange(productId, $form.serialize(), function (err, result) {
        var data = result.data || {};

        if (err) {
          Object(_global_modal__WEBPACK_IMPORTED_MODULE_7__["showAlertModal"])(err);
          return false;
        }

        if (data.purchasing_message) {
          $('p.alertBox-message', $messageBox).text(data.purchasing_message);
          $submit.prop('disabled', true);
          $messageBox.show();
        } else {
          $submit.prop('disabled', false);
          $messageBox.hide();
        }

        if (!data.purchasable || !data.instock) {
          $submit.prop('disabled', true);
        } else {
          $submit.prop('disabled', false);
        }
      });
    });
  };

  _proto.refreshContent = function refreshContent(remove) {
    var _this5 = this;

    var $cartItemsRows = $('[data-item-row]', this.$cartContent);
    var $cartPageTitle = $('[data-cart-page-title]');
    var options = {
      template: {
        content: 'cart/content',
        totals: 'cart/totals',
        pageTitle: 'cart/page-title',
        statusMessages: 'cart/status-messages',
        additionalCheckoutButtons: 'cart/additional-checkout-buttons'
      }
    };
    this.$overlay.show(); // Remove last item from cart? Reload

    if (remove && $cartItemsRows.length === 1) {
      return window.location.reload();
    }

    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_5__["default"].api.cart.getContent(options, function (err, response) {
      _this5.$cartContent.html(response.content);

      _this5.$cartTotals.html(response.totals);

      _this5.$cartMessages.html(response.statusMessages);

      _this5.$cartAdditionalCheckoutBtns.html(response.additionalCheckoutButtons);

      $cartPageTitle.replaceWith(response.pageTitle);

      _this5.bindEvents();

      _this5.$overlay.hide();

      var quantity = $('[data-cart-quantity]', _this5.$cartContent).data('cartQuantity') || 0;
      $('body').trigger('cart-quantity-update', quantity);
      $("[data-cart-itemid='" + _this5.$activeCartItemId + "']", _this5.$cartContent).filter("[data-action='" + _this5.$activeCartItemBtnAction + "']").trigger('focus');
    });
  };

  _proto.bindCartEvents = function bindCartEvents() {
    var _this6 = this;

    var debounceTimeout = 400;

    var cartUpdate = lodash_bind__WEBPACK_IMPORTED_MODULE_1___default()(lodash_debounce__WEBPACK_IMPORTED_MODULE_0___default()(this.cartUpdate, debounceTimeout), this);

    var cartUpdateQtyTextChange = lodash_bind__WEBPACK_IMPORTED_MODULE_1___default()(lodash_debounce__WEBPACK_IMPORTED_MODULE_0___default()(this.cartUpdateQtyTextChange, debounceTimeout), this);

    var cartRemoveItem = lodash_bind__WEBPACK_IMPORTED_MODULE_1___default()(lodash_debounce__WEBPACK_IMPORTED_MODULE_0___default()(this.cartRemoveItem, debounceTimeout), this);

    var preVal; // cart update

    $('[data-cart-update]', this.$cartContent).on('click', function (event) {
      var $target = $(event.currentTarget);
      event.preventDefault(); // update cart quantity

      cartUpdate($target);
    }); // cart qty manually updates

    $('.cart-item-qty-input', this.$cartContent).on('focus', function onQtyFocus() {
      preVal = this.value;
    }).change(function (event) {
      var $target = $(event.currentTarget);
      event.preventDefault(); // update cart quantity

      cartUpdateQtyTextChange($target, preVal);
    });
    $('.cart-remove', this.$cartContent).on('click', function (event) {
      var itemId = $(event.currentTarget).data('cartItemid');
      var string = $(event.currentTarget).data('confirmDelete');
      Object(_global_modal__WEBPACK_IMPORTED_MODULE_7__["showAlertModal"])(string, {
        icon: 'warning',
        showCancelButton: true,
        onConfirm: function onConfirm() {
          // remove item from cart
          cartRemoveItem(itemId);
        }
      });
      event.preventDefault();
    });
    $('[data-item-edit]', this.$cartContent).on('click', function (event) {
      var itemId = $(event.currentTarget).data('itemEdit');
      var productId = $(event.currentTarget).data('productId');
      event.preventDefault(); // edit item in cart

      _this6.cartEditOptions(itemId, productId);
    });
  };

  _proto.bindPromoCodeEvents = function bindPromoCodeEvents() {
    var _this7 = this;

    var $couponContainer = $('.coupon-code');
    var $couponForm = $('.coupon-form');
    var $codeInput = $('[name="couponcode"]', $couponForm);
    $('.coupon-code-add').on('click', function (event) {
      event.preventDefault();
      $(event.currentTarget).hide();
      $couponContainer.show();
      $('.coupon-code-cancel').show();
      $codeInput.trigger('focus');
    });
    $('.coupon-code-cancel').on('click', function (event) {
      event.preventDefault();
      $couponContainer.hide();
      $('.coupon-code-cancel').hide();
      $('.coupon-code-add').show();
    });
    $couponForm.on('submit', function (event) {
      var code = $codeInput.val();
      event.preventDefault(); // Empty code

      if (!code) {
        return Object(_global_modal__WEBPACK_IMPORTED_MODULE_7__["showAlertModal"])($codeInput.data('error'));
      }

      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_5__["default"].api.cart.applyCode(code, function (err, response) {
        if (response.data.status === 'success') {
          _this7.refreshContent();
        } else {
          Object(_global_modal__WEBPACK_IMPORTED_MODULE_7__["showAlertModal"])(response.data.errors.join('\n'));
        }
      });
    });
  };

  _proto.bindGiftCertificateEvents = function bindGiftCertificateEvents() {
    var _this8 = this;

    var $certContainer = $('.gift-certificate-code');
    var $certForm = $('.cart-gift-certificate-form');
    var $certInput = $('[name="certcode"]', $certForm);
    $('.gift-certificate-add').on('click', function (event) {
      event.preventDefault();
      $(event.currentTarget).toggle();
      $certContainer.toggle();
      $('.gift-certificate-cancel').toggle();
    });
    $('.gift-certificate-cancel').on('click', function (event) {
      event.preventDefault();
      $certContainer.toggle();
      $('.gift-certificate-add').toggle();
      $('.gift-certificate-cancel').toggle();
    });
    $certForm.on('submit', function (event) {
      var code = $certInput.val();
      event.preventDefault();

      if (!Object(_common_gift_certificate_validator__WEBPACK_IMPORTED_MODULE_3__["default"])(code)) {
        var validationDictionary = Object(_common_utils_translations_utils__WEBPACK_IMPORTED_MODULE_4__["createTranslationDictionary"])(_this8.context);
        return Object(_global_modal__WEBPACK_IMPORTED_MODULE_7__["showAlertModal"])(validationDictionary.invalid_gift_certificate);
      }

      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_5__["default"].api.cart.applyGiftCertificate(code, function (err, resp) {
        if (resp.data.status === 'success') {
          _this8.refreshContent();
        } else {
          Object(_global_modal__WEBPACK_IMPORTED_MODULE_7__["showAlertModal"])(resp.data.errors.join('\n'));
        }
      });
    });
  };

  _proto.bindGiftWrappingEvents = function bindGiftWrappingEvents() {
    var _this9 = this;

    var modal = Object(_global_modal__WEBPACK_IMPORTED_MODULE_7__["defaultModal"])();
    $('[data-item-giftwrap]').on('click', function (event) {
      var itemId = $(event.currentTarget).data('itemGiftwrap');
      var options = {
        template: 'cart/modals/gift-wrapping-form'
      };
      event.preventDefault();
      modal.open();
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_5__["default"].api.cart.getItemGiftWrappingOptions(itemId, options, function (err, response) {
        modal.updateContent(response.content);

        _this9.bindGiftWrappingForm();
      });
    });
  };

  _proto.bindGiftWrappingForm = function bindGiftWrappingForm() {
    $('.giftWrapping-select').on('change', function (event) {
      var $select = $(event.currentTarget);
      var id = $select.val();
      var index = $select.data('index');

      if (!id) {
        return;
      }

      var allowMessage = $select.find("option[value=" + id + "]").data('allowMessage');
      $(".giftWrapping-image-" + index).hide();
      $("#giftWrapping-image-" + index + "-" + id).show();

      if (allowMessage) {
        $("#giftWrapping-message-" + index).show();
      } else {
        $("#giftWrapping-message-" + index).hide();
      }
    });
    $('.giftWrapping-select').trigger('change');

    function toggleViews() {
      var value = $('input:radio[name ="giftwraptype"]:checked').val();
      var $singleForm = $('.giftWrapping-single');
      var $multiForm = $('.giftWrapping-multiple');

      if (value === 'same') {
        $singleForm.show();
        $multiForm.hide();
      } else {
        $singleForm.hide();
        $multiForm.show();
      }
    }

    $('[name="giftwraptype"]').on('click', toggleViews);
    toggleViews();
  };

  _proto.bindEvents = function bindEvents() {
    this.bindCartEvents();
    this.bindPromoCodeEvents();
    this.bindGiftWrappingEvents();
    this.bindGiftCertificateEvents(); // initiate shipping estimator module

    var shippingErrorMessages = {
      country: this.context.shippingCountryErrorMessage,
      province: this.context.shippingProvinceErrorMessage
    };
    this.shippingEstimator = new _cart_shipping_estimator__WEBPACK_IMPORTED_MODULE_6__["default"]($('[data-shipping-estimator]'), shippingErrorMessages);
  };

  return Cart;
}(_page_manager__WEBPACK_IMPORTED_MODULE_2__["default"]);


/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ }),

/***/ "./assets/js/theme/cart/shipping-estimator.js":
/*!****************************************************!*\
  !*** ./assets/js/theme/cart/shipping-estimator.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ShippingEstimator; });
/* harmony import */ var _common_state_country__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/state-country */ "./assets/js/theme/common/state-country.js");
/* harmony import */ var _common_nod__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/nod */ "./assets/js/theme/common/nod.js");
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../common/utils/form-utils */ "./assets/js/theme/common/utils/form-utils.js");
/* harmony import */ var _common_collapsible__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../common/collapsible */ "./assets/js/theme/common/collapsible.js");
/* harmony import */ var _global_modal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../global/modal */ "./assets/js/theme/global/modal.js");







var ShippingEstimator = /*#__PURE__*/function () {
  function ShippingEstimator($element, shippingErrorMessages) {
    this.$element = $element;
    this.$state = $('[data-field-type="State"]', this.$element);
    this.isEstimatorFormOpened = false;
    this.shippingErrorMessages = shippingErrorMessages;
    this.initFormValidation();
    this.bindStateCountryChange();
    this.bindEstimatorEvents();
  }

  var _proto = ShippingEstimator.prototype;

  _proto.initFormValidation = function initFormValidation() {
    var _this = this;

    var shippingEstimatorAlert = $('.shipping-quotes');
    this.shippingEstimator = 'form[data-shipping-estimator]';
    this.shippingValidator = Object(_common_nod__WEBPACK_IMPORTED_MODULE_1__["default"])({
      submit: this.shippingEstimator + " .shipping-estimate-submit",
      tap: _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_3__["announceInputErrorMessage"]
    });
    $('.shipping-estimate-submit', this.$element).on('click', function (event) {
      // estimator error messages are being injected in html as a result
      // of user submit; clearing and adding role on submit provides
      // regular announcement of these error messages
      if (shippingEstimatorAlert.attr('role')) {
        shippingEstimatorAlert.removeAttr('role');
      }

      shippingEstimatorAlert.attr('role', 'alert'); // When switching between countries, the state/region is dynamic
      // Only perform a check for all fields when country has a value
      // Otherwise areAll('valid') will check country for validity

      if ($(_this.shippingEstimator + " select[name=\"shipping-country\"]").val()) {
        _this.shippingValidator.performCheck();
      }

      if (_this.shippingValidator.areAll('valid')) {
        return;
      }

      event.preventDefault();
    });
    this.bindValidation();
    this.bindStateValidation();
    this.bindUPSRates();
  };

  _proto.bindValidation = function bindValidation() {
    this.shippingValidator.add([{
      selector: this.shippingEstimator + " select[name=\"shipping-country\"]",
      validate: function validate(cb, val) {
        var countryId = Number(val);
        var result = countryId !== 0 && !Number.isNaN(countryId);
        cb(result);
      },
      errorMessage: this.shippingErrorMessages.country
    }]);
  };

  _proto.bindStateValidation = function bindStateValidation() {
    var _this2 = this;

    this.shippingValidator.add([{
      selector: $(this.shippingEstimator + " select[name=\"shipping-state\"]"),
      validate: function validate(cb) {
        var result;
        var $ele = $(_this2.shippingEstimator + " select[name=\"shipping-state\"]");

        if ($ele.length) {
          var eleVal = $ele.val();
          result = eleVal && eleVal.length && eleVal !== 'State/province';
        }

        cb(result);
      },
      errorMessage: this.shippingErrorMessages.province
    }]);
  }
  /**
   * Toggle between default shipping and ups shipping rates
   */
  ;

  _proto.bindUPSRates = function bindUPSRates() {
    var UPSRateToggle = '.estimator-form-toggleUPSRate';
    $('body').on('click', UPSRateToggle, function (event) {
      var $estimatorFormUps = $('.estimator-form--ups');
      var $estimatorFormDefault = $('.estimator-form--default');
      event.preventDefault();
      $estimatorFormUps.toggleClass('u-hiddenVisually');
      $estimatorFormDefault.toggleClass('u-hiddenVisually');
    });
  };

  _proto.bindStateCountryChange = function bindStateCountryChange() {
    var _this3 = this;

    var $last; // Requests the states for a country with AJAX

    Object(_common_state_country__WEBPACK_IMPORTED_MODULE_0__["default"])(this.$state, this.context, {
      useIdForStates: true
    }, function (err, field) {
      if (err) {
        Object(_global_modal__WEBPACK_IMPORTED_MODULE_5__["showAlertModal"])(err);
        throw new Error(err);
      }

      var $field = $(field);

      if (_this3.shippingValidator.getStatus(_this3.$state) !== 'undefined') {
        _this3.shippingValidator.remove(_this3.$state);
      }

      if ($last) {
        _this3.shippingValidator.remove($last);
      }

      if ($field.is('select')) {
        $last = field;

        _this3.bindStateValidation();
      } else {
        $field.attr('placeholder', 'State/province');
        _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_3__["Validators"].cleanUpStateValidation(field);
      } // When you change a country, you swap the state/province between an input and a select dropdown
      // Not all countries require the province to be filled
      // We have to remove this class when we swap since nod validation doesn't cleanup for us


      $(_this3.shippingEstimator).find('.form-field--success').removeClass('form-field--success');
    });
  };

  _proto.toggleEstimatorFormState = function toggleEstimatorFormState(toggleButton, buttonSelector, $toggleContainer) {
    var changeAttributesOnToggle = function changeAttributesOnToggle(selectorToActivate) {
      $(toggleButton).attr('aria-labelledby', selectorToActivate);
      $(buttonSelector).text($("#" + selectorToActivate).text());
    };

    if (!this.isEstimatorFormOpened) {
      changeAttributesOnToggle('estimator-close');
      $toggleContainer.removeClass('u-hidden');
    } else {
      changeAttributesOnToggle('estimator-add');
      $toggleContainer.addClass('u-hidden');
    }

    this.isEstimatorFormOpened = !this.isEstimatorFormOpened;
  };

  _proto.bindEstimatorEvents = function bindEstimatorEvents() {
    var _this4 = this;

    var $estimatorContainer = $('.shipping-estimator');
    var $estimatorForm = $('.estimator-form');
    Object(_common_collapsible__WEBPACK_IMPORTED_MODULE_4__["default"])();
    $estimatorForm.on('submit', function (event) {
      var params = {
        country_id: $('[name="shipping-country"]', $estimatorForm).val(),
        state_id: $('[name="shipping-state"]', $estimatorForm).val(),
        city: $('[name="shipping-city"]', $estimatorForm).val(),
        zip_code: $('[name="shipping-zip"]', $estimatorForm).val()
      };
      event.preventDefault();
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_2__["default"].api.cart.getShippingQuotes(params, 'cart/shipping-quotes', function (err, response) {
        $('.shipping-quotes').html(response.content); // bind the select button

        $('.select-shipping-quote').on('click', function (clickEvent) {
          var quoteId = $('.shipping-quote:checked').val();
          clickEvent.preventDefault();
          _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_2__["default"].api.cart.submitShippingQuote(quoteId, function () {
            window.location.reload();
          });
        });
      });
    });
    $('.shipping-estimate-show').on('click', function (event) {
      event.preventDefault();

      _this4.toggleEstimatorFormState(event.currentTarget, '.shipping-estimate-show__btn-name', $estimatorContainer);
    });
  };

  return ShippingEstimator;
}();


/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ }),

/***/ "./assets/js/theme/common/cart-item-details.js":
/*!*****************************************************!*\
  !*** ./assets/js/theme/common/cart-item-details.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CartItemDetails; });
/* harmony import */ var lodash_isEmpty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/isEmpty */ "./node_modules/lodash/isEmpty.js");
/* harmony import */ var lodash_isEmpty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_isEmpty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var _product_details_base__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./product-details-base */ "./assets/js/theme/common/product-details-base.js");
/* harmony import */ var _utils_ie_helpers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/ie-helpers */ "./assets/js/theme/common/utils/ie-helpers.js");


function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }





var CartItemDetails = /*#__PURE__*/function (_ProductDetailsBase) {
  _inheritsLoose(CartItemDetails, _ProductDetailsBase);

  function CartItemDetails($scope, context, productAttributesData) {
    var _this;

    if (productAttributesData === void 0) {
      productAttributesData = {};
    }

    _this = _ProductDetailsBase.call(this, $scope, context) || this;
    var $form = $('#CartEditProductFieldsForm', _this.$scope);
    var $productOptionsElement = $('[data-product-attributes-wrapper]', $form);
    var hasOptions = $productOptionsElement.html().trim().length;
    var hasDefaultOptions = $productOptionsElement.find('[data-default]').length;
    $productOptionsElement.on('change', function () {
      _this.setProductVariant();
    });
    var optionChangeCallback = _product_details_base__WEBPACK_IMPORTED_MODULE_2__["optionChangeDecorator"].call(_assertThisInitialized(_this), hasDefaultOptions); // Update product attributes. Also update the initial view in case items are oos
    // or have default variant properties that change the view

    if ((lodash_isEmpty__WEBPACK_IMPORTED_MODULE_0___default()(productAttributesData) || hasDefaultOptions) && hasOptions) {
      var productId = _this.context.productForChangeId;
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_1__["default"].api.productAttributes.optionChange(productId, $form.serialize(), 'products/bulk-discount-rates', optionChangeCallback);
    } else {
      _this.updateProductAttributes(productAttributesData);
    }

    return _this;
  }

  var _proto = CartItemDetails.prototype;

  _proto.setProductVariant = function setProductVariant() {
    var unsatisfiedRequiredFields = [];
    var options = [];
    $.each($('[data-product-attribute]'), function (index, value) {
      var optionLabel = value.children[0].innerText;
      var optionTitle = optionLabel.split(':')[0].trim();
      var required = optionLabel.toLowerCase().includes('required');
      var type = value.getAttribute('data-product-attribute');

      if ((type === 'input-file' || type === 'input-text' || type === 'input-number') && value.querySelector('input').value === '' && required) {
        unsatisfiedRequiredFields.push(value);
      }

      if (type === 'textarea' && value.querySelector('textarea').value === '' && required) {
        unsatisfiedRequiredFields.push(value);
      }

      if (type === 'date') {
        var isSatisfied = Array.from(value.querySelectorAll('select')).every(function (select) {
          return select.selectedIndex !== 0;
        });

        if (isSatisfied) {
          var dateString = Array.from(value.querySelectorAll('select')).map(function (x) {
            return x.value;
          }).join('-');
          options.push(optionTitle + ":" + dateString);
          return;
        }

        if (required) {
          unsatisfiedRequiredFields.push(value);
        }
      }

      if (type === 'set-select') {
        var select = value.querySelector('select');
        var selectedIndex = select.selectedIndex;

        if (selectedIndex !== 0) {
          options.push(optionTitle + ":" + select.options[selectedIndex].innerText);
          return;
        }

        if (required) {
          unsatisfiedRequiredFields.push(value);
        }
      }

      if (type === 'set-rectangle' || type === 'set-radio' || type === 'swatch' || type === 'input-checkbox' || type === 'product-list') {
        var checked = value.querySelector(':checked');

        if (checked) {
          var getSelectedOptionLabel = function getSelectedOptionLabel() {
            var productVariantslist = Object(_utils_ie_helpers__WEBPACK_IMPORTED_MODULE_3__["convertIntoArray"])(value.children);

            var matchLabelForCheckedInput = function matchLabelForCheckedInput(inpt) {
              return inpt.dataset.productAttributeValue === checked.value;
            };

            return productVariantslist.filter(matchLabelForCheckedInput)[0];
          };

          if (type === 'set-rectangle' || type === 'set-radio' || type === 'product-list') {
            var label = _utils_ie_helpers__WEBPACK_IMPORTED_MODULE_3__["isBrowserIE"] ? getSelectedOptionLabel().innerText.trim() : checked.labels[0].innerText;

            if (label) {
              options.push(optionTitle + ":" + label);
            }
          }

          if (type === 'swatch') {
            var _label = _utils_ie_helpers__WEBPACK_IMPORTED_MODULE_3__["isBrowserIE"] ? getSelectedOptionLabel().children[0] : checked.labels[0].children[0];

            if (_label) {
              options.push(optionTitle + ":" + _label.title);
            }
          }

          if (type === 'input-checkbox') {
            options.push(optionTitle + ":Yes");
          }

          return;
        }

        if (type === 'input-checkbox') {
          options.push(optionTitle + ":No");
        }

        if (required) {
          unsatisfiedRequiredFields.push(value);
        }
      }
    });
    var productVariant = unsatisfiedRequiredFields.length === 0 ? options.sort().join(', ') : 'unsatisfied';
    var view = $('.modal-header-title');

    if (productVariant) {
      productVariant = productVariant === 'unsatisfied' ? '' : productVariant;

      if (view.attr('data-event-type')) {
        view.attr('data-product-variant', productVariant);
      } else {
        var productName = view.html().match(/'(.*?)'/)[1];
        var card = $("[data-name=\"" + productName + "\"]");
        card.attr('data-product-variant', productVariant);
      }
    }
  }
  /**
   * Hide or mark as unavailable out of stock attributes if enabled
   * @param  {Object} data Product attribute data
   */
  ;

  _proto.updateProductAttributes = function updateProductAttributes(data) {
    _ProductDetailsBase.prototype.updateProductAttributes.call(this, data);

    this.$scope.find('.modal-content').removeClass('hide-content');
  };

  return CartItemDetails;
}(_product_details_base__WEBPACK_IMPORTED_MODULE_2__["default"]);


/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ }),

/***/ "./assets/js/theme/common/gift-certificate-validator.js":
/*!**************************************************************!*\
  !*** ./assets/js/theme/common/gift-certificate-validator.js ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function (cert) {
  if (typeof cert !== 'string' || cert.length === 0) {
    return false;
  } // Add any custom gift certificate validation logic here


  return true;
});

/***/ }),

/***/ "./assets/js/theme/common/state-country.js":
/*!*************************************************!*\
  !*** ./assets/js/theme/common/state-country.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var lodash_isEmpty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/isEmpty */ "./node_modules/lodash/isEmpty.js");
/* harmony import */ var lodash_isEmpty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_isEmpty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash_transform__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/transform */ "./node_modules/lodash/transform.js");
/* harmony import */ var lodash_transform__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_transform__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var _utils_form_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/form-utils */ "./assets/js/theme/common/utils/form-utils.js");
/* harmony import */ var _global_modal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../global/modal */ "./assets/js/theme/global/modal.js");





/**
 * If there are no options from bcapp, a text field will be sent. This will create a select element to hold options after the remote request.
 * @returns {jQuery|HTMLElement}
 */

function makeStateRequired(stateElement, context) {
  var attrs = lodash_transform__WEBPACK_IMPORTED_MODULE_1___default()(stateElement.prop('attributes'), function (result, item) {
    var ret = result;
    ret[item.name] = item.value;
    return ret;
  });

  var replacementAttributes = {
    id: attrs.id,
    'data-label': attrs['data-label'],
    "class": 'form-select',
    name: attrs.name,
    'data-field-type': attrs['data-field-type']
  };
  stateElement.replaceWith($('<select></select>', replacementAttributes));
  var $newElement = $('[data-field-type="State"]');
  var $hiddenInput = $('[name*="FormFieldIsText"]');

  if ($hiddenInput.length !== 0) {
    $hiddenInput.remove();
  }

  if ($newElement.prev().find('small').length === 0) {
    // String is injected from localizer
    $newElement.prev().append("<small>" + context.required + "</small>");
  } else {
    $newElement.prev().find('small').show();
  }

  return $newElement;
}
/**
 * If a country with states is the default, a select will be sent,
 * In this case we need to be able to switch to an input field and hide the required field
 */


function makeStateOptional(stateElement) {
  var attrs = lodash_transform__WEBPACK_IMPORTED_MODULE_1___default()(stateElement.prop('attributes'), function (result, item) {
    var ret = result;
    ret[item.name] = item.value;
    return ret;
  });

  var replacementAttributes = {
    type: 'text',
    id: attrs.id,
    'data-label': attrs['data-label'],
    "class": 'form-input',
    name: attrs.name,
    'data-field-type': attrs['data-field-type']
  };
  stateElement.replaceWith($('<input />', replacementAttributes));
  var $newElement = $('[data-field-type="State"]');

  if ($newElement.length !== 0) {
    Object(_utils_form_utils__WEBPACK_IMPORTED_MODULE_3__["insertStateHiddenField"])($newElement);
    $newElement.prev().find('small').hide();
  }

  return $newElement;
}
/**
 * Adds the array of options from the remote request to the newly created select box.
 * @param {Object} statesArray
 * @param {jQuery} $selectElement
 * @param {Object} options
 */


function addOptions(statesArray, $selectElement, options) {
  var container = [];
  container.push("<option value=\"\">" + statesArray.prefix + "</option>");

  if (!lodash_isEmpty__WEBPACK_IMPORTED_MODULE_0___default()($selectElement)) {
    statesArray.states.forEach(function (stateObj) {
      if (options.useIdForStates) {
        container.push("<option value=\"" + stateObj.id + "\">" + stateObj.name + "</option>");
      } else {
        container.push("<option value=\"" + stateObj.name + "\">" + (stateObj.label ? stateObj.label : stateObj.name) + "</option>");
      }
    });
    $selectElement.html(container.join(' '));
  }
}
/**
 *
 * @param {jQuery} stateElement
 * @param {Object} context
 * @param {Object} options
 * @param {Function} callback
 */


/* harmony default export */ __webpack_exports__["default"] = (function (stateElement, context, options, callback) {
  if (context === void 0) {
    context = {};
  }

  /**
   * Backwards compatible for three parameters instead of four
   *
   * Available options:
   *
   * useIdForStates {Bool} - Generates states dropdown using id for values instead of strings
   */
  if (typeof options === 'function') {
    /* eslint-disable no-param-reassign */
    callback = options;
    options = {};
    /* eslint-enable no-param-reassign */
  }

  $('select[data-field-type="Country"]').on('change', function (event) {
    var countryName = $(event.currentTarget).val();

    if (countryName === '') {
      return;
    }

    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_2__["default"].api.country.getByName(countryName, function (err, response) {
      if (err) {
        Object(_global_modal__WEBPACK_IMPORTED_MODULE_4__["showAlertModal"])(context.state_error);
        return callback(err);
      }

      var $currentInput = $('[data-field-type="State"]');

      if (!lodash_isEmpty__WEBPACK_IMPORTED_MODULE_0___default()(response.data.states)) {
        // The element may have been replaced with a select, reselect it
        var $selectElement = makeStateRequired($currentInput, context);
        addOptions(response.data, $selectElement, options);
        callback(null, $selectElement);
      } else {
        var newElement = makeStateOptional($currentInput, context);
        callback(null, newElement);
      }
    });
  });
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ }),

/***/ "./assets/js/theme/common/utils/translations-utils.js":
/*!************************************************************!*\
  !*** ./assets/js/theme/common/utils/translations-utils.js ***!
  \************************************************************/
/*! exports provided: createTranslationDictionary */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createTranslationDictionary", function() { return createTranslationDictionary; });
var TRANSLATIONS = 'translations';

var isTranslationDictionaryNotEmpty = function isTranslationDictionaryNotEmpty(dictionary) {
  return !!Object.keys(dictionary[TRANSLATIONS]).length;
};

var chooseActiveDictionary = function chooseActiveDictionary() {
  for (var i = 0; i < arguments.length; i++) {
    var dictionary = JSON.parse(i < 0 || arguments.length <= i ? undefined : arguments[i]);

    if (isTranslationDictionaryNotEmpty(dictionary)) {
      return dictionary;
    }
  }
};
/**
 * defines Translation Dictionary to use
 * @param context provides access to 3 validation JSONs from en.json:
 * validation_messages, validation_fallback_messages and default_messages
 * @returns {Object}
 */


var createTranslationDictionary = function createTranslationDictionary(context) {
  var validationDictionaryJSON = context.validationDictionaryJSON,
      validationFallbackDictionaryJSON = context.validationFallbackDictionaryJSON,
      validationDefaultDictionaryJSON = context.validationDefaultDictionaryJSON;
  var activeDictionary = chooseActiveDictionary(validationDictionaryJSON, validationFallbackDictionaryJSON, validationDefaultDictionaryJSON);
  var localizations = Object.values(activeDictionary[TRANSLATIONS]);
  var translationKeys = Object.keys(activeDictionary[TRANSLATIONS]).map(function (key) {
    return key.split('.').pop();
  });
  return translationKeys.reduce(function (acc, key, i) {
    acc[key] = localizations[i];
    return acc;
  }, {});
};

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvY2FydC5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvY2FydC9zaGlwcGluZy1lc3RpbWF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL3RoZW1lL2NvbW1vbi9jYXJ0LWl0ZW0tZGV0YWlscy5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvY29tbW9uL2dpZnQtY2VydGlmaWNhdGUtdmFsaWRhdG9yLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy90aGVtZS9jb21tb24vc3RhdGUtY291bnRyeS5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvY29tbW9uL3V0aWxzL3RyYW5zbGF0aW9ucy11dGlscy5qcyJdLCJuYW1lcyI6WyJDYXJ0Iiwib25SZWFkeSIsIiRtb2RhbCIsIiRjYXJ0UGFnZUNvbnRlbnQiLCIkIiwiJGNhcnRDb250ZW50IiwiJGNhcnRNZXNzYWdlcyIsIiRjYXJ0VG90YWxzIiwiJGNhcnRBZGRpdGlvbmFsQ2hlY2tvdXRCdG5zIiwiJG92ZXJsYXkiLCJoaWRlIiwiJGFjdGl2ZUNhcnRJdGVtSWQiLCIkYWN0aXZlQ2FydEl0ZW1CdG5BY3Rpb24iLCJzZXRBcHBsZVBheVN1cHBvcnQiLCJiaW5kRXZlbnRzIiwid2luZG93IiwiQXBwbGVQYXlTZXNzaW9uIiwiYWRkQ2xhc3MiLCJjYXJ0VXBkYXRlIiwiJHRhcmdldCIsIml0ZW1JZCIsImRhdGEiLCIkZWwiLCJvbGRRdHkiLCJwYXJzZUludCIsInZhbCIsIm1heFF0eSIsIm1pblF0eSIsIm1pbkVycm9yIiwibWF4RXJyb3IiLCJuZXdRdHkiLCJzaG93QWxlcnRNb2RhbCIsInNob3ciLCJ1dGlscyIsImFwaSIsImNhcnQiLCJpdGVtVXBkYXRlIiwiZXJyIiwicmVzcG9uc2UiLCJzdGF0dXMiLCJyZW1vdmUiLCJyZWZyZXNoQ29udGVudCIsImVycm9ycyIsImpvaW4iLCJjYXJ0VXBkYXRlUXR5VGV4dENoYW5nZSIsInByZVZhbCIsIk51bWJlciIsImludmFsaWRFbnRyeSIsImNvbnRleHQiLCJpbnZhbGlkRW50cnlNZXNzYWdlIiwicmVwbGFjZSIsImNhcnRSZW1vdmVJdGVtIiwiaXRlbVJlbW92ZSIsImNhcnRFZGl0T3B0aW9ucyIsInByb2R1Y3RJZCIsInByb2R1Y3RGb3JDaGFuZ2VJZCIsIm1vZGFsIiwiZGVmYXVsdE1vZGFsIiwib3B0aW9ucyIsInRlbXBsYXRlIiwib3BlbiIsImZpbmQiLCJwcm9kdWN0QXR0cmlidXRlcyIsImNvbmZpZ3VyZUluQ2FydCIsInVwZGF0ZUNvbnRlbnQiLCJjb250ZW50Iiwib3B0aW9uQ2hhbmdlSGFuZGxlciIsIiRwcm9kdWN0T3B0aW9uc0NvbnRhaW5lciIsIm1vZGFsQm9keVJlc2VydmVkSGVpZ2h0Iiwib3V0ZXJIZWlnaHQiLCJsZW5ndGgiLCJjc3MiLCJoYXNDbGFzcyIsIm9uZSIsIk1vZGFsRXZlbnRzIiwib3BlbmVkIiwicHJvZHVjdERldGFpbHMiLCJDYXJ0SXRlbURldGFpbHMiLCJiaW5kR2lmdFdyYXBwaW5nRm9ybSIsImhvb2tzIiwib24iLCJldmVudCIsImN1cnJlbnRUYXJnZXQiLCIkZm9ybSIsIiRzdWJtaXQiLCIkbWVzc2FnZUJveCIsIm9wdGlvbkNoYW5nZSIsInNlcmlhbGl6ZSIsInJlc3VsdCIsInB1cmNoYXNpbmdfbWVzc2FnZSIsInRleHQiLCJwcm9wIiwicHVyY2hhc2FibGUiLCJpbnN0b2NrIiwiJGNhcnRJdGVtc1Jvd3MiLCIkY2FydFBhZ2VUaXRsZSIsInRvdGFscyIsInBhZ2VUaXRsZSIsInN0YXR1c01lc3NhZ2VzIiwiYWRkaXRpb25hbENoZWNrb3V0QnV0dG9ucyIsImxvY2F0aW9uIiwicmVsb2FkIiwiZ2V0Q29udGVudCIsImh0bWwiLCJyZXBsYWNlV2l0aCIsInF1YW50aXR5IiwidHJpZ2dlciIsImZpbHRlciIsImJpbmRDYXJ0RXZlbnRzIiwiZGVib3VuY2VUaW1lb3V0IiwicHJldmVudERlZmF1bHQiLCJvblF0eUZvY3VzIiwidmFsdWUiLCJjaGFuZ2UiLCJzdHJpbmciLCJpY29uIiwic2hvd0NhbmNlbEJ1dHRvbiIsIm9uQ29uZmlybSIsImJpbmRQcm9tb0NvZGVFdmVudHMiLCIkY291cG9uQ29udGFpbmVyIiwiJGNvdXBvbkZvcm0iLCIkY29kZUlucHV0IiwiY29kZSIsImFwcGx5Q29kZSIsImJpbmRHaWZ0Q2VydGlmaWNhdGVFdmVudHMiLCIkY2VydENvbnRhaW5lciIsIiRjZXJ0Rm9ybSIsIiRjZXJ0SW5wdXQiLCJ0b2dnbGUiLCJjaGVja0lzR2lmdENlcnRWYWxpZCIsInZhbGlkYXRpb25EaWN0aW9uYXJ5IiwiY3JlYXRlVHJhbnNsYXRpb25EaWN0aW9uYXJ5IiwiaW52YWxpZF9naWZ0X2NlcnRpZmljYXRlIiwiYXBwbHlHaWZ0Q2VydGlmaWNhdGUiLCJyZXNwIiwiYmluZEdpZnRXcmFwcGluZ0V2ZW50cyIsImdldEl0ZW1HaWZ0V3JhcHBpbmdPcHRpb25zIiwiJHNlbGVjdCIsImlkIiwiaW5kZXgiLCJhbGxvd01lc3NhZ2UiLCJ0b2dnbGVWaWV3cyIsIiRzaW5nbGVGb3JtIiwiJG11bHRpRm9ybSIsInNoaXBwaW5nRXJyb3JNZXNzYWdlcyIsImNvdW50cnkiLCJzaGlwcGluZ0NvdW50cnlFcnJvck1lc3NhZ2UiLCJwcm92aW5jZSIsInNoaXBwaW5nUHJvdmluY2VFcnJvck1lc3NhZ2UiLCJzaGlwcGluZ0VzdGltYXRvciIsIlNoaXBwaW5nRXN0aW1hdG9yIiwiUGFnZU1hbmFnZXIiLCIkZWxlbWVudCIsIiRzdGF0ZSIsImlzRXN0aW1hdG9yRm9ybU9wZW5lZCIsImluaXRGb3JtVmFsaWRhdGlvbiIsImJpbmRTdGF0ZUNvdW50cnlDaGFuZ2UiLCJiaW5kRXN0aW1hdG9yRXZlbnRzIiwic2hpcHBpbmdFc3RpbWF0b3JBbGVydCIsInNoaXBwaW5nVmFsaWRhdG9yIiwibm9kIiwic3VibWl0IiwidGFwIiwiYW5ub3VuY2VJbnB1dEVycm9yTWVzc2FnZSIsImF0dHIiLCJyZW1vdmVBdHRyIiwicGVyZm9ybUNoZWNrIiwiYXJlQWxsIiwiYmluZFZhbGlkYXRpb24iLCJiaW5kU3RhdGVWYWxpZGF0aW9uIiwiYmluZFVQU1JhdGVzIiwiYWRkIiwic2VsZWN0b3IiLCJ2YWxpZGF0ZSIsImNiIiwiY291bnRyeUlkIiwiaXNOYU4iLCJlcnJvck1lc3NhZ2UiLCIkZWxlIiwiZWxlVmFsIiwiVVBTUmF0ZVRvZ2dsZSIsIiRlc3RpbWF0b3JGb3JtVXBzIiwiJGVzdGltYXRvckZvcm1EZWZhdWx0IiwidG9nZ2xlQ2xhc3MiLCIkbGFzdCIsInN0YXRlQ291bnRyeSIsInVzZUlkRm9yU3RhdGVzIiwiZmllbGQiLCJFcnJvciIsIiRmaWVsZCIsImdldFN0YXR1cyIsImlzIiwiVmFsaWRhdG9ycyIsImNsZWFuVXBTdGF0ZVZhbGlkYXRpb24iLCJyZW1vdmVDbGFzcyIsInRvZ2dsZUVzdGltYXRvckZvcm1TdGF0ZSIsInRvZ2dsZUJ1dHRvbiIsImJ1dHRvblNlbGVjdG9yIiwiJHRvZ2dsZUNvbnRhaW5lciIsImNoYW5nZUF0dHJpYnV0ZXNPblRvZ2dsZSIsInNlbGVjdG9yVG9BY3RpdmF0ZSIsIiRlc3RpbWF0b3JDb250YWluZXIiLCIkZXN0aW1hdG9yRm9ybSIsImNvbGxhcHNpYmxlRmFjdG9yeSIsInBhcmFtcyIsImNvdW50cnlfaWQiLCJzdGF0ZV9pZCIsImNpdHkiLCJ6aXBfY29kZSIsImdldFNoaXBwaW5nUXVvdGVzIiwiY2xpY2tFdmVudCIsInF1b3RlSWQiLCJzdWJtaXRTaGlwcGluZ1F1b3RlIiwiJHNjb3BlIiwicHJvZHVjdEF0dHJpYnV0ZXNEYXRhIiwiJHByb2R1Y3RPcHRpb25zRWxlbWVudCIsImhhc09wdGlvbnMiLCJ0cmltIiwiaGFzRGVmYXVsdE9wdGlvbnMiLCJzZXRQcm9kdWN0VmFyaWFudCIsIm9wdGlvbkNoYW5nZUNhbGxiYWNrIiwib3B0aW9uQ2hhbmdlRGVjb3JhdG9yIiwiY2FsbCIsInVwZGF0ZVByb2R1Y3RBdHRyaWJ1dGVzIiwidW5zYXRpc2ZpZWRSZXF1aXJlZEZpZWxkcyIsImVhY2giLCJvcHRpb25MYWJlbCIsImNoaWxkcmVuIiwiaW5uZXJUZXh0Iiwib3B0aW9uVGl0bGUiLCJzcGxpdCIsInJlcXVpcmVkIiwidG9Mb3dlckNhc2UiLCJpbmNsdWRlcyIsInR5cGUiLCJnZXRBdHRyaWJ1dGUiLCJxdWVyeVNlbGVjdG9yIiwicHVzaCIsImlzU2F0aXNmaWVkIiwiQXJyYXkiLCJmcm9tIiwicXVlcnlTZWxlY3RvckFsbCIsImV2ZXJ5Iiwic2VsZWN0Iiwic2VsZWN0ZWRJbmRleCIsImRhdGVTdHJpbmciLCJtYXAiLCJ4IiwiY2hlY2tlZCIsImdldFNlbGVjdGVkT3B0aW9uTGFiZWwiLCJwcm9kdWN0VmFyaWFudHNsaXN0IiwiY29udmVydEludG9BcnJheSIsIm1hdGNoTGFiZWxGb3JDaGVja2VkSW5wdXQiLCJpbnB0IiwiZGF0YXNldCIsInByb2R1Y3RBdHRyaWJ1dGVWYWx1ZSIsImxhYmVsIiwiaXNCcm93c2VySUUiLCJsYWJlbHMiLCJ0aXRsZSIsInByb2R1Y3RWYXJpYW50Iiwic29ydCIsInZpZXciLCJwcm9kdWN0TmFtZSIsIm1hdGNoIiwiY2FyZCIsIlByb2R1Y3REZXRhaWxzQmFzZSIsImNlcnQiLCJtYWtlU3RhdGVSZXF1aXJlZCIsInN0YXRlRWxlbWVudCIsImF0dHJzIiwiaXRlbSIsInJldCIsIm5hbWUiLCJyZXBsYWNlbWVudEF0dHJpYnV0ZXMiLCIkbmV3RWxlbWVudCIsIiRoaWRkZW5JbnB1dCIsInByZXYiLCJhcHBlbmQiLCJtYWtlU3RhdGVPcHRpb25hbCIsImluc2VydFN0YXRlSGlkZGVuRmllbGQiLCJhZGRPcHRpb25zIiwic3RhdGVzQXJyYXkiLCIkc2VsZWN0RWxlbWVudCIsImNvbnRhaW5lciIsInByZWZpeCIsInN0YXRlcyIsImZvckVhY2giLCJzdGF0ZU9iaiIsImNhbGxiYWNrIiwiY291bnRyeU5hbWUiLCJnZXRCeU5hbWUiLCJzdGF0ZV9lcnJvciIsIiRjdXJyZW50SW5wdXQiLCJuZXdFbGVtZW50IiwiVFJBTlNMQVRJT05TIiwiaXNUcmFuc2xhdGlvbkRpY3Rpb25hcnlOb3RFbXB0eSIsImRpY3Rpb25hcnkiLCJPYmplY3QiLCJrZXlzIiwiY2hvb3NlQWN0aXZlRGljdGlvbmFyeSIsImkiLCJKU09OIiwicGFyc2UiLCJ2YWxpZGF0aW9uRGljdGlvbmFyeUpTT04iLCJ2YWxpZGF0aW9uRmFsbGJhY2tEaWN0aW9uYXJ5SlNPTiIsInZhbGlkYXRpb25EZWZhdWx0RGljdGlvbmFyeUpTT04iLCJhY3RpdmVEaWN0aW9uYXJ5IiwibG9jYWxpemF0aW9ucyIsInZhbHVlcyIsInRyYW5zbGF0aW9uS2V5cyIsImtleSIsInBvcCIsInJlZHVjZSIsImFjYyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0lBRXFCQSxJOzs7Ozs7Ozs7U0FDakJDLE8sR0FBQSxtQkFBVTtJQUNOLEtBQUtDLE1BQUwsR0FBYyxJQUFkO0lBQ0EsS0FBS0MsZ0JBQUwsR0FBd0JDLENBQUMsQ0FBQyxhQUFELENBQXpCO0lBQ0EsS0FBS0MsWUFBTCxHQUFvQkQsQ0FBQyxDQUFDLHFCQUFELENBQXJCO0lBQ0EsS0FBS0UsYUFBTCxHQUFxQkYsQ0FBQyxDQUFDLG9CQUFELENBQXRCO0lBQ0EsS0FBS0csV0FBTCxHQUFtQkgsQ0FBQyxDQUFDLG9CQUFELENBQXBCO0lBQ0EsS0FBS0ksMkJBQUwsR0FBbUNKLENBQUMsQ0FBQyx5Q0FBRCxDQUFwQztJQUNBLEtBQUtLLFFBQUwsR0FBZ0JMLENBQUMsQ0FBQyw2QkFBRCxDQUFELENBQ1hNLElBRFcsRUFBaEIsQ0FQTSxDQVFPOztJQUNiLEtBQUtDLGlCQUFMLEdBQXlCLElBQXpCO0lBQ0EsS0FBS0Msd0JBQUwsR0FBZ0MsSUFBaEM7SUFFQSxLQUFLQyxrQkFBTDtJQUNBLEtBQUtDLFVBQUw7RUFDSCxDOztTQUVERCxrQixHQUFBLDhCQUFxQjtJQUNqQixJQUFJRSxNQUFNLENBQUNDLGVBQVgsRUFBNEI7TUFDeEIsS0FBS2IsZ0JBQUwsQ0FBc0JjLFFBQXRCLENBQStCLHFC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TSxDQUFDVyxNQUFQLENBQWNGLGdCQUFnQixDQUFDWixZQUFELENBQTlCLENBQXRCO0VBQ0EsSUFBTWUsZUFBZSxHQUFHWixNQUFNLENBQUNDLElBQVAsQ0FBWVEsZ0JBQWdCLENBQUNaLFlBQUQsQ0FBNUIsRUFBNENqRCxHQUE1QyxDQUFnRCxVQUFBaUUsR0FBRztJQUFBLE9BQUlBLEdBQUcsQ0FBQ2pGLEtBQUosQ0FBVSxHQUFWLEVBQWVrRixHQUFmLEVBQUo7RUFBQSxDQUFuRCxDQUF4QjtFQUVBLE9BQU9GLGVBQWUsQ0FBQ0csTUFBaEIsQ0FBdUIsVUFBQ0MsR0FBRCxFQUFNSCxHQUFOLEVBQVdWLENBQVgsRUFBaUI7SUFDM0NhLEdBQUcsQ0FBQ0gsR0FBRCxDQUFILEdBQVdILGFBQWEsQ0FBQ1AsQ0FBRCxDQUF4QjtJQUNBLE9BQU9hLEdBQVA7RUFDSCxDQUhNLEVBR0osRUFISSxDQUFQO0FBSUgsQ0FWTSxDIiwiZmlsZSI6InRoZW1lLWJ1bmRsZS5jaHVuay44LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFBhZ2VNYW5hZ2VyIGZyb20gJy4vcGFnZS1tYW5hZ2VyJztcbmltcG9ydCB7IGJpbmQsIGRlYm91bmNlIH0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCBjaGVja0lzR2lmdENlcnRWYWxpZCBmcm9tICcuL2NvbW1vbi9naWZ0LWNlcnRpZmljYXRlLXZhbGlkYXRvcic7XG5pbXBvcnQgeyBjcmVhdGVUcmFuc2xhdGlvbkRpY3Rpb25hcnkgfSBmcm9tICcuL2NvbW1vbi91dGlscy90cmFuc2xhdGlvbnMtdXRpbHMnO1xuaW1wb3J0IHV0aWxzIGZyb20gJ0BiaWdjb21tZXJjZS9zdGVuY2lsLXV0aWxzJztcbmltcG9ydCBTaGlwcGluZ0VzdGltYXRvciBmcm9tICcuL2NhcnQvc2hpcHBpbmctZXN0aW1hdG9yJztcbmltcG9ydCB7IGRlZmF1bHRNb2RhbCwgc2hvd0FsZXJ0TW9kYWwsIE1vZGFsRXZlbnRzIH0gZnJvbSAnLi9nbG9iYWwvbW9kYWwnO1xuaW1wb3J0IENhcnRJdGVtRGV0YWlscyBmcm9tICcuL2NvbW1vbi9jYXJ0LWl0ZW0tZGV0YWlscyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENhcnQgZXh0ZW5kcyBQYWdlTWFuYWdlciB7XG4gICAgb25SZWFkeSgpIHtcbiAgICAgICAgdGhpcy4kbW9kYWwgPSBudWxsO1xuICAgICAgICB0aGlzLiRjYXJ0UGFnZUNvbnRlbnQgPSAkKCdbZGF0YS1jYXJ0XScpO1xuICAgICAgICB0aGlzLiRjYXJ0Q29udGVudCA9ICQoJ1tkYXRhLWNhcnQtY29udGVudF0nKTtcbiAgICAgICAgdGhpcy4kY2FydE1lc3NhZ2VzID0gJCgnW2RhdGEtY2FydC1zdGF0dXNdJyk7XG4gICAgICAgIHRoaXMuJGNhcnRUb3RhbHMgPSAkKCdbZGF0YS1jYXJ0LXRvdGFsc10nKTtcbiAgICAgICAgdGhpcy4kY2FydEFkZGl0aW9uYWxDaGVja291dEJ0bnMgPSAkKCdbZGF0YS1jYXJ0LWFkZGl0aW9uYWwtY2hlY2tvdXQtYnV0dG9uc10nKTtcbiAgICAgICAgdGhpcy4kb3ZlcmxheSA9ICQoJ1tkYXRhLWNhcnRdIC5sb2FkaW5nT3ZlcmxheScpXG4gICAgICAgICAgICAuaGlkZSgpOyAvLyBUT0RPOiB0ZW1wb3JhcnkgdW50aWwgcm9wZXIgcHVsbHMgaW4gaGlzIGNhcnQgY29tcG9uZW50c1xuICAgICAgICB0aGlzLiRhY3RpdmVDYXJ0SXRlbUlkID0gbnVsbDtcbiAgICAgICAgdGhpcy4kYWN0aXZlQ2FydEl0ZW1CdG5BY3Rpb24gPSBudWxsO1xuXG4gICAgICAgIHRoaXMuc2V0QXBwbGVQYXlTdXBwb3J0KCk7XG4gICAgICAgIHRoaXMuYmluZEV2ZW50cygpO1xuICAgIH1cblxuICAgIHNldEFwcGxlUGF5U3VwcG9ydCgpIHtcbiAgICAgICAgaWYgKHdpbmRvdy5BcHBsZVBheVNlc3Npb24pIHtcbiAgICAgICAgICAgIHRoaXMuJGNhcnRQYWdlQ29udGVudC5hZGRDbGFzcygnYXBwbGUtcGF5LXN1cHBvcnRlZCcpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2FydFVwZGF0ZSgkdGFyZ2V0KSB7XG4gICAgICAgIGNvbnN0IGl0ZW1JZCA9ICR0YXJnZXQuZGF0YSgnY2FydEl0ZW1pZCcpO1xuICAgICAgICB0aGlzLiRhY3RpdmVDYXJ0SXRlbUlkID0gaXRlbUlkO1xuICAgICAgICB0aGlzLiRhY3RpdmVDYXJ0SXRlbUJ0bkFjdGlvbiA9ICR0YXJnZXQuZGF0YSgnYWN0aW9uJyk7XG5cbiAgICAgICAgY29uc3QgJGVsID0gJChgI3F0eS0ke2l0ZW1JZH1gKTtcbiAgICAgICAgY29uc3Qgb2xkUXR5ID0gcGFyc2VJbnQoJGVsLnZhbCgpLCAxMCk7XG4gICAgICAgIGNvbnN0IG1heFF0eSA9IHBhcnNlSW50KCRlbC5kYXRhKCdxdWFudGl0eU1heCcpLCAxMCk7XG4gICAgICAgIGNvbnN0IG1pblF0eSA9IHBhcnNlSW50KCRlbC5kYXRhKCdxdWFudGl0eU1pbicpLCAxMCk7XG4gICAgICAgIGNvbnN0IG1pbkVycm9yID0gJGVsLmRhdGEoJ3F1YW50aXR5TWluRXJyb3InKTtcbiAgICAgICAgY29uc3QgbWF4RXJyb3IgPSAkZWwuZGF0YSgncXVhbnRpdHlNYXhFcnJvcicpO1xuICAgICAgICBjb25zdCBuZXdRdHkgPSAkdGFyZ2V0LmRhdGEoJ2FjdGlvbicpID09PSAnaW5jJyA/IG9sZFF0eSArIDEgOiBvbGRRdHkgLSAxO1xuICAgICAgICAvLyBEb2VzIG5vdCBxdWFsaXR5IGZvciBtaW4vbWF4IHF1YW50aXR5XG4gICAgICAgIGlmIChuZXdRdHkgPCBtaW5RdHkpIHtcbiAgICAgICAgICAgIHJldHVybiBzaG93QWxlcnRNb2RhbChtaW5FcnJvcik7XG4gICAgICAgIH0gZWxzZSBpZiAobWF4UXR5ID4gMCAmJiBuZXdRdHkgPiBtYXhRdHkpIHtcbiAgICAgICAgICAgIHJldHVybiBzaG93QWxlcnRNb2RhbChtYXhFcnJvcik7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLiRvdmVybGF5LnNob3coKTtcblxuICAgICAgICB1dGlscy5hcGkuY2FydC5pdGVtVXBkYXRlKGl0ZW1JZCwgbmV3UXR5LCAoZXJyLCByZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgdGhpcy4kb3ZlcmxheS5oaWRlKCk7XG5cbiAgICAgICAgICAgIGlmIChyZXNwb25zZS5kYXRhLnN0YXR1cyA9PT0gJ3N1Y2NlZWQnKSB7XG4gICAgICAgICAgICAgICAgLy8gaWYgdGhlIHF1YW50aXR5IGlzIGNoYW5nZWQgXCIxXCIgZnJvbSBcIjBcIiwgd2UgaGF2ZSB0byByZW1vdmUgdGhlIHJvdy5cbiAgICAgICAgICAgICAgICBjb25zdCByZW1vdmUgPSAobmV3UXR5ID09PSAwKTtcblxuICAgICAgICAgICAgICAgIHRoaXMucmVmcmVzaENvbnRlbnQocmVtb3ZlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJGVsLnZhbChvbGRRdHkpO1xuICAgICAgICAgICAgICAgIHNob3dBbGVydE1vZGFsKHJlc3BvbnNlLmRhdGEuZXJyb3JzLmpvaW4oJ1xcbicpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY2FydFVwZGF0ZVF0eVRleHRDaGFuZ2UoJHRhcmdldCwgcHJlVmFsID0gbnVsbCkge1xuICAgICAgICBjb25zdCBpdGVtSWQgPSAkdGFyZ2V0LmRhdGEoJ2NhcnRJdGVtaWQnKTtcbiAgICAgICAgY29uc3QgJGVsID0gJChgI3F0eS0ke2l0ZW1JZH1gKTtcbiAgICAgICAgY29uc3QgbWF4UXR5ID0gcGFyc2VJbnQoJGVsLmRhdGEoJ3F1YW50aXR5TWF4JyksIDEwKTtcbiAgICAgICAgY29uc3QgbWluUXR5ID0gcGFyc2VJbnQoJGVsLmRhdGEoJ3F1YW50aXR5TWluJyksIDEwKTtcbiAgICAgICAgY29uc3Qgb2xkUXR5ID0gcHJlVmFsICE9PSBudWxsID8gcHJlVmFsIDogbWluUXR5O1xuICAgICAgICBjb25zdCBtaW5FcnJvciA9ICRlbC5kYXRhKCdxdWFudGl0eU1pbkVycm9yJyk7XG4gICAgICAgIGNvbnN0IG1heEVycm9yID0gJGVsLmRhdGEoJ3F1YW50aXR5TWF4RXJyb3InKTtcbiAgICAgICAgY29uc3QgbmV3UXR5ID0gcGFyc2VJbnQoTnVtYmVyKCRlbC52YWwoKSksIDEwKTtcbiAgICAgICAgbGV0IGludmFsaWRFbnRyeTtcblxuICAgICAgICAvLyBEb2VzIG5vdCBxdWFsaXR5IGZvciBtaW4vbWF4IHF1YW50aXR5XG4gICAgICAgIGlmICghbmV3UXR5KSB7XG4gICAgICAgICAgICBpbnZhbGlkRW50cnkgPSAkZWwudmFsKCk7XG4gICAgICAgICAgICAkZWwudmFsKG9sZFF0eSk7XG4gICAgICAgICAgICByZXR1cm4gc2hvd0FsZXJ0TW9kYWwodGhpcy5jb250ZXh0LmludmFsaWRFbnRyeU1lc3NhZ2UucmVwbGFjZSgnW0VOVFJZXScsIGludmFsaWRFbnRyeSkpO1xuICAgICAgICB9IGVsc2UgaWYgKG5ld1F0eSA8IG1pblF0eSkge1xuICAgICAgICAgICAgJGVsLnZhbChvbGRRdHkpO1xuICAgICAgICAgICAgcmV0dXJuIHNob3dBbGVydE1vZGFsKG1pbkVycm9yKTtcbiAgICAgICAgfSBlbHNlIGlmIChtYXhRdHkgPiAwICYmIG5ld1F0eSA+IG1heFF0eSkge1xuICAgICAgICAgICAgJGVsLnZhbChvbGRRdHkpO1xuICAgICAgICAgICAgcmV0dXJuIHNob3dBbGVydE1vZGFsKG1heEVycm9yKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuJG92ZXJsYXkuc2hvdygpO1xuICAgICAgICB1dGlscy5hcGkuY2FydC5pdGVtVXBkYXRlKGl0ZW1JZCwgbmV3UXR5LCAoZXJyLCByZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgdGhpcy4kb3ZlcmxheS5oaWRlKCk7XG5cbiAgICAgICAgICAgIGlmIChyZXNwb25zZS5kYXRhLnN0YXR1cyA9PT0gJ3N1Y2NlZWQnKSB7XG4gICAgICAgICAgICAgICAgLy8gaWYgdGhlIHF1YW50aXR5IGlzIGNoYW5nZWQgXCIxXCIgZnJvbSBcIjBcIiwgd2UgaGF2ZSB0byByZW1vdmUgdGhlIHJvdy5cbiAgICAgICAgICAgICAgICBjb25zdCByZW1vdmUgPSAobmV3UXR5ID09PSAwKTtcblxuICAgICAgICAgICAgICAgIHRoaXMucmVmcmVzaENvbnRlbnQocmVtb3ZlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJGVsLnZhbChvbGRRdHkpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHNob3dBbGVydE1vZGFsKHJlc3BvbnNlLmRhdGEuZXJyb3JzLmpvaW4oJ1xcbicpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY2FydFJlbW92ZUl0ZW0oaXRlbUlkKSB7XG4gICAgICAgIHRoaXMuJG92ZXJsYXkuc2hvdygpO1xuICAgICAgICB1dGlscy5hcGkuY2FydC5pdGVtUmVtb3ZlKGl0ZW1JZCwgKGVyciwgcmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIGlmIChyZXNwb25zZS5kYXRhLnN0YXR1cyA9PT0gJ3N1Y2NlZWQnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZWZyZXNoQ29udGVudCh0cnVlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kb3ZlcmxheS5oaWRlKCk7XG4gICAgICAgICAgICAgICAgc2hvd0FsZXJ0TW9kYWwocmVzcG9uc2UuZGF0YS5lcnJvcnMuam9pbignXFxuJykpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjYXJ0RWRpdE9wdGlvbnMoaXRlbUlkLCBwcm9kdWN0SWQpIHtcbiAgICAgICAgY29uc3QgY29udGV4dCA9IHsgcHJvZHVjdEZvckNoYW5nZUlkOiBwcm9kdWN0SWQsIC4uLnRoaXMuY29udGV4dCB9O1xuICAgICAgICBjb25zdCBtb2RhbCA9IGRlZmF1bHRNb2RhbCgpO1xuXG4gICAgICAgIGlmICh0aGlzLiRtb2RhbCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy4kbW9kYWwgPSAkKCcjbW9kYWwnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICAgICAgICB0ZW1wbGF0ZTogJ2NhcnQvbW9kYWxzL2NvbmZpZ3VyZS1wcm9kdWN0JyxcbiAgICAgICAgfTtcblxuICAgICAgICBtb2RhbC5vcGVuKCk7XG4gICAgICAgIHRoaXMuJG1vZGFsLmZpbmQoJy5tb2RhbC1jb250ZW50JykuYWRkQ2xhc3MoJ2hpZGUtY29udGVudCcpO1xuXG4gICAgICAgIHV0aWxzLmFwaS5wcm9kdWN0QXR0cmlidXRlcy5jb25maWd1cmVJbkNhcnQoaXRlbUlkLCBvcHRpb25zLCAoZXJyLCByZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgbW9kYWwudXBkYXRlQ29udGVudChyZXNwb25zZS5jb250ZW50KTtcbiAgICAgICAgICAgIGNvbnN0IG9wdGlvbkNoYW5nZUhhbmRsZXIgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgJHByb2R1Y3RPcHRpb25zQ29udGFpbmVyID0gJCgnW2RhdGEtcHJvZHVjdC1hdHRyaWJ1dGVzLXdyYXBwZXJdJywgdGhpcy4kbW9kYWwpO1xuICAgICAgICAgICAgICAgIGNvbnN0IG1vZGFsQm9keVJlc2VydmVkSGVpZ2h0ID0gJHByb2R1Y3RPcHRpb25zQ29udGFpbmVyLm91dGVySGVpZ2h0KCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoJHByb2R1Y3RPcHRpb25zQ29udGFpbmVyLmxlbmd0aCAmJiBtb2RhbEJvZHlSZXNlcnZlZEhlaWdodCkge1xuICAgICAgICAgICAgICAgICAgICAkcHJvZHVjdE9wdGlvbnNDb250YWluZXIuY3NzKCdoZWlnaHQnLCBtb2RhbEJvZHlSZXNlcnZlZEhlaWdodCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuJG1vZGFsLmhhc0NsYXNzKCdvcGVuJykpIHtcbiAgICAgICAgICAgICAgICBvcHRpb25DaGFuZ2VIYW5kbGVyKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuJG1vZGFsLm9uZShNb2RhbEV2ZW50cy5vcGVuZWQsIG9wdGlvbkNoYW5nZUhhbmRsZXIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnByb2R1Y3REZXRhaWxzID0gbmV3IENhcnRJdGVtRGV0YWlscyh0aGlzLiRtb2RhbCwgY29udGV4dCk7XG5cbiAgICAgICAgICAgIHRoaXMuYmluZEdpZnRXcmFwcGluZ0Zvcm0oKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdXRpbHMuaG9va3Mub24oJ3Byb2R1Y3Qtb3B0aW9uLWNoYW5nZScsIChldmVudCwgY3VycmVudFRhcmdldCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgJGZvcm0gPSAkKGN1cnJlbnRUYXJnZXQpLmZpbmQoJ2Zvcm0nKTtcbiAgICAgICAgICAgIGNvbnN0ICRzdWJtaXQgPSAkKCdpbnB1dC5idXR0b24nLCAkZm9ybSk7XG4gICAgICAgICAgICBjb25zdCAkbWVzc2FnZUJveCA9ICQoJy5hbGVydE1lc3NhZ2VCb3gnKTtcblxuICAgICAgICAgICAgdXRpbHMuYXBpLnByb2R1Y3RBdHRyaWJ1dGVzLm9wdGlvbkNoYW5nZShwcm9kdWN0SWQsICRmb3JtLnNlcmlhbGl6ZSgpLCAoZXJyLCByZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBkYXRhID0gcmVzdWx0LmRhdGEgfHwge307XG5cbiAgICAgICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIHNob3dBbGVydE1vZGFsKGVycik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5wdXJjaGFzaW5nX21lc3NhZ2UpIHtcbiAgICAgICAgICAgICAgICAgICAgJCgncC5hbGVydEJveC1tZXNzYWdlJywgJG1lc3NhZ2VCb3gpLnRleHQoZGF0YS5wdXJjaGFzaW5nX21lc3NhZ2UpO1xuICAgICAgICAgICAgICAgICAgICAkc3VibWl0LnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgICRtZXNzYWdlQm94LnNob3coKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAkc3VibWl0LnByb3AoJ2Rpc2FibGVkJywgZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICAkbWVzc2FnZUJveC5oaWRlKCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKCFkYXRhLnB1cmNoYXNhYmxlIHx8ICFkYXRhLmluc3RvY2spIHtcbiAgICAgICAgICAgICAgICAgICAgJHN1Ym1pdC5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICRzdWJtaXQucHJvcCgnZGlzYWJsZWQnLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlZnJlc2hDb250ZW50KHJlbW92ZSkge1xuICAgICAgICBjb25zdCAkY2FydEl0ZW1zUm93cyA9ICQoJ1tkYXRhLWl0ZW0tcm93XScsIHRoaXMuJGNhcnRDb250ZW50KTtcbiAgICAgICAgY29uc3QgJGNhcnRQYWdlVGl0bGUgPSAkKCdbZGF0YS1jYXJ0LXBhZ2UtdGl0bGVdJyk7XG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICAgICAgICB0ZW1wbGF0ZToge1xuICAgICAgICAgICAgICAgIGNvbnRlbnQ6ICdjYXJ0L2NvbnRlbnQnLFxuICAgICAgICAgICAgICAgIHRvdGFsczogJ2NhcnQvdG90YWxzJyxcbiAgICAgICAgICAgICAgICBwYWdlVGl0bGU6ICdjYXJ0L3BhZ2UtdGl0bGUnLFxuICAgICAgICAgICAgICAgIHN0YXR1c01lc3NhZ2VzOiAnY2FydC9zdGF0dXMtbWVzc2FnZXMnLFxuICAgICAgICAgICAgICAgIGFkZGl0aW9uYWxDaGVja291dEJ1dHRvbnM6ICdjYXJ0L2FkZGl0aW9uYWwtY2hlY2tvdXQtYnV0dG9ucycsXG4gICAgICAgICAgICB9LFxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuJG92ZXJsYXkuc2hvdygpO1xuXG4gICAgICAgIC8vIFJlbW92ZSBsYXN0IGl0ZW0gZnJvbSBjYXJ0PyBSZWxvYWRcbiAgICAgICAgaWYgKHJlbW92ZSAmJiAkY2FydEl0ZW1zUm93cy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgIHJldHVybiB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XG4gICAgICAgIH1cblxuICAgICAgICB1dGlscy5hcGkuY2FydC5nZXRDb250ZW50KG9wdGlvbnMsIChlcnIsIHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICB0aGlzLiRjYXJ0Q29udGVudC5odG1sKHJlc3BvbnNlLmNvbnRlbnQpO1xuICAgICAgICAgICAgdGhpcy4kY2FydFRvdGFscy5odG1sKHJlc3BvbnNlLnRvdGFscyk7XG4gICAgICAgICAgICB0aGlzLiRjYXJ0TWVzc2FnZXMuaHRtbChyZXNwb25zZS5zdGF0dXNNZXNzYWdlcyk7XG4gICAgICAgICAgICB0aGlzLiRjYXJ0QWRkaXRpb25hbENoZWNrb3V0QnRucy5odG1sKHJlc3BvbnNlLmFkZGl0aW9uYWxDaGVja291dEJ1dHRvbnMpO1xuXG4gICAgICAgICAgICAkY2FydFBhZ2VUaXRsZS5yZXBsYWNlV2l0aChyZXNwb25zZS5wYWdlVGl0bGUpO1xuICAgICAgICAgICAgdGhpcy5iaW5kRXZlbnRzKCk7XG4gICAgICAgICAgICB0aGlzLiRvdmVybGF5LmhpZGUoKTtcblxuICAgICAgICAgICAgY29uc3QgcXVhbnRpdHkgPSAkKCdbZGF0YS1jYXJ0LXF1YW50aXR5XScsIHRoaXMuJGNhcnRDb250ZW50KS5kYXRhKCdjYXJ0UXVhbnRpdHknKSB8fCAwO1xuXG4gICAgICAgICAgICAkKCdib2R5JykudHJpZ2dlcignY2FydC1xdWFudGl0eS11cGRhdGUnLCBxdWFudGl0eSk7XG5cbiAgICAgICAgICAgICQoYFtkYXRhLWNhcnQtaXRlbWlkPScke3RoaXMuJGFjdGl2ZUNhcnRJdGVtSWR9J11gLCB0aGlzLiRjYXJ0Q29udGVudClcbiAgICAgICAgICAgICAgICAuZmlsdGVyKGBbZGF0YS1hY3Rpb249JyR7dGhpcy4kYWN0aXZlQ2FydEl0ZW1CdG5BY3Rpb259J11gKVxuICAgICAgICAgICAgICAgIC50cmlnZ2VyKCdmb2N1cycpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBiaW5kQ2FydEV2ZW50cygpIHtcbiAgICAgICAgY29uc3QgZGVib3VuY2VUaW1lb3V0ID0gNDAwO1xuICAgICAgICBjb25zdCBjYXJ0VXBkYXRlID0gYmluZChkZWJvdW5jZSh0aGlzLmNhcnRVcGRhdGUsIGRlYm91bmNlVGltZW91dCksIHRoaXMpO1xuICAgICAgICBjb25zdCBjYXJ0VXBkYXRlUXR5VGV4dENoYW5nZSA9IGJpbmQoZGVib3VuY2UodGhpcy5jYXJ0VXBkYXRlUXR5VGV4dENoYW5nZSwgZGVib3VuY2VUaW1lb3V0KSwgdGhpcyk7XG4gICAgICAgIGNvbnN0IGNhcnRSZW1vdmVJdGVtID0gYmluZChkZWJvdW5jZSh0aGlzLmNhcnRSZW1vdmVJdGVtLCBkZWJvdW5jZVRpbWVvdXQpLCB0aGlzKTtcbiAgICAgICAgbGV0IHByZVZhbDtcblxuICAgICAgICAvLyBjYXJ0IHVwZGF0ZVxuICAgICAgICAkKCdbZGF0YS1jYXJ0LXVwZGF0ZV0nLCB0aGlzLiRjYXJ0Q29udGVudCkub24oJ2NsaWNrJywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgY29uc3QgJHRhcmdldCA9ICQoZXZlbnQuY3VycmVudFRhcmdldCk7XG5cbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIC8vIHVwZGF0ZSBjYXJ0IHF1YW50aXR5XG4gICAgICAgICAgICBjYXJ0VXBkYXRlKCR0YXJnZXQpO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBjYXJ0IHF0eSBtYW51YWxseSB1cGRhdGVzXG4gICAgICAgICQoJy5jYXJ0LWl0ZW0tcXR5LWlucHV0JywgdGhpcy4kY2FydENvbnRlbnQpLm9uKCdmb2N1cycsIGZ1bmN0aW9uIG9uUXR5Rm9jdXMoKSB7XG4gICAgICAgICAgICBwcmVWYWwgPSB0aGlzLnZhbHVlO1xuICAgICAgICB9KS5jaGFuZ2UoZXZlbnQgPT4ge1xuICAgICAgICAgICAgY29uc3QgJHRhcmdldCA9ICQoZXZlbnQuY3VycmVudFRhcmdldCk7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAvLyB1cGRhdGUgY2FydCBxdWFudGl0eVxuICAgICAgICAgICAgY2FydFVwZGF0ZVF0eVRleHRDaGFuZ2UoJHRhcmdldCwgcHJlVmFsKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJCgnLmNhcnQtcmVtb3ZlJywgdGhpcy4kY2FydENvbnRlbnQpLm9uKCdjbGljaycsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGl0ZW1JZCA9ICQoZXZlbnQuY3VycmVudFRhcmdldCkuZGF0YSgnY2FydEl0ZW1pZCcpO1xuICAgICAgICAgICAgY29uc3Qgc3RyaW5nID0gJChldmVudC5jdXJyZW50VGFyZ2V0KS5kYXRhKCdjb25maXJtRGVsZXRlJyk7XG4gICAgICAgICAgICBzaG93QWxlcnRNb2RhbChzdHJpbmcsIHtcbiAgICAgICAgICAgICAgICBpY29uOiAnd2FybmluZycsXG4gICAgICAgICAgICAgICAgc2hvd0NhbmNlbEJ1dHRvbjogdHJ1ZSxcbiAgICAgICAgICAgICAgICBvbkNvbmZpcm06ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLy8gcmVtb3ZlIGl0ZW0gZnJvbSBjYXJ0XG4gICAgICAgICAgICAgICAgICAgIGNhcnRSZW1vdmVJdGVtKGl0ZW1JZCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJCgnW2RhdGEtaXRlbS1lZGl0XScsIHRoaXMuJGNhcnRDb250ZW50KS5vbignY2xpY2snLCBldmVudCA9PiB7XG4gICAgICAgICAgICBjb25zdCBpdGVtSWQgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpLmRhdGEoJ2l0ZW1FZGl0Jyk7XG4gICAgICAgICAgICBjb25zdCBwcm9kdWN0SWQgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpLmRhdGEoJ3Byb2R1Y3RJZCcpO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIC8vIGVkaXQgaXRlbSBpbiBjYXJ0XG4gICAgICAgICAgICB0aGlzLmNhcnRFZGl0T3B0aW9ucyhpdGVtSWQsIHByb2R1Y3RJZCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGJpbmRQcm9tb0NvZGVFdmVudHMoKSB7XG4gICAgICAgIGNvbnN0ICRjb3Vwb25Db250YWluZXIgPSAkKCcuY291cG9uLWNvZGUnKTtcbiAgICAgICAgY29uc3QgJGNvdXBvbkZvcm0gPSAkKCcuY291cG9uLWZvcm0nKTtcbiAgICAgICAgY29uc3QgJGNvZGVJbnB1dCA9ICQoJ1tuYW1lPVwiY291cG9uY29kZVwiXScsICRjb3Vwb25Gb3JtKTtcblxuICAgICAgICAkKCcuY291cG9uLWNvZGUtYWRkJykub24oJ2NsaWNrJywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgJChldmVudC5jdXJyZW50VGFyZ2V0KS5oaWRlKCk7XG4gICAgICAgICAgICAkY291cG9uQ29udGFpbmVyLnNob3coKTtcbiAgICAgICAgICAgICQoJy5jb3Vwb24tY29kZS1jYW5jZWwnKS5zaG93KCk7XG4gICAgICAgICAgICAkY29kZUlucHV0LnRyaWdnZXIoJ2ZvY3VzJyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoJy5jb3Vwb24tY29kZS1jYW5jZWwnKS5vbignY2xpY2snLCBldmVudCA9PiB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAkY291cG9uQ29udGFpbmVyLmhpZGUoKTtcbiAgICAgICAgICAgICQoJy5jb3Vwb24tY29kZS1jYW5jZWwnKS5oaWRlKCk7XG4gICAgICAgICAgICAkKCcuY291cG9uLWNvZGUtYWRkJykuc2hvdygpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkY291cG9uRm9ybS5vbignc3VibWl0JywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgY29uc3QgY29kZSA9ICRjb2RlSW5wdXQudmFsKCk7XG5cbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIC8vIEVtcHR5IGNvZGVcbiAgICAgICAgICAgIGlmICghY29kZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBzaG93QWxlcnRNb2RhbCgkY29kZUlucHV0LmRhdGEoJ2Vycm9yJykpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB1dGlscy5hcGkuY2FydC5hcHBseUNvZGUoY29kZSwgKGVyciwgcmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2UuZGF0YS5zdGF0dXMgPT09ICdzdWNjZXNzJykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2hDb250ZW50KCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc2hvd0FsZXJ0TW9kYWwocmVzcG9uc2UuZGF0YS5lcnJvcnMuam9pbignXFxuJykpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBiaW5kR2lmdENlcnRpZmljYXRlRXZlbnRzKCkge1xuICAgICAgICBjb25zdCAkY2VydENvbnRhaW5lciA9ICQoJy5naWZ0LWNlcnRpZmljYXRlLWNvZGUnKTtcbiAgICAgICAgY29uc3QgJGNlcnRGb3JtID0gJCgnLmNhcnQtZ2lmdC1jZXJ0aWZpY2F0ZS1mb3JtJyk7XG4gICAgICAgIGNvbnN0ICRjZXJ0SW5wdXQgPSAkKCdbbmFtZT1cImNlcnRjb2RlXCJdJywgJGNlcnRGb3JtKTtcblxuICAgICAgICAkKCcuZ2lmdC1jZXJ0aWZpY2F0ZS1hZGQnKS5vbignY2xpY2snLCBldmVudCA9PiB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgJChldmVudC5jdXJyZW50VGFyZ2V0KS50b2dnbGUoKTtcbiAgICAgICAgICAgICRjZXJ0Q29udGFpbmVyLnRvZ2dsZSgpO1xuICAgICAgICAgICAgJCgnLmdpZnQtY2VydGlmaWNhdGUtY2FuY2VsJykudG9nZ2xlKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoJy5naWZ0LWNlcnRpZmljYXRlLWNhbmNlbCcpLm9uKCdjbGljaycsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAkY2VydENvbnRhaW5lci50b2dnbGUoKTtcbiAgICAgICAgICAgICQoJy5naWZ0LWNlcnRpZmljYXRlLWFkZCcpLnRvZ2dsZSgpO1xuICAgICAgICAgICAgJCgnLmdpZnQtY2VydGlmaWNhdGUtY2FuY2VsJykudG9nZ2xlKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICRjZXJ0Rm9ybS5vbignc3VibWl0JywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgY29uc3QgY29kZSA9ICRjZXJ0SW5wdXQudmFsKCk7XG5cbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIGlmICghY2hlY2tJc0dpZnRDZXJ0VmFsaWQoY29kZSkpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB2YWxpZGF0aW9uRGljdGlvbmFyeSA9IGNyZWF0ZVRyYW5zbGF0aW9uRGljdGlvbmFyeSh0aGlzLmNvbnRleHQpO1xuICAgICAgICAgICAgICAgIHJldHVybiBzaG93QWxlcnRNb2RhbCh2YWxpZGF0aW9uRGljdGlvbmFyeS5pbnZhbGlkX2dpZnRfY2VydGlmaWNhdGUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB1dGlscy5hcGkuY2FydC5hcHBseUdpZnRDZXJ0aWZpY2F0ZShjb2RlLCAoZXJyLCByZXNwKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3AuZGF0YS5zdGF0dXMgPT09ICdzdWNjZXNzJykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2hDb250ZW50KCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc2hvd0FsZXJ0TW9kYWwocmVzcC5kYXRhLmVycm9ycy5qb2luKCdcXG4nKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGJpbmRHaWZ0V3JhcHBpbmdFdmVudHMoKSB7XG4gICAgICAgIGNvbnN0IG1vZGFsID0gZGVmYXVsdE1vZGFsKCk7XG5cbiAgICAgICAgJCgnW2RhdGEtaXRlbS1naWZ0d3JhcF0nKS5vbignY2xpY2snLCBldmVudCA9PiB7XG4gICAgICAgICAgICBjb25zdCBpdGVtSWQgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpLmRhdGEoJ2l0ZW1HaWZ0d3JhcCcpO1xuICAgICAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZTogJ2NhcnQvbW9kYWxzL2dpZnQtd3JhcHBpbmctZm9ybScsXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICBtb2RhbC5vcGVuKCk7XG5cbiAgICAgICAgICAgIHV0aWxzLmFwaS5jYXJ0LmdldEl0ZW1HaWZ0V3JhcHBpbmdPcHRpb25zKGl0ZW1JZCwgb3B0aW9ucywgKGVyciwgcmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICBtb2RhbC51cGRhdGVDb250ZW50KHJlc3BvbnNlLmNvbnRlbnQpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5iaW5kR2lmdFdyYXBwaW5nRm9ybSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGJpbmRHaWZ0V3JhcHBpbmdGb3JtKCkge1xuICAgICAgICAkKCcuZ2lmdFdyYXBwaW5nLXNlbGVjdCcpLm9uKCdjaGFuZ2UnLCBldmVudCA9PiB7XG4gICAgICAgICAgICBjb25zdCAkc2VsZWN0ID0gJChldmVudC5jdXJyZW50VGFyZ2V0KTtcbiAgICAgICAgICAgIGNvbnN0IGlkID0gJHNlbGVjdC52YWwoKTtcbiAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gJHNlbGVjdC5kYXRhKCdpbmRleCcpO1xuXG4gICAgICAgICAgICBpZiAoIWlkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBhbGxvd01lc3NhZ2UgPSAkc2VsZWN0LmZpbmQoYG9wdGlvblt2YWx1ZT0ke2lkfV1gKS5kYXRhKCdhbGxvd01lc3NhZ2UnKTtcblxuICAgICAgICAgICAgJChgLmdpZnRXcmFwcGluZy1pbWFnZS0ke2luZGV4fWApLmhpZGUoKTtcbiAgICAgICAgICAgICQoYCNnaWZ0V3JhcHBpbmctaW1hZ2UtJHtpbmRleH0tJHtpZH1gKS5zaG93KCk7XG5cbiAgICAgICAgICAgIGlmIChhbGxvd01lc3NhZ2UpIHtcbiAgICAgICAgICAgICAgICAkKGAjZ2lmdFdyYXBwaW5nLW1lc3NhZ2UtJHtpbmRleH1gKS5zaG93KCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICQoYCNnaWZ0V3JhcHBpbmctbWVzc2FnZS0ke2luZGV4fWApLmhpZGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgJCgnLmdpZnRXcmFwcGluZy1zZWxlY3QnKS50cmlnZ2VyKCdjaGFuZ2UnKTtcblxuICAgICAgICBmdW5jdGlvbiB0b2dnbGVWaWV3cygpIHtcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gJCgnaW5wdXQ6cmFkaW9bbmFtZSA9XCJnaWZ0d3JhcHR5cGVcIl06Y2hlY2tlZCcpLnZhbCgpO1xuICAgICAgICAgICAgY29uc3QgJHNpbmdsZUZvcm0gPSAkKCcuZ2lmdFdyYXBwaW5nLXNpbmdsZScpO1xuICAgICAgICAgICAgY29uc3QgJG11bHRpRm9ybSA9ICQoJy5naWZ0V3JhcHBpbmctbXVsdGlwbGUnKTtcblxuICAgICAgICAgICAgaWYgKHZhbHVlID09PSAnc2FtZScpIHtcbiAgICAgICAgICAgICAgICAkc2luZ2xlRm9ybS5zaG93KCk7XG4gICAgICAgICAgICAgICAgJG11bHRpRm9ybS5oaWRlKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICRzaW5nbGVGb3JtLmhpZGUoKTtcbiAgICAgICAgICAgICAgICAkbXVsdGlGb3JtLnNob3coKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgICQoJ1tuYW1lPVwiZ2lmdHdyYXB0eXBlXCJdJykub24oJ2NsaWNrJywgdG9nZ2xlVmlld3MpO1xuXG4gICAgICAgIHRvZ2dsZVZpZXdzKCk7XG4gICAgfVxuXG4gICAgYmluZEV2ZW50cygpIHtcbiAgICAgICAgdGhpcy5iaW5kQ2FydEV2ZW50cygpO1xuICAgICAgICB0aGlzLmJpbmRQcm9tb0NvZGVFdmVudHMoKTtcbiAgICAgICAgdGhpcy5iaW5kR2lmdFdyYXBwaW5nRXZlbnRzKCk7XG4gICAgICAgIHRoaXMuYmluZEdpZnRDZXJ0aWZpY2F0ZUV2ZW50cygpO1xuXG4gICAgICAgIC8vIGluaXRpYXRlIHNoaXBwaW5nIGVzdGltYXRvciBtb2R1bGVcbiAgICAgICAgY29uc3Qgc2hpcHBpbmdFcnJvck1lc3NhZ2VzID0ge1xuICAgICAgICAgICAgY291bnRyeTogdGhpcy5jb250ZXh0LnNoaXBwaW5nQ291bnRyeUVycm9yTWVzc2FnZSxcbiAgICAgICAgICAgIHByb3ZpbmNlOiB0aGlzLmNvbnRleHQuc2hpcHBpbmdQcm92aW5jZUVycm9yTWVzc2FnZSxcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5zaGlwcGluZ0VzdGltYXRvciA9IG5ldyBTaGlwcGluZ0VzdGltYXRvcigkKCdbZGF0YS1zaGlwcGluZy1lc3RpbWF0b3JdJyksIHNoaXBwaW5nRXJyb3JNZXNzYWdlcyk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHN0YXRlQ291bnRyeSBmcm9tICcuLi9jb21tb24vc3RhdGUtY291bnRyeSc7XG5pbXBvcnQgbm9kIGZyb20gJy4uL2NvbW1vbi9ub2QnO1xuaW1wb3J0IHV0aWxzIGZyb20gJ0BiaWdjb21tZXJjZS9zdGVuY2lsLXV0aWxzJztcbmltcG9ydCB7IFZhbGlkYXRvcnMsIGFubm91bmNlSW5wdXRFcnJvck1lc3NhZ2UgfSBmcm9tICcuLi9jb21tb24vdXRpbHMvZm9ybS11dGlscyc7XG5pbXBvcnQgY29sbGFwc2libGVGYWN0b3J5IGZyb20gJy4uL2NvbW1vbi9jb2xsYXBzaWJsZSc7XG5pbXBvcnQgeyBzaG93QWxlcnRNb2RhbCB9IGZyb20gJy4uL2dsb2JhbC9tb2RhbCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNoaXBwaW5nRXN0aW1hdG9yIHtcbiAgICBjb25zdHJ1Y3RvcigkZWxlbWVudCwgc2hpcHBpbmdFcnJvck1lc3NhZ2VzKSB7XG4gICAgICAgIHRoaXMuJGVsZW1lbnQgPSAkZWxlbWVudDtcblxuICAgICAgICB0aGlzLiRzdGF0ZSA9ICQoJ1tkYXRhLWZpZWxkLXR5cGU9XCJTdGF0ZVwiXScsIHRoaXMuJGVsZW1lbnQpO1xuICAgICAgICB0aGlzLmlzRXN0aW1hdG9yRm9ybU9wZW5lZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLnNoaXBwaW5nRXJyb3JNZXNzYWdlcyA9IHNoaXBwaW5nRXJyb3JNZXNzYWdlcztcbiAgICAgICAgdGhpcy5pbml0Rm9ybVZhbGlkYXRpb24oKTtcbiAgICAgICAgdGhpcy5iaW5kU3RhdGVDb3VudHJ5Q2hhbmdlKCk7XG4gICAgICAgIHRoaXMuYmluZEVzdGltYXRvckV2ZW50cygpO1xuICAgIH1cblxuICAgIGluaXRGb3JtVmFsaWRhdGlvbigpIHtcbiAgICAgICAgY29uc3Qgc2hpcHBpbmdFc3RpbWF0b3JBbGVydCA9ICQoJy5zaGlwcGluZy1xdW90ZXMnKTtcblxuICAgICAgICB0aGlzLnNoaXBwaW5nRXN0aW1hdG9yID0gJ2Zvcm1bZGF0YS1zaGlwcGluZy1lc3RpbWF0b3JdJztcbiAgICAgICAgdGhpcy5zaGlwcGluZ1ZhbGlkYXRvciA9IG5vZCh7XG4gICAgICAgICAgICBzdWJtaXQ6IGAke3RoaXMuc2hpcHBpbmdFc3RpbWF0b3J9IC5zaGlwcGluZy1lc3RpbWF0ZS1zdWJtaXRgLFxuICAgICAgICAgICAgdGFwOiBhbm5vdW5jZUlucHV0RXJyb3JNZXNzYWdlLFxuICAgICAgICB9KTtcblxuICAgICAgICAkKCcuc2hpcHBpbmctZXN0aW1hdGUtc3VibWl0JywgdGhpcy4kZWxlbWVudCkub24oJ2NsaWNrJywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgLy8gZXN0aW1hdG9yIGVycm9yIG1lc3NhZ2VzIGFyZSBiZWluZyBpbmplY3RlZCBpbiBodG1sIGFzIGEgcmVzdWx0XG4gICAgICAgICAgICAvLyBvZiB1c2VyIHN1Ym1pdDsgY2xlYXJpbmcgYW5kIGFkZGluZyByb2xlIG9uIHN1Ym1pdCBwcm92aWRlc1xuICAgICAgICAgICAgLy8gcmVndWxhciBhbm5vdW5jZW1lbnQgb2YgdGhlc2UgZXJyb3IgbWVzc2FnZXNcbiAgICAgICAgICAgIGlmIChzaGlwcGluZ0VzdGltYXRvckFsZXJ0LmF0dHIoJ3JvbGUnKSkge1xuICAgICAgICAgICAgICAgIHNoaXBwaW5nRXN0aW1hdG9yQWxlcnQucmVtb3ZlQXR0cigncm9sZScpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzaGlwcGluZ0VzdGltYXRvckFsZXJ0LmF0dHIoJ3JvbGUnLCAnYWxlcnQnKTtcbiAgICAgICAgICAgIC8vIFdoZW4gc3dpdGNoaW5nIGJldHdlZW4gY291bnRyaWVzLCB0aGUgc3RhdGUvcmVnaW9uIGlzIGR5bmFtaWNcbiAgICAgICAgICAgIC8vIE9ubHkgcGVyZm9ybSBhIGNoZWNrIGZvciBhbGwgZmllbGRzIHdoZW4gY291bnRyeSBoYXMgYSB2YWx1ZVxuICAgICAgICAgICAgLy8gT3RoZXJ3aXNlIGFyZUFsbCgndmFsaWQnKSB3aWxsIGNoZWNrIGNvdW50cnkgZm9yIHZhbGlkaXR5XG4gICAgICAgICAgICBpZiAoJChgJHt0aGlzLnNoaXBwaW5nRXN0aW1hdG9yfSBzZWxlY3RbbmFtZT1cInNoaXBwaW5nLWNvdW50cnlcIl1gKS52YWwoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2hpcHBpbmdWYWxpZGF0b3IucGVyZm9ybUNoZWNrKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnNoaXBwaW5nVmFsaWRhdG9yLmFyZUFsbCgndmFsaWQnKSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5iaW5kVmFsaWRhdGlvbigpO1xuICAgICAgICB0aGlzLmJpbmRTdGF0ZVZhbGlkYXRpb24oKTtcbiAgICAgICAgdGhpcy5iaW5kVVBTUmF0ZXMoKTtcbiAgICB9XG5cbiAgICBiaW5kVmFsaWRhdGlvbigpIHtcbiAgICAgICAgdGhpcy5zaGlwcGluZ1ZhbGlkYXRvci5hZGQoW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHNlbGVjdG9yOiBgJHt0aGlzLnNoaXBwaW5nRXN0aW1hdG9yfSBzZWxlY3RbbmFtZT1cInNoaXBwaW5nLWNvdW50cnlcIl1gLFxuICAgICAgICAgICAgICAgIHZhbGlkYXRlOiAoY2IsIHZhbCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBjb3VudHJ5SWQgPSBOdW1iZXIodmFsKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gY291bnRyeUlkICE9PSAwICYmICFOdW1iZXIuaXNOYU4oY291bnRyeUlkKTtcblxuICAgICAgICAgICAgICAgICAgICBjYihyZXN1bHQpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiB0aGlzLnNoaXBwaW5nRXJyb3JNZXNzYWdlcy5jb3VudHJ5LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgXSk7XG4gICAgfVxuXG4gICAgYmluZFN0YXRlVmFsaWRhdGlvbigpIHtcbiAgICAgICAgdGhpcy5zaGlwcGluZ1ZhbGlkYXRvci5hZGQoW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHNlbGVjdG9yOiAkKGAke3RoaXMuc2hpcHBpbmdFc3RpbWF0b3J9IHNlbGVjdFtuYW1lPVwic2hpcHBpbmctc3RhdGVcIl1gKSxcbiAgICAgICAgICAgICAgICB2YWxpZGF0ZTogKGNiKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGxldCByZXN1bHQ7XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgJGVsZSA9ICQoYCR7dGhpcy5zaGlwcGluZ0VzdGltYXRvcn0gc2VsZWN0W25hbWU9XCJzaGlwcGluZy1zdGF0ZVwiXWApO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICgkZWxlLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZWxlVmFsID0gJGVsZS52YWwoKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gZWxlVmFsICYmIGVsZVZhbC5sZW5ndGggJiYgZWxlVmFsICE9PSAnU3RhdGUvcHJvdmluY2UnO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgY2IocmVzdWx0KTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZTogdGhpcy5zaGlwcGluZ0Vycm9yTWVzc2FnZXMucHJvdmluY2UsXG4gICAgICAgICAgICB9LFxuICAgICAgICBdKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUb2dnbGUgYmV0d2VlbiBkZWZhdWx0IHNoaXBwaW5nIGFuZCB1cHMgc2hpcHBpbmcgcmF0ZXNcbiAgICAgKi9cbiAgICBiaW5kVVBTUmF0ZXMoKSB7XG4gICAgICAgIGNvbnN0IFVQU1JhdGVUb2dnbGUgPSAnLmVzdGltYXRvci1mb3JtLXRvZ2dsZVVQU1JhdGUnO1xuXG4gICAgICAgICQoJ2JvZHknKS5vbignY2xpY2snLCBVUFNSYXRlVG9nZ2xlLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0ICRlc3RpbWF0b3JGb3JtVXBzID0gJCgnLmVzdGltYXRvci1mb3JtLS11cHMnKTtcbiAgICAgICAgICAgIGNvbnN0ICRlc3RpbWF0b3JGb3JtRGVmYXVsdCA9ICQoJy5lc3RpbWF0b3ItZm9ybS0tZGVmYXVsdCcpO1xuXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAkZXN0aW1hdG9yRm9ybVVwcy50b2dnbGVDbGFzcygndS1oaWRkZW5WaXN1YWxseScpO1xuICAgICAgICAgICAgJGVzdGltYXRvckZvcm1EZWZhdWx0LnRvZ2dsZUNsYXNzKCd1LWhpZGRlblZpc3VhbGx5Jyk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGJpbmRTdGF0ZUNvdW50cnlDaGFuZ2UoKSB7XG4gICAgICAgIGxldCAkbGFzdDtcblxuICAgICAgICAvLyBSZXF1ZXN0cyB0aGUgc3RhdGVzIGZvciBhIGNvdW50cnkgd2l0aCBBSkFYXG4gICAgICAgIHN0YXRlQ291bnRyeSh0aGlzLiRzdGF0ZSwgdGhpcy5jb250ZXh0LCB7IHVzZUlkRm9yU3RhdGVzOiB0cnVlIH0sIChlcnIsIGZpZWxkKSA9PiB7XG4gICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgc2hvd0FsZXJ0TW9kYWwoZXJyKTtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgJGZpZWxkID0gJChmaWVsZCk7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnNoaXBwaW5nVmFsaWRhdG9yLmdldFN0YXR1cyh0aGlzLiRzdGF0ZSkgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zaGlwcGluZ1ZhbGlkYXRvci5yZW1vdmUodGhpcy4kc3RhdGUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoJGxhc3QpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNoaXBwaW5nVmFsaWRhdG9yLnJlbW92ZSgkbGFzdCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICgkZmllbGQuaXMoJ3NlbGVjdCcpKSB7XG4gICAgICAgICAgICAgICAgJGxhc3QgPSBmaWVsZDtcbiAgICAgICAgICAgICAgICB0aGlzLmJpbmRTdGF0ZVZhbGlkYXRpb24oKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJGZpZWxkLmF0dHIoJ3BsYWNlaG9sZGVyJywgJ1N0YXRlL3Byb3ZpbmNlJyk7XG4gICAgICAgICAgICAgICAgVmFsaWRhdG9ycy5jbGVhblVwU3RhdGVWYWxpZGF0aW9uKGZpZWxkKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gV2hlbiB5b3UgY2hhbmdlIGEgY291bnRyeSwgeW91IHN3YXAgdGhlIHN0YXRlL3Byb3ZpbmNlIGJldHdlZW4gYW4gaW5wdXQgYW5kIGEgc2VsZWN0IGRyb3Bkb3duXG4gICAgICAgICAgICAvLyBOb3QgYWxsIGNvdW50cmllcyByZXF1aXJlIHRoZSBwcm92aW5jZSB0byBiZSBmaWxsZWRcbiAgICAgICAgICAgIC8vIFdlIGhhdmUgdG8gcmVtb3ZlIHRoaXMgY2xhc3Mgd2hlbiB3ZSBzd2FwIHNpbmNlIG5vZCB2YWxpZGF0aW9uIGRvZXNuJ3QgY2xlYW51cCBmb3IgdXNcbiAgICAgICAgICAgICQodGhpcy5zaGlwcGluZ0VzdGltYXRvcikuZmluZCgnLmZvcm0tZmllbGQtLXN1Y2Nlc3MnKS5yZW1vdmVDbGFzcygnZm9ybS1maWVsZC0tc3VjY2VzcycpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICB0b2dnbGVFc3RpbWF0b3JGb3JtU3RhdGUodG9nZ2xlQnV0dG9uLCBidXR0b25TZWxlY3RvciwgJHRvZ2dsZUNvbnRhaW5lcikge1xuICAgICAgICBjb25zdCBjaGFuZ2VBdHRyaWJ1dGVzT25Ub2dnbGUgPSAoc2VsZWN0b3JUb0FjdGl2YXRlKSA9PiB7XG4gICAgICAgICAgICAkKHRvZ2dsZUJ1dHRvbikuYXR0cignYXJpYS1sYWJlbGxlZGJ5Jywgc2VsZWN0b3JUb0FjdGl2YXRlKTtcbiAgICAgICAgICAgICQoYnV0dG9uU2VsZWN0b3IpLnRleHQoJChgIyR7c2VsZWN0b3JUb0FjdGl2YXRlfWApLnRleHQoKSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKCF0aGlzLmlzRXN0aW1hdG9yRm9ybU9wZW5lZCkge1xuICAgICAgICAgICAgY2hhbmdlQXR0cmlidXRlc09uVG9nZ2xlKCdlc3RpbWF0b3ItY2xvc2UnKTtcbiAgICAgICAgICAgICR0b2dnbGVDb250YWluZXIucmVtb3ZlQ2xhc3MoJ3UtaGlkZGVuJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjaGFuZ2VBdHRyaWJ1dGVzT25Ub2dnbGUoJ2VzdGltYXRvci1hZGQnKTtcbiAgICAgICAgICAgICR0b2dnbGVDb250YWluZXIuYWRkQ2xhc3MoJ3UtaGlkZGVuJyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5pc0VzdGltYXRvckZvcm1PcGVuZWQgPSAhdGhpcy5pc0VzdGltYXRvckZvcm1PcGVuZWQ7XG4gICAgfVxuXG4gICAgYmluZEVzdGltYXRvckV2ZW50cygpIHtcbiAgICAgICAgY29uc3QgJGVzdGltYXRvckNvbnRhaW5lciA9ICQoJy5zaGlwcGluZy1lc3RpbWF0b3InKTtcbiAgICAgICAgY29uc3QgJGVzdGltYXRvckZvcm0gPSAkKCcuZXN0aW1hdG9yLWZvcm0nKTtcbiAgICAgICAgY29sbGFwc2libGVGYWN0b3J5KCk7XG4gICAgICAgICRlc3RpbWF0b3JGb3JtLm9uKCdzdWJtaXQnLCBldmVudCA9PiB7XG4gICAgICAgICAgICBjb25zdCBwYXJhbXMgPSB7XG4gICAgICAgICAgICAgICAgY291bnRyeV9pZDogJCgnW25hbWU9XCJzaGlwcGluZy1jb3VudHJ5XCJdJywgJGVzdGltYXRvckZvcm0pLnZhbCgpLFxuICAgICAgICAgICAgICAgIHN0YXRlX2lkOiAkKCdbbmFtZT1cInNoaXBwaW5nLXN0YXRlXCJdJywgJGVzdGltYXRvckZvcm0pLnZhbCgpLFxuICAgICAgICAgICAgICAgIGNpdHk6ICQoJ1tuYW1lPVwic2hpcHBpbmctY2l0eVwiXScsICRlc3RpbWF0b3JGb3JtKS52YWwoKSxcbiAgICAgICAgICAgICAgICB6aXBfY29kZTogJCgnW25hbWU9XCJzaGlwcGluZy16aXBcIl0nLCAkZXN0aW1hdG9yRm9ybSkudmFsKCksXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICB1dGlscy5hcGkuY2FydC5nZXRTaGlwcGluZ1F1b3RlcyhwYXJhbXMsICdjYXJ0L3NoaXBwaW5nLXF1b3RlcycsIChlcnIsIHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgJCgnLnNoaXBwaW5nLXF1b3RlcycpLmh0bWwocmVzcG9uc2UuY29udGVudCk7XG5cbiAgICAgICAgICAgICAgICAvLyBiaW5kIHRoZSBzZWxlY3QgYnV0dG9uXG4gICAgICAgICAgICAgICAgJCgnLnNlbGVjdC1zaGlwcGluZy1xdW90ZScpLm9uKCdjbGljaycsIGNsaWNrRXZlbnQgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBxdW90ZUlkID0gJCgnLnNoaXBwaW5nLXF1b3RlOmNoZWNrZWQnKS52YWwoKTtcblxuICAgICAgICAgICAgICAgICAgICBjbGlja0V2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuYXBpLmNhcnQuc3VibWl0U2hpcHBpbmdRdW90ZShxdW90ZUlkLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoJy5zaGlwcGluZy1lc3RpbWF0ZS1zaG93Jykub24oJ2NsaWNrJywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHRoaXMudG9nZ2xlRXN0aW1hdG9yRm9ybVN0YXRlKGV2ZW50LmN1cnJlbnRUYXJnZXQsICcuc2hpcHBpbmctZXN0aW1hdGUtc2hvd19fYnRuLW5hbWUnLCAkZXN0aW1hdG9yQ29udGFpbmVyKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHV0aWxzIGZyb20gJ0BiaWdjb21tZXJjZS9zdGVuY2lsLXV0aWxzJztcbmltcG9ydCBQcm9kdWN0RGV0YWlsc0Jhc2UsIHsgb3B0aW9uQ2hhbmdlRGVjb3JhdG9yIH0gZnJvbSAnLi9wcm9kdWN0LWRldGFpbHMtYmFzZSc7XG5pbXBvcnQgeyBpc0VtcHR5IH0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7IGlzQnJvd3NlcklFLCBjb252ZXJ0SW50b0FycmF5IH0gZnJvbSAnLi91dGlscy9pZS1oZWxwZXJzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FydEl0ZW1EZXRhaWxzIGV4dGVuZHMgUHJvZHVjdERldGFpbHNCYXNlIHtcbiAgICBjb25zdHJ1Y3Rvcigkc2NvcGUsIGNvbnRleHQsIHByb2R1Y3RBdHRyaWJ1dGVzRGF0YSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKCRzY29wZSwgY29udGV4dCk7XG5cbiAgICAgICAgY29uc3QgJGZvcm0gPSAkKCcjQ2FydEVkaXRQcm9kdWN0RmllbGRzRm9ybScsIHRoaXMuJHNjb3BlKTtcbiAgICAgICAgY29uc3QgJHByb2R1Y3RPcHRpb25zRWxlbWVudCA9ICQoJ1tkYXRhLXByb2R1Y3QtYXR0cmlidXRlcy13cmFwcGVyXScsICRmb3JtKTtcbiAgICAgICAgY29uc3QgaGFzT3B0aW9ucyA9ICRwcm9kdWN0T3B0aW9uc0VsZW1lbnQuaHRtbCgpLnRyaW0oKS5sZW5ndGg7XG4gICAgICAgIGNvbnN0IGhhc0RlZmF1bHRPcHRpb25zID0gJHByb2R1Y3RPcHRpb25zRWxlbWVudC5maW5kKCdbZGF0YS1kZWZhdWx0XScpLmxlbmd0aDtcblxuICAgICAgICAkcHJvZHVjdE9wdGlvbnNFbGVtZW50Lm9uKCdjaGFuZ2UnLCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNldFByb2R1Y3RWYXJpYW50KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IG9wdGlvbkNoYW5nZUNhbGxiYWNrID0gb3B0aW9uQ2hhbmdlRGVjb3JhdG9yLmNhbGwodGhpcywgaGFzRGVmYXVsdE9wdGlvbnMpO1xuXG4gICAgICAgIC8vIFVwZGF0ZSBwcm9kdWN0IGF0dHJpYnV0ZXMuIEFsc28gdXBkYXRlIHRoZSBpbml0aWFsIHZpZXcgaW4gY2FzZSBpdGVtcyBhcmUgb29zXG4gICAgICAgIC8vIG9yIGhhdmUgZGVmYXVsdCB2YXJpYW50IHByb3BlcnRpZXMgdGhhdCBjaGFuZ2UgdGhlIHZpZXdcbiAgICAgICAgaWYgKChpc0VtcHR5KHByb2R1Y3RBdHRyaWJ1dGVzRGF0YSkgfHwgaGFzRGVmYXVsdE9wdGlvbnMpICYmIGhhc09wdGlvbnMpIHtcbiAgICAgICAgICAgIGNvbnN0IHByb2R1Y3RJZCA9IHRoaXMuY29udGV4dC5wcm9kdWN0Rm9yQ2hhbmdlSWQ7XG5cbiAgICAgICAgICAgIHV0aWxzLmFwaS5wcm9kdWN0QXR0cmlidXRlcy5vcHRpb25DaGFuZ2UocHJvZHVjdElkLCAkZm9ybS5zZXJpYWxpemUoKSwgJ3Byb2R1Y3RzL2J1bGstZGlzY291bnQtcmF0ZXMnLCBvcHRpb25DaGFuZ2VDYWxsYmFjayk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVByb2R1Y3RBdHRyaWJ1dGVzKHByb2R1Y3RBdHRyaWJ1dGVzRGF0YSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRQcm9kdWN0VmFyaWFudCgpIHtcbiAgICAgICAgY29uc3QgdW5zYXRpc2ZpZWRSZXF1aXJlZEZpZWxkcyA9IFtdO1xuICAgICAgICBjb25zdCBvcHRpb25zID0gW107XG5cbiAgICAgICAgJC5lYWNoKCQoJ1tkYXRhLXByb2R1Y3QtYXR0cmlidXRlXScpLCAoaW5kZXgsIHZhbHVlKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBvcHRpb25MYWJlbCA9IHZhbHVlLmNoaWxkcmVuWzBdLmlubmVyVGV4dDtcbiAgICAgICAgICAgIGNvbnN0IG9wdGlvblRpdGxlID0gb3B0aW9uTGFiZWwuc3BsaXQoJzonKVswXS50cmltKCk7XG4gICAgICAgICAgICBjb25zdCByZXF1aXJlZCA9IG9wdGlvbkxhYmVsLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoJ3JlcXVpcmVkJyk7XG4gICAgICAgICAgICBjb25zdCB0eXBlID0gdmFsdWUuZ2V0QXR0cmlidXRlKCdkYXRhLXByb2R1Y3QtYXR0cmlidXRlJyk7XG5cbiAgICAgICAgICAgIGlmICgodHlwZSA9PT0gJ2lucHV0LWZpbGUnIHx8IHR5cGUgPT09ICdpbnB1dC10ZXh0JyB8fCB0eXBlID09PSAnaW5wdXQtbnVtYmVyJykgJiYgdmFsdWUucXVlcnlTZWxlY3RvcignaW5wdXQnKS52YWx1ZSA9PT0gJycgJiYgcmVxdWlyZWQpIHtcbiAgICAgICAgICAgICAgICB1bnNhdGlzZmllZFJlcXVpcmVkRmllbGRzLnB1c2godmFsdWUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodHlwZSA9PT0gJ3RleHRhcmVhJyAmJiB2YWx1ZS5xdWVyeVNlbGVjdG9yKCd0ZXh0YXJlYScpLnZhbHVlID09PSAnJyAmJiByZXF1aXJlZCkge1xuICAgICAgICAgICAgICAgIHVuc2F0aXNmaWVkUmVxdWlyZWRGaWVsZHMucHVzaCh2YWx1ZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0eXBlID09PSAnZGF0ZScpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBpc1NhdGlzZmllZCA9IEFycmF5LmZyb20odmFsdWUucXVlcnlTZWxlY3RvckFsbCgnc2VsZWN0JykpLmV2ZXJ5KChzZWxlY3QpID0+IHNlbGVjdC5zZWxlY3RlZEluZGV4ICE9PSAwKTtcblxuICAgICAgICAgICAgICAgIGlmIChpc1NhdGlzZmllZCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBkYXRlU3RyaW5nID0gQXJyYXkuZnJvbSh2YWx1ZS5xdWVyeVNlbGVjdG9yQWxsKCdzZWxlY3QnKSkubWFwKCh4KSA9PiB4LnZhbHVlKS5qb2luKCctJyk7XG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnMucHVzaChgJHtvcHRpb25UaXRsZX06JHtkYXRlU3RyaW5nfWApO1xuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAocmVxdWlyZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdW5zYXRpc2ZpZWRSZXF1aXJlZEZpZWxkcy5wdXNoKHZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0eXBlID09PSAnc2V0LXNlbGVjdCcpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBzZWxlY3QgPSB2YWx1ZS5xdWVyeVNlbGVjdG9yKCdzZWxlY3QnKTtcbiAgICAgICAgICAgICAgICBjb25zdCBzZWxlY3RlZEluZGV4ID0gc2VsZWN0LnNlbGVjdGVkSW5kZXg7XG5cbiAgICAgICAgICAgICAgICBpZiAoc2VsZWN0ZWRJbmRleCAhPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBvcHRpb25zLnB1c2goYCR7b3B0aW9uVGl0bGV9OiR7c2VsZWN0Lm9wdGlvbnNbc2VsZWN0ZWRJbmRleF0uaW5uZXJUZXh0fWApO1xuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAocmVxdWlyZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdW5zYXRpc2ZpZWRSZXF1aXJlZEZpZWxkcy5wdXNoKHZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0eXBlID09PSAnc2V0LXJlY3RhbmdsZScgfHwgdHlwZSA9PT0gJ3NldC1yYWRpbycgfHwgdHlwZSA9PT0gJ3N3YXRjaCcgfHwgdHlwZSA9PT0gJ2lucHV0LWNoZWNrYm94JyB8fCB0eXBlID09PSAncHJvZHVjdC1saXN0Jykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNoZWNrZWQgPSB2YWx1ZS5xdWVyeVNlbGVjdG9yKCc6Y2hlY2tlZCcpO1xuICAgICAgICAgICAgICAgIGlmIChjaGVja2VkKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGdldFNlbGVjdGVkT3B0aW9uTGFiZWwgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwcm9kdWN0VmFyaWFudHNsaXN0ID0gY29udmVydEludG9BcnJheSh2YWx1ZS5jaGlsZHJlbik7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBtYXRjaExhYmVsRm9yQ2hlY2tlZElucHV0ID0gaW5wdCA9PiBpbnB0LmRhdGFzZXQucHJvZHVjdEF0dHJpYnV0ZVZhbHVlID09PSBjaGVja2VkLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHByb2R1Y3RWYXJpYW50c2xpc3QuZmlsdGVyKG1hdGNoTGFiZWxGb3JDaGVja2VkSW5wdXQpWzBdO1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZSA9PT0gJ3NldC1yZWN0YW5nbGUnIHx8IHR5cGUgPT09ICdzZXQtcmFkaW8nIHx8IHR5cGUgPT09ICdwcm9kdWN0LWxpc3QnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBsYWJlbCA9IGlzQnJvd3NlcklFID8gZ2V0U2VsZWN0ZWRPcHRpb25MYWJlbCgpLmlubmVyVGV4dC50cmltKCkgOiBjaGVja2VkLmxhYmVsc1swXS5pbm5lclRleHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zLnB1c2goYCR7b3B0aW9uVGl0bGV9OiR7bGFiZWx9YCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZSA9PT0gJ3N3YXRjaCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGxhYmVsID0gaXNCcm93c2VySUUgPyBnZXRTZWxlY3RlZE9wdGlvbkxhYmVsKCkuY2hpbGRyZW5bMF0gOiBjaGVja2VkLmxhYmVsc1swXS5jaGlsZHJlblswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnMucHVzaChgJHtvcHRpb25UaXRsZX06JHtsYWJlbC50aXRsZX1gKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlID09PSAnaW5wdXQtY2hlY2tib3gnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zLnB1c2goYCR7b3B0aW9uVGl0bGV9Olllc2ApO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICh0eXBlID09PSAnaW5wdXQtY2hlY2tib3gnKSB7XG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnMucHVzaChgJHtvcHRpb25UaXRsZX06Tm9gKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAocmVxdWlyZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdW5zYXRpc2ZpZWRSZXF1aXJlZEZpZWxkcy5wdXNoKHZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGxldCBwcm9kdWN0VmFyaWFudCA9IHVuc2F0aXNmaWVkUmVxdWlyZWRGaWVsZHMubGVuZ3RoID09PSAwID8gb3B0aW9ucy5zb3J0KCkuam9pbignLCAnKSA6ICd1bnNhdGlzZmllZCc7XG4gICAgICAgIGNvbnN0IHZpZXcgPSAkKCcubW9kYWwtaGVhZGVyLXRpdGxlJyk7XG5cbiAgICAgICAgaWYgKHByb2R1Y3RWYXJpYW50KSB7XG4gICAgICAgICAgICBwcm9kdWN0VmFyaWFudCA9IHByb2R1Y3RWYXJpYW50ID09PSAndW5zYXRpc2ZpZWQnID8gJycgOiBwcm9kdWN0VmFyaWFudDtcbiAgICAgICAgICAgIGlmICh2aWV3LmF0dHIoJ2RhdGEtZXZlbnQtdHlwZScpKSB7XG4gICAgICAgICAgICAgICAgdmlldy5hdHRyKCdkYXRhLXByb2R1Y3QtdmFyaWFudCcsIHByb2R1Y3RWYXJpYW50KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcHJvZHVjdE5hbWUgPSB2aWV3Lmh0bWwoKS5tYXRjaCgvJyguKj8pJy8pWzFdO1xuICAgICAgICAgICAgICAgIGNvbnN0IGNhcmQgPSAkKGBbZGF0YS1uYW1lPVwiJHtwcm9kdWN0TmFtZX1cIl1gKTtcbiAgICAgICAgICAgICAgICBjYXJkLmF0dHIoJ2RhdGEtcHJvZHVjdC12YXJpYW50JywgcHJvZHVjdFZhcmlhbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSGlkZSBvciBtYXJrIGFzIHVuYXZhaWxhYmxlIG91dCBvZiBzdG9jayBhdHRyaWJ1dGVzIGlmIGVuYWJsZWRcbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IGRhdGEgUHJvZHVjdCBhdHRyaWJ1dGUgZGF0YVxuICAgICAqL1xuICAgIHVwZGF0ZVByb2R1Y3RBdHRyaWJ1dGVzKGRhdGEpIHtcbiAgICAgICAgc3VwZXIudXBkYXRlUHJvZHVjdEF0dHJpYnV0ZXMoZGF0YSk7XG5cbiAgICAgICAgdGhpcy4kc2NvcGUuZmluZCgnLm1vZGFsLWNvbnRlbnQnKS5yZW1vdmVDbGFzcygnaGlkZS1jb250ZW50Jyk7XG4gICAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKGNlcnQpIHtcbiAgICBpZiAodHlwZW9mIGNlcnQgIT09ICdzdHJpbmcnIHx8IGNlcnQubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvLyBBZGQgYW55IGN1c3RvbSBnaWZ0IGNlcnRpZmljYXRlIHZhbGlkYXRpb24gbG9naWMgaGVyZVxuICAgIHJldHVybiB0cnVlO1xufVxuIiwiaW1wb3J0IHV0aWxzIGZyb20gJ0BiaWdjb21tZXJjZS9zdGVuY2lsLXV0aWxzJztcbmltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyBpbnNlcnRTdGF0ZUhpZGRlbkZpZWxkIH0gZnJvbSAnLi91dGlscy9mb3JtLXV0aWxzJztcbmltcG9ydCB7IHNob3dBbGVydE1vZGFsIH0gZnJvbSAnLi4vZ2xvYmFsL21vZGFsJztcblxuLyoqXG4gKiBJZiB0aGVyZSBhcmUgbm8gb3B0aW9ucyBmcm9tIGJjYXBwLCBhIHRleHQgZmllbGQgd2lsbCBiZSBzZW50LiBUaGlzIHdpbGwgY3JlYXRlIGEgc2VsZWN0IGVsZW1lbnQgdG8gaG9sZCBvcHRpb25zIGFmdGVyIHRoZSByZW1vdGUgcmVxdWVzdC5cbiAqIEByZXR1cm5zIHtqUXVlcnl8SFRNTEVsZW1lbnR9XG4gKi9cbmZ1bmN0aW9uIG1ha2VTdGF0ZVJlcXVpcmVkKHN0YXRlRWxlbWVudCwgY29udGV4dCkge1xuICAgIGNvbnN0IGF0dHJzID0gXy50cmFuc2Zvcm0oc3RhdGVFbGVtZW50LnByb3AoJ2F0dHJpYnV0ZXMnKSwgKHJlc3VsdCwgaXRlbSkgPT4ge1xuICAgICAgICBjb25zdCByZXQgPSByZXN1bHQ7XG4gICAgICAgIHJldFtpdGVtLm5hbWVdID0gaXRlbS52YWx1ZTtcbiAgICAgICAgcmV0dXJuIHJldDtcbiAgICB9KTtcblxuICAgIGNvbnN0IHJlcGxhY2VtZW50QXR0cmlidXRlcyA9IHtcbiAgICAgICAgaWQ6IGF0dHJzLmlkLFxuICAgICAgICAnZGF0YS1sYWJlbCc6IGF0dHJzWydkYXRhLWxhYmVsJ10sXG4gICAgICAgIGNsYXNzOiAnZm9ybS1zZWxlY3QnLFxuICAgICAgICBuYW1lOiBhdHRycy5uYW1lLFxuICAgICAgICAnZGF0YS1maWVsZC10eXBlJzogYXR0cnNbJ2RhdGEtZmllbGQtdHlwZSddLFxuICAgIH07XG5cbiAgICBzdGF0ZUVsZW1lbnQucmVwbGFjZVdpdGgoJCgnPHNlbGVjdD48L3NlbGVjdD4nLCByZXBsYWNlbWVudEF0dHJpYnV0ZXMpKTtcblxuICAgIGNvbnN0ICRuZXdFbGVtZW50ID0gJCgnW2RhdGEtZmllbGQtdHlwZT1cIlN0YXRlXCJdJyk7XG4gICAgY29uc3QgJGhpZGRlbklucHV0ID0gJCgnW25hbWUqPVwiRm9ybUZpZWxkSXNUZXh0XCJdJyk7XG5cbiAgICBpZiAoJGhpZGRlbklucHV0Lmxlbmd0aCAhPT0gMCkge1xuICAgICAgICAkaGlkZGVuSW5wdXQucmVtb3ZlKCk7XG4gICAgfVxuXG4gICAgaWYgKCRuZXdFbGVtZW50LnByZXYoKS5maW5kKCdzbWFsbCcpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAvLyBTdHJpbmcgaXMgaW5qZWN0ZWQgZnJvbSBsb2NhbGl6ZXJcbiAgICAgICAgJG5ld0VsZW1lbnQucHJldigpLmFwcGVuZChgPHNtYWxsPiR7Y29udGV4dC5yZXF1aXJlZH08L3NtYWxsPmApO1xuICAgIH0gZWxzZSB7XG4gICAgICAgICRuZXdFbGVtZW50LnByZXYoKS5maW5kKCdzbWFsbCcpLnNob3coKTtcbiAgICB9XG5cbiAgICByZXR1cm4gJG5ld0VsZW1lbnQ7XG59XG5cbi8qKlxuICogSWYgYSBjb3VudHJ5IHdpdGggc3RhdGVzIGlzIHRoZSBkZWZhdWx0LCBhIHNlbGVjdCB3aWxsIGJlIHNlbnQsXG4gKiBJbiB0aGlzIGNhc2Ugd2UgbmVlZCB0byBiZSBhYmxlIHRvIHN3aXRjaCB0byBhbiBpbnB1dCBmaWVsZCBhbmQgaGlkZSB0aGUgcmVxdWlyZWQgZmllbGRcbiAqL1xuZnVuY3Rpb24gbWFrZVN0YXRlT3B0aW9uYWwoc3RhdGVFbGVtZW50KSB7XG4gICAgY29uc3QgYXR0cnMgPSBfLnRyYW5zZm9ybShzdGF0ZUVsZW1lbnQucHJvcCgnYXR0cmlidXRlcycpLCAocmVzdWx0LCBpdGVtKSA9PiB7XG4gICAgICAgIGNvbnN0IHJldCA9IHJlc3VsdDtcbiAgICAgICAgcmV0W2l0ZW0ubmFtZV0gPSBpdGVtLnZhbHVlO1xuXG4gICAgICAgIHJldHVybiByZXQ7XG4gICAgfSk7XG5cbiAgICBjb25zdCByZXBsYWNlbWVudEF0dHJpYnV0ZXMgPSB7XG4gICAgICAgIHR5cGU6ICd0ZXh0JyxcbiAgICAgICAgaWQ6IGF0dHJzLmlkLFxuICAgICAgICAnZGF0YS1sYWJlbCc6IGF0dHJzWydkYXRhLWxhYmVsJ10sXG4gICAgICAgIGNsYXNzOiAnZm9ybS1pbnB1dCcsXG4gICAgICAgIG5hbWU6IGF0dHJzLm5hbWUsXG4gICAgICAgICdkYXRhLWZpZWxkLXR5cGUnOiBhdHRyc1snZGF0YS1maWVsZC10eXBlJ10sXG4gICAgfTtcblxuICAgIHN0YXRlRWxlbWVudC5yZXBsYWNlV2l0aCgkKCc8aW5wdXQgLz4nLCByZXBsYWNlbWVudEF0dHJpYnV0ZXMpKTtcblxuICAgIGNvbnN0ICRuZXdFbGVtZW50ID0gJCgnW2RhdGEtZmllbGQtdHlwZT1cIlN0YXRlXCJdJyk7XG5cbiAgICBpZiAoJG5ld0VsZW1lbnQubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgIGluc2VydFN0YXRlSGlkZGVuRmllbGQoJG5ld0VsZW1lbnQpO1xuICAgICAgICAkbmV3RWxlbWVudC5wcmV2KCkuZmluZCgnc21hbGwnKS5oaWRlKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuICRuZXdFbGVtZW50O1xufVxuXG4vKipcbiAqIEFkZHMgdGhlIGFycmF5IG9mIG9wdGlvbnMgZnJvbSB0aGUgcmVtb3RlIHJlcXVlc3QgdG8gdGhlIG5ld2x5IGNyZWF0ZWQgc2VsZWN0IGJveC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBzdGF0ZXNBcnJheVxuICogQHBhcmFtIHtqUXVlcnl9ICRzZWxlY3RFbGVtZW50XG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICovXG5mdW5jdGlvbiBhZGRPcHRpb25zKHN0YXRlc0FycmF5LCAkc2VsZWN0RWxlbWVudCwgb3B0aW9ucykge1xuICAgIGNvbnN0IGNvbnRhaW5lciA9IFtdO1xuXG4gICAgY29udGFpbmVyLnB1c2goYDxvcHRpb24gdmFsdWU9XCJcIj4ke3N0YXRlc0FycmF5LnByZWZpeH08L29wdGlvbj5gKTtcblxuICAgIGlmICghXy5pc0VtcHR5KCRzZWxlY3RFbGVtZW50KSkge1xuICAgICAgICBzdGF0ZXNBcnJheS5zdGF0ZXMuZm9yRWFjaCgoc3RhdGVPYmopID0+IHtcbiAgICAgICAgICAgIGlmIChvcHRpb25zLnVzZUlkRm9yU3RhdGVzKSB7XG4gICAgICAgICAgICAgICAgY29udGFpbmVyLnB1c2goYDxvcHRpb24gdmFsdWU9XCIke3N0YXRlT2JqLmlkfVwiPiR7c3RhdGVPYmoubmFtZX08L29wdGlvbj5gKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29udGFpbmVyLnB1c2goYDxvcHRpb24gdmFsdWU9XCIke3N0YXRlT2JqLm5hbWV9XCI+JHtzdGF0ZU9iai5sYWJlbCA/IHN0YXRlT2JqLmxhYmVsIDogc3RhdGVPYmoubmFtZX08L29wdGlvbj5gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgJHNlbGVjdEVsZW1lbnQuaHRtbChjb250YWluZXIuam9pbignICcpKTtcbiAgICB9XG59XG5cbi8qKlxuICpcbiAqIEBwYXJhbSB7alF1ZXJ5fSBzdGF0ZUVsZW1lbnRcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb250ZXh0XG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHN0YXRlRWxlbWVudCwgY29udGV4dCA9IHt9LCBvcHRpb25zLCBjYWxsYmFjaykge1xuICAgIC8qKlxuICAgICAqIEJhY2t3YXJkcyBjb21wYXRpYmxlIGZvciB0aHJlZSBwYXJhbWV0ZXJzIGluc3RlYWQgb2YgZm91clxuICAgICAqXG4gICAgICogQXZhaWxhYmxlIG9wdGlvbnM6XG4gICAgICpcbiAgICAgKiB1c2VJZEZvclN0YXRlcyB7Qm9vbH0gLSBHZW5lcmF0ZXMgc3RhdGVzIGRyb3Bkb3duIHVzaW5nIGlkIGZvciB2YWx1ZXMgaW5zdGVhZCBvZiBzdHJpbmdzXG4gICAgICovXG4gICAgaWYgKHR5cGVvZiBvcHRpb25zID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIC8qIGVzbGludC1kaXNhYmxlIG5vLXBhcmFtLXJlYXNzaWduICovXG4gICAgICAgIGNhbGxiYWNrID0gb3B0aW9ucztcbiAgICAgICAgb3B0aW9ucyA9IHt9O1xuICAgICAgICAvKiBlc2xpbnQtZW5hYmxlIG5vLXBhcmFtLXJlYXNzaWduICovXG4gICAgfVxuXG4gICAgJCgnc2VsZWN0W2RhdGEtZmllbGQtdHlwZT1cIkNvdW50cnlcIl0nKS5vbignY2hhbmdlJywgZXZlbnQgPT4ge1xuICAgICAgICBjb25zdCBjb3VudHJ5TmFtZSA9ICQoZXZlbnQuY3VycmVudFRhcmdldCkudmFsKCk7XG5cbiAgICAgICAgaWYgKGNvdW50cnlOYW1lID09PSAnJykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdXRpbHMuYXBpLmNvdW50cnkuZ2V0QnlOYW1lKGNvdW50cnlOYW1lLCAoZXJyLCByZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgIHNob3dBbGVydE1vZGFsKGNvbnRleHQuc3RhdGVfZXJyb3IpO1xuICAgICAgICAgICAgICAgIHJldHVybiBjYWxsYmFjayhlcnIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCAkY3VycmVudElucHV0ID0gJCgnW2RhdGEtZmllbGQtdHlwZT1cIlN0YXRlXCJdJyk7XG5cbiAgICAgICAgICAgIGlmICghXy5pc0VtcHR5KHJlc3BvbnNlLmRhdGEuc3RhdGVzKSkge1xuICAgICAgICAgICAgICAgIC8vIFRoZSBlbGVtZW50IG1heSBoYXZlIGJlZW4gcmVwbGFjZWQgd2l0aCBhIHNlbGVjdCwgcmVzZWxlY3QgaXRcbiAgICAgICAgICAgICAgICBjb25zdCAkc2VsZWN0RWxlbWVudCA9IG1ha2VTdGF0ZVJlcXVpcmVkKCRjdXJyZW50SW5wdXQsIGNvbnRleHQpO1xuXG4gICAgICAgICAgICAgICAgYWRkT3B0aW9ucyhyZXNwb25zZS5kYXRhLCAkc2VsZWN0RWxlbWVudCwgb3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2sobnVsbCwgJHNlbGVjdEVsZW1lbnQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zdCBuZXdFbGVtZW50ID0gbWFrZVN0YXRlT3B0aW9uYWwoJGN1cnJlbnRJbnB1dCwgY29udGV4dCk7XG5cbiAgICAgICAgICAgICAgICBjYWxsYmFjayhudWxsLCBuZXdFbGVtZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7XG59XG4iLCJjb25zdCBUUkFOU0xBVElPTlMgPSAndHJhbnNsYXRpb25zJztcbmNvbnN0IGlzVHJhbnNsYXRpb25EaWN0aW9uYXJ5Tm90RW1wdHkgPSAoZGljdGlvbmFyeSkgPT4gISFPYmplY3Qua2V5cyhkaWN0aW9uYXJ5W1RSQU5TTEFUSU9OU10pLmxlbmd0aDtcbmNvbnN0IGNob29zZUFjdGl2ZURpY3Rpb25hcnkgPSAoLi4uZGljdGlvbmFyeUpzb25MaXN0KSA9PiB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkaWN0aW9uYXJ5SnNvbkxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgZGljdGlvbmFyeSA9IEpTT04ucGFyc2UoZGljdGlvbmFyeUpzb25MaXN0W2ldKTtcbiAgICAgICAgaWYgKGlzVHJhbnNsYXRpb25EaWN0aW9uYXJ5Tm90RW1wdHkoZGljdGlvbmFyeSkpIHtcbiAgICAgICAgICAgIHJldHVybiBkaWN0aW9uYXJ5O1xuICAgICAgICB9XG4gICAgfVxufTtcblxuLyoqXG4gKiBkZWZpbmVzIFRyYW5zbGF0aW9uIERpY3Rpb25hcnkgdG8gdXNlXG4gKiBAcGFyYW0gY29udGV4dCBwcm92aWRlcyBhY2Nlc3MgdG8gMyB2YWxpZGF0aW9uIEpTT05zIGZyb20gZW4uanNvbjpcbiAqIHZhbGlkYXRpb25fbWVzc2FnZXMsIHZhbGlkYXRpb25fZmFsbGJhY2tfbWVzc2FnZXMgYW5kIGRlZmF1bHRfbWVzc2FnZXNcbiAqIEByZXR1cm5zIHtPYmplY3R9XG4gKi9cbmV4cG9ydCBjb25zdCBjcmVhdGVUcmFuc2xhdGlvbkRpY3Rpb25hcnkgPSAoY29udGV4dCkgPT4ge1xuICAgIGNvbnN0IHsgdmFsaWRhdGlvbkRpY3Rpb25hcnlKU09OLCB2YWxpZGF0aW9uRmFsbGJhY2tEaWN0aW9uYXJ5SlNPTiwgdmFsaWRhdGlvbkRlZmF1bHREaWN0aW9uYXJ5SlNPTiB9ID0gY29udGV4dDtcbiAgICBjb25zdCBhY3RpdmVEaWN0aW9uYXJ5ID0gY2hvb3NlQWN0aXZlRGljdGlvbmFyeSh2YWxpZGF0aW9uRGljdGlvbmFyeUpTT04sIHZhbGlkYXRpb25GYWxsYmFja0RpY3Rpb25hcnlKU09OLCB2YWxpZGF0aW9uRGVmYXVsdERpY3Rpb25hcnlKU09OKTtcbiAgICBjb25zdCBsb2NhbGl6YXRpb25zID0gT2JqZWN0LnZhbHVlcyhhY3RpdmVEaWN0aW9uYXJ5W1RSQU5TTEFUSU9OU10pO1xuICAgIGNvbnN0IHRyYW5zbGF0aW9uS2V5cyA9IE9iamVjdC5rZXlzKGFjdGl2ZURpY3Rpb25hcnlbVFJBTlNMQVRJT05TXSkubWFwKGtleSA9PiBrZXkuc3BsaXQoJy4nKS5wb3AoKSk7XG5cbiAgICByZXR1cm4gdHJhbnNsYXRpb25LZXlzLnJlZHVjZSgoYWNjLCBrZXksIGkpID0+IHtcbiAgICAgICAgYWNjW2tleV0gPSBsb2NhbGl6YXRpb25zW2ldO1xuICAgICAgICByZXR1cm4gYWNjO1xuICAgIH0sIHt9KTtcbn07XG4iXSwic291cmNlUm9vdCI6IiJ9