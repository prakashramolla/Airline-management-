(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[2],{

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

/***/ }),

/***/ "./assets/js/theme/gift-certificate.js":
/*!*********************************************!*\
  !*** ./assets/js/theme/gift-certificate.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return GiftCertificate; });
/* harmony import */ var _page_manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./page-manager */ "./assets/js/theme/page-manager.js");
/* harmony import */ var _common_nod__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./common/nod */ "./assets/js/theme/common/nod.js");
/* harmony import */ var _common_gift_certificate_validator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./common/gift-certificate-validator */ "./assets/js/theme/common/gift-certificate-validator.js");
/* harmony import */ var _common_models_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./common/models/forms */ "./assets/js/theme/common/models/forms.js");
/* harmony import */ var _common_utils_translations_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./common/utils/translations-utils */ "./assets/js/theme/common/utils/translations-utils.js");
/* harmony import */ var _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./common/utils/form-utils */ "./assets/js/theme/common/utils/form-utils.js");
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var _global_modal__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./global/modal */ "./assets/js/theme/global/modal.js");
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }










var GiftCertificate = /*#__PURE__*/function (_PageManager) {
  _inheritsLoose(GiftCertificate, _PageManager);

  function GiftCertificate(context) {
    var _this;

    _this = _PageManager.call(this, context) || this;
    _this.validationDictionary = Object(_common_utils_translations_utils__WEBPACK_IMPORTED_MODULE_4__["createTranslationDictionary"])(context);
    var $certBalanceForm = $('#gift-certificate-balance');
    var purchaseModel = {
      recipientName: function recipientName(val) {
        return val.length;
      },
      recipientEmail: function recipientEmail() {
        return _common_models_forms__WEBPACK_IMPORTED_MODULE_3__["default"].email.apply(_common_models_forms__WEBPACK_IMPORTED_MODULE_3__["default"], arguments);
      },
      senderName: function senderName(val) {
        return val.length;
      },
      senderEmail: function senderEmail() {
        return _common_models_forms__WEBPACK_IMPORTED_MODULE_3__["default"].email.apply(_common_models_forms__WEBPACK_IMPORTED_MODULE_3__["default"], arguments);
      },
      customAmount: function customAmount(value, min, max) {
        return value && value >= min && value <= max;
      },
      setAmount: function setAmount(value, options) {
        var found = false;
        options.forEach(function (option) {
          if (option === value) {
            found = true;
            return false;
          }
        });
        return found;
      }
    };
    var $purchaseForm = $('#gift-certificate-form');
    var $customAmounts = $purchaseForm.find('input[name="certificate_amount"]');
    var purchaseValidator = Object(_common_nod__WEBPACK_IMPORTED_MODULE_1__["default"])({
      submit: '#gift-certificate-form input[type="submit"]',
      delay: 300,
      tap: _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_5__["announceInputErrorMessage"]
    });

    if ($customAmounts.length) {
      var $element = $purchaseForm.find('input[name="certificate_amount"]');
      var min = $element.data('min');
      var minFormatted = $element.data('minFormatted');
      var max = $element.data('max');
      var maxFormatted = $element.data('maxFormatted');

      var insertFormattedAmountsIntoErrorMessage = function insertFormattedAmountsIntoErrorMessage(message) {
        for (var _len = arguments.length, amountRange = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          amountRange[_key - 1] = arguments[_key];
        }

        var amountPlaceholders = ['[MIN]', '[MAX]'];
        var updatedErrorText = message;
        amountPlaceholders.forEach(function (placeholder, i) {
          updatedErrorText = updatedErrorText.includes(placeholder) ? updatedErrorText.replace(placeholder, amountRange[i]) : updatedErrorText;
        });
        return updatedErrorText;
      };

      purchaseValidator.add({
        selector: '#gift-certificate-form input[name="certificate_amount"]',
        validate: function validate(cb, val) {
          var numberVal = Number(val);

          if (!numberVal) {
            cb(false);
          }

          cb(numberVal >= min && numberVal <= max);
        },
        errorMessage: insertFormattedAmountsIntoErrorMessage(_this.validationDictionary.certificate_amount_range, minFormatted, maxFormatted)
      });
    }

    purchaseValidator.add([{
      selector: '#gift-certificate-form input[name="to_name"]',
      validate: function validate(cb, val) {
        var result = purchaseModel.recipientName(val);
        cb(result);
      },
      errorMessage: _this.context.toName
    }, {
      selector: '#gift-certificate-form input[name="to_email"]',
      validate: function validate(cb, val) {
        var result = purchaseModel.recipientEmail(val);
        cb(result);
      },
      errorMessage: _this.context.toEmail
    }, {
      selector: '#gift-certificate-form input[name="from_name"]',
      validate: function validate(cb, val) {
        var result = purchaseModel.senderName(val);
        cb(result);
      },
      errorMessage: _this.context.fromName
    }, {
      selector: '#gift-certificate-form input[name="from_email"]',
      validate: function validate(cb, val) {
        var result = purchaseModel.senderEmail(val);
        cb(result);
      },
      errorMessage: _this.context.fromEmail
    }, {
      selector: '#gift-certificate-form input[name="certificate_theme"]:first-of-type',
      triggeredBy: '#gift-certificate-form input[name="certificate_theme"]',
      validate: function validate(cb) {
        var val = $purchaseForm.find('input[name="certificate_theme"]:checked').val();
        cb(typeof val === 'string');
      },
      errorMessage: _this.context.certTheme
    }, {
      selector: '#gift-certificate-form input[name="agree"]',
      validate: function validate(cb) {
        var val = $purchaseForm.find('input[name="agree"]').get(0).checked;
        cb(val);
      },
      errorMessage: _this.context.agreeToTerms
    }, {
      selector: '#gift-certificate-form input[name="agree2"]',
      validate: function validate(cb) {
        var val = $purchaseForm.find('input[name="agree2"]').get(0).checked;
        cb(val);
      },
      errorMessage: _this.context.agreeToTerms
    }]);

    if ($certBalanceForm.length) {
      var balanceVal = _this.checkCertBalanceValidator($certBalanceForm);

      $certBalanceForm.on('submit', function () {
        balanceVal.performCheck();

        if (!balanceVal.areAll('valid')) {
          return false;
        }
      });
    }

    $purchaseForm.on('submit', function (event) {
      purchaseValidator.performCheck();

      if (!purchaseValidator.areAll('valid')) {
        return event.preventDefault();
      }
    });
    $('#gift-certificate-preview').click(function (event) {
      event.preventDefault();
      purchaseValidator.performCheck();

      if (!purchaseValidator.areAll('valid')) {
        return;
      }

      var modal = Object(_global_modal__WEBPACK_IMPORTED_MODULE_7__["defaultModal"])();
      var previewUrl = $(event.currentTarget).data('previewUrl') + "&" + $purchaseForm.serialize();
      modal.open();
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_6__["api"].getPage(previewUrl, {}, function (err, content) {
        if (err) {
          return modal.updateContent(_this.context.previewError);
        }

        modal.updateContent(content, {
          wrap: true
        });
      });
    });
    return _this;
  }

  var _proto = GiftCertificate.prototype;

  _proto.checkCertBalanceValidator = function checkCertBalanceValidator($balanceForm) {
    var balanceValidator = Object(_common_nod__WEBPACK_IMPORTED_MODULE_1__["default"])({
      submit: $balanceForm.find('input[type="submit"]'),
      tap: _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_5__["announceInputErrorMessage"]
    });
    balanceValidator.add({
      selector: $balanceForm.find('input[name="giftcertificatecode"]'),
      validate: function validate(cb, val) {
        cb(Object(_common_gift_certificate_validator__WEBPACK_IMPORTED_MODULE_2__["default"])(val));
      },
      errorMessage: this.validationDictionary.invalid_gift_certificate
    });
    return balanceValidator;
  };

  return GiftCertificate;
}(_page_manager__WEBPACK_IMPORTED_MODULE_0__["default"]);


/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvY29tbW9uL2dpZnQtY2VydGlmaWNhdGUtdmFsaWRhdG9yLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy90aGVtZS9jb21tb24vdXRpbHMvdHJhbnNsYXRpb25zLXV0aWxzLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy90aGVtZS9naWZ0LWNlcnRpZmljYXRlLmpzIl0sIm5hbWVzIjpbImNlcnQiLCJsZW5ndGgiLCJUUkFOU0xBVElPTlMiLCJpc1RyYW5zbGF0aW9uRGljdGlvbmFyeU5vdEVtcHR5IiwiZGljdGlvbmFyeSIsIk9iamVjdCIsImtleXMiLCJjaG9vc2VBY3RpdmVEaWN0aW9uYXJ5IiwiaSIsIkpTT04iLCJwYXJzZSIsImNyZWF0ZVRyYW5zbGF0aW9uRGljdGlvbmFyeSIsImNvbnRleHQiLCJ2YWxpZGF0aW9uRGljdGlvbmFyeUpTT04iLCJ2YWxpZGF0aW9uRmFsbGJhY2tEaWN0aW9uYXJ5SlNPTiIsInZhbGlkYXRpb25EZWZhdWx0RGljdGlvbmFyeUpTT04iLCJhY3RpdmVEaWN0aW9uYXJ5IiwibG9jYWxpemF0aW9ucyIsInZhbHVlcyIsInRyYW5zbGF0aW9uS2V5cyIsIm1hcCIsImtleSIsInNwbGl0IiwicG9wIiwicmVkdWNlIiwiYWNjIiwiR2lmdENlcnRpZmljYXRlIiwidmFsaWRhdGlvbkRpY3Rpb25hcnkiLCIkY2VydEJhbGFuY2VGb3JtIiwiJCIsInB1cmNoYXNlTW9kZWwiLCJyZWNpcGllbnROYW1lIiwidmFsIiwicmVjaXBpZW50RW1haWwiLCJmb3JtTW9kZWwiLCJlbWFpbCIsInNlbmRlck5hbWUiLCJzZW5kZXJFbWFpbCIsImN1c3RvbUFtb3VudCIsInZhbHVlIiwibWluIiwibWF4Iiwic2V0QW1vdW50Iiwib3B0aW9ucyIsImZvdW5kIiwiZm9yRWFjaCIsIm9wdGlvbiIsIiRwdXJjaGFzZUZvcm0iLCIkY3VzdG9tQW1vdW50cyIsImZpbmQiLCJwdXJjaGFzZVZhbGlkYXRvciIsIm5vZCIsInN1Ym1pdCIsImRlbGF5IiwidGFwIiwiYW5ub3VuY2VJbnB1dEVycm9yTWVzc2FnZSIsIiRlbGVtZW50IiwiZGF0YSIsIm1pbkZvcm1hdHRlZCIsIm1heEZvcm1hdHRlZCIsImluc2VydEZvcm1hdHRlZEFtb3VudHNJbnRvRXJyb3JNZXNzYWdlIiwibWVzc2FnZSIsImFtb3VudFJhbmdlIiwiYW1vdW50UGxhY2Vob2xkZXJzIiwidXBkYXRlZEVycm9yVGV4dCIsInBsYWNlaG9sZGVyIiwiaW5jbHVkZXMiLCJyZXBsYWNlIiwiYWRkIiwic2VsZWN0b3IiLCJ2YWxpZGF0ZSIsImNiIiwibnVtYmVyVmFsIiwiTnVtYmVyIiwiZXJyb3JNZXNzYWdlIiwiY2VydGlmaWNhdGVfYW1vdW50X3JhbmdlIiwicmVzdWx0IiwidG9OYW1lIiwidG9FbWFpbCIsImZyb21OYW1lIiwiZnJvbUVtYWlsIiwidHJpZ2dlcmVkQnkiLCJjZXJ0VGhlbWUiLCJnZXQiLCJjaGVja2VkIiwiYWdyZWVUb1Rlcm1zIiwiYmFsYW5jZVZhbCIsImNoZWNrQ2VydEJhbGFuY2VWYWxpZGF0b3IiLCJvbiIsInBlcmZvcm1DaGVjayIsImFyZUFsbCIsImV2ZW50IiwicHJldmVudERlZmF1bHQiLCJjbGljayIsIm1vZGFsIiwiZGVmYXVsdE1vZGFsIiwicHJldmlld1VybCIsImN1cnJlbnRUYXJnZXQiLCJzZXJpYWxpemUiLCJvcGVuIiwiYXBpIiwiZ2V0UGFnZSIsImVyciIsImNvbnRlbnQiLCJ1cGRhdGVDb250ZW50IiwicHJldmlld0Vycm9yIiwid3JhcCIsIiRiYWxhbmNlRm9ybSIsImJhbGFuY2VWYWxpZGF0b3IiLCJjaGVja0lzR2lmdENlcnRWYWxpZCIsImludmFsaWRfZ2lmdF9jZXJ0aWZpY2F0ZSIsIlBhZ2VNYW5hZ2VyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7QUFBZSx5RUFBVUEsSUFBVixFQUFnQjtFQUMzQixJQUFJLE9BQU9BLElBQVAsS0FBZ0IsUUFBaEIsSUFBNEJBLElBQUksQ0FBQ0Ms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WUFBMUIsRUFBd0M7SUFDcEMsSUFBTUMsZ0JBQWdCLEdBQUd6RCwyREFBRyxDQUFDO01BQ3pCQyxNQUFNLEVBQUV1RCxZQUFZLENBQUMxRCxJQUFiLENBQWtCLHNCQUFsQixDQURpQjtNQUV6QkssR0FBRyxFQUFFQyxrRkFBeUJBO0lBRkwsQ0FBRCxDQUE1QjtJQUtBcUQsZ0JBQWdCLENBQUN4QyxHQUFqQixDQUFxQjtNQUNqQkMsUUFBUSxFQUFFc0MsWUFBWSxDQUFDMUQsSUFBYixDQUFrQixtQ0FBbEIsQ0FETztNQUVqQnFCLFFBRmlCLG9CQUVSQyxFQUZRLEVBRUp2QyxHQUZJLEVBRUM7UUFDZHVDLEVBQUUsQ0FBQ3NDLGtGQUFvQixDQUFDN0UsR0FBRCxDQUFyQixDQUFGO01BQ0gsQ0FKZ0I7TUFLakIwQyxZQUFZLEVBQUUsS0FBSy9DLG9CQUFMLENBQTBCbUY7SUFMdkIsQ0FBckI7SUFRQSxPQUFPRixnQkFBUDtFQUNILEM7OztFQTNNd0NHLHFEIiwiZmlsZSI6InRoZW1lLWJ1bmRsZS5jaHVuay4yLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKGNlcnQpIHtcbiAgICBpZiAodHlwZW9mIGNlcnQgIT09ICdzdHJpbmcnIHx8IGNlcnQubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvLyBBZGQgYW55IGN1c3RvbSBnaWZ0IGNlcnRpZmljYXRlIHZhbGlkYXRpb24gbG9naWMgaGVyZVxuICAgIHJldHVybiB0cnVlO1xufVxuIiwiY29uc3QgVFJBTlNMQVRJT05TID0gJ3RyYW5zbGF0aW9ucyc7XG5jb25zdCBpc1RyYW5zbGF0aW9uRGljdGlvbmFyeU5vdEVtcHR5ID0gKGRpY3Rpb25hcnkpID0+ICEhT2JqZWN0LmtleXMoZGljdGlvbmFyeVtUUkFOU0xBVElPTlNdKS5sZW5ndGg7XG5jb25zdCBjaG9vc2VBY3RpdmVEaWN0aW9uYXJ5ID0gKC4uLmRpY3Rpb25hcnlKc29uTGlzdCkgPT4ge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGljdGlvbmFyeUpzb25MaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGRpY3Rpb25hcnkgPSBKU09OLnBhcnNlKGRpY3Rpb25hcnlKc29uTGlzdFtpXSk7XG4gICAgICAgIGlmIChpc1RyYW5zbGF0aW9uRGljdGlvbmFyeU5vdEVtcHR5KGRpY3Rpb25hcnkpKSB7XG4gICAgICAgICAgICByZXR1cm4gZGljdGlvbmFyeTtcbiAgICAgICAgfVxuICAgIH1cbn07XG5cbi8qKlxuICogZGVmaW5lcyBUcmFuc2xhdGlvbiBEaWN0aW9uYXJ5IHRvIHVzZVxuICogQHBhcmFtIGNvbnRleHQgcHJvdmlkZXMgYWNjZXNzIHRvIDMgdmFsaWRhdGlvbiBKU09OcyBmcm9tIGVuLmpzb246XG4gKiB2YWxpZGF0aW9uX21lc3NhZ2VzLCB2YWxpZGF0aW9uX2ZhbGxiYWNrX21lc3NhZ2VzIGFuZCBkZWZhdWx0X21lc3NhZ2VzXG4gKiBAcmV0dXJucyB7T2JqZWN0fVxuICovXG5leHBvcnQgY29uc3QgY3JlYXRlVHJhbnNsYXRpb25EaWN0aW9uYXJ5ID0gKGNvbnRleHQpID0+IHtcbiAgICBjb25zdCB7IHZhbGlkYXRpb25EaWN0aW9uYXJ5SlNPTiwgdmFsaWRhdGlvbkZhbGxiYWNrRGljdGlvbmFyeUpTT04sIHZhbGlkYXRpb25EZWZhdWx0RGljdGlvbmFyeUpTT04gfSA9IGNvbnRleHQ7XG4gICAgY29uc3QgYWN0aXZlRGljdGlvbmFyeSA9IGNob29zZUFjdGl2ZURpY3Rpb25hcnkodmFsaWRhdGlvbkRpY3Rpb25hcnlKU09OLCB2YWxpZGF0aW9uRmFsbGJhY2tEaWN0aW9uYXJ5SlNPTiwgdmFsaWRhdGlvbkRlZmF1bHREaWN0aW9uYXJ5SlNPTik7XG4gICAgY29uc3QgbG9jYWxpemF0aW9ucyA9IE9iamVjdC52YWx1ZXMoYWN0aXZlRGljdGlvbmFyeVtUUkFOU0xBVElPTlNdKTtcbiAgICBjb25zdCB0cmFuc2xhdGlvbktleXMgPSBPYmplY3Qua2V5cyhhY3RpdmVEaWN0aW9uYXJ5W1RSQU5TTEFUSU9OU10pLm1hcChrZXkgPT4ga2V5LnNwbGl0KCcuJykucG9wKCkpO1xuXG4gICAgcmV0dXJuIHRyYW5zbGF0aW9uS2V5cy5yZWR1Y2UoKGFjYywga2V5LCBpKSA9PiB7XG4gICAgICAgIGFjY1trZXldID0gbG9jYWxpemF0aW9uc1tpXTtcbiAgICAgICAgcmV0dXJuIGFjYztcbiAgICB9LCB7fSk7XG59O1xuIiwiaW1wb3J0IFBhZ2VNYW5hZ2VyIGZyb20gJy4vcGFnZS1tYW5hZ2VyJztcbmltcG9ydCBub2QgZnJvbSAnLi9jb21tb24vbm9kJztcbmltcG9ydCBjaGVja0lzR2lmdENlcnRWYWxpZCBmcm9tICcuL2NvbW1vbi9naWZ0LWNlcnRpZmljYXRlLXZhbGlkYXRvcic7XG5pbXBvcnQgZm9ybU1vZGVsIGZyb20gJy4vY29tbW9uL21vZGVscy9mb3Jtcyc7XG5pbXBvcnQgeyBjcmVhdGVUcmFuc2xhdGlvbkRpY3Rpb25hcnkgfSBmcm9tICcuL2NvbW1vbi91dGlscy90cmFuc2xhdGlvbnMtdXRpbHMnO1xuaW1wb3J0IHsgYW5ub3VuY2VJbnB1dEVycm9yTWVzc2FnZSB9IGZyb20gJy4vY29tbW9uL3V0aWxzL2Zvcm0tdXRpbHMnO1xuaW1wb3J0IHsgYXBpIH0gZnJvbSAnQGJpZ2NvbW1lcmNlL3N0ZW5jaWwtdXRpbHMnO1xuaW1wb3J0IHsgZGVmYXVsdE1vZGFsIH0gZnJvbSAnLi9nbG9iYWwvbW9kYWwnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHaWZ0Q2VydGlmaWNhdGUgZXh0ZW5kcyBQYWdlTWFuYWdlciB7XG4gICAgY29uc3RydWN0b3IoY29udGV4dCkge1xuICAgICAgICBzdXBlcihjb250ZXh0KTtcbiAgICAgICAgdGhpcy52YWxpZGF0aW9uRGljdGlvbmFyeSA9IGNyZWF0ZVRyYW5zbGF0aW9uRGljdGlvbmFyeShjb250ZXh0KTtcblxuICAgICAgICBjb25zdCAkY2VydEJhbGFuY2VGb3JtID0gJCgnI2dpZnQtY2VydGlmaWNhdGUtYmFsYW5jZScpO1xuXG4gICAgICAgIGNvbnN0IHB1cmNoYXNlTW9kZWwgPSB7XG4gICAgICAgICAgICByZWNpcGllbnROYW1lKHZhbCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB2YWwubGVuZ3RoO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHJlY2lwaWVudEVtYWlsKC4uLmFyZ3MpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZm9ybU1vZGVsLmVtYWlsKC4uLmFyZ3MpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNlbmRlck5hbWUodmFsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbC5sZW5ndGg7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2VuZGVyRW1haWwoLi4uYXJncykge1xuICAgICAgICAgICAgICAgIHJldHVybiBmb3JtTW9kZWwuZW1haWwoLi4uYXJncyk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY3VzdG9tQW1vdW50KHZhbHVlLCBtaW4sIG1heCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZSAmJiB2YWx1ZSA+PSBtaW4gJiYgdmFsdWUgPD0gbWF4O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldEFtb3VudCh2YWx1ZSwgb3B0aW9ucykge1xuICAgICAgICAgICAgICAgIGxldCBmb3VuZCA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgb3B0aW9ucy5mb3JFYWNoKChvcHRpb24pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wdGlvbiA9PT0gdmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvdW5kID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZvdW5kO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCAkcHVyY2hhc2VGb3JtID0gJCgnI2dpZnQtY2VydGlmaWNhdGUtZm9ybScpO1xuICAgICAgICBjb25zdCAkY3VzdG9tQW1vdW50cyA9ICRwdXJjaGFzZUZvcm0uZmluZCgnaW5wdXRbbmFtZT1cImNlcnRpZmljYXRlX2Ftb3VudFwiXScpO1xuICAgICAgICBjb25zdCBwdXJjaGFzZVZhbGlkYXRvciA9IG5vZCh7XG4gICAgICAgICAgICBzdWJtaXQ6ICcjZ2lmdC1jZXJ0aWZpY2F0ZS1mb3JtIGlucHV0W3R5cGU9XCJzdWJtaXRcIl0nLFxuICAgICAgICAgICAgZGVsYXk6IDMwMCxcbiAgICAgICAgICAgIHRhcDogYW5ub3VuY2VJbnB1dEVycm9yTWVzc2FnZSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKCRjdXN0b21BbW91bnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgY29uc3QgJGVsZW1lbnQgPSAkcHVyY2hhc2VGb3JtLmZpbmQoJ2lucHV0W25hbWU9XCJjZXJ0aWZpY2F0ZV9hbW91bnRcIl0nKTtcbiAgICAgICAgICAgIGNvbnN0IG1pbiA9ICRlbGVtZW50LmRhdGEoJ21pbicpO1xuICAgICAgICAgICAgY29uc3QgbWluRm9ybWF0dGVkID0gJGVsZW1lbnQuZGF0YSgnbWluRm9ybWF0dGVkJyk7XG4gICAgICAgICAgICBjb25zdCBtYXggPSAkZWxlbWVudC5kYXRhKCdtYXgnKTtcbiAgICAgICAgICAgIGNvbnN0IG1heEZvcm1hdHRlZCA9ICRlbGVtZW50LmRhdGEoJ21heEZvcm1hdHRlZCcpO1xuICAgICAgICAgICAgY29uc3QgaW5zZXJ0Rm9ybWF0dGVkQW1vdW50c0ludG9FcnJvck1lc3NhZ2UgPSAobWVzc2FnZSwgLi4uYW1vdW50UmFuZ2UpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBhbW91bnRQbGFjZWhvbGRlcnMgPSBbJ1tNSU5dJywgJ1tNQVhdJ107XG4gICAgICAgICAgICAgICAgbGV0IHVwZGF0ZWRFcnJvclRleHQgPSBtZXNzYWdlO1xuICAgICAgICAgICAgICAgIGFtb3VudFBsYWNlaG9sZGVycy5mb3JFYWNoKChwbGFjZWhvbGRlciwgaSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB1cGRhdGVkRXJyb3JUZXh0ID0gdXBkYXRlZEVycm9yVGV4dC5pbmNsdWRlcyhwbGFjZWhvbGRlcikgP1xuICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlZEVycm9yVGV4dC5yZXBsYWNlKHBsYWNlaG9sZGVyLCBhbW91bnRSYW5nZVtpXSkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlZEVycm9yVGV4dDtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdXBkYXRlZEVycm9yVGV4dDtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHB1cmNoYXNlVmFsaWRhdG9yLmFkZCh7XG4gICAgICAgICAgICAgICAgc2VsZWN0b3I6ICcjZ2lmdC1jZXJ0aWZpY2F0ZS1mb3JtIGlucHV0W25hbWU9XCJjZXJ0aWZpY2F0ZV9hbW91bnRcIl0nLFxuICAgICAgICAgICAgICAgIHZhbGlkYXRlOiAoY2IsIHZhbCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBudW1iZXJWYWwgPSBOdW1iZXIodmFsKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoIW51bWJlclZhbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2IoZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgY2IobnVtYmVyVmFsID49IG1pbiAmJiBudW1iZXJWYWwgPD0gbWF4KTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZTogaW5zZXJ0Rm9ybWF0dGVkQW1vdW50c0ludG9FcnJvck1lc3NhZ2UodGhpcy52YWxpZGF0aW9uRGljdGlvbmFyeS5jZXJ0aWZpY2F0ZV9hbW91bnRfcmFuZ2UsIG1pbkZvcm1hdHRlZCwgbWF4Rm9ybWF0dGVkKSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVyY2hhc2VWYWxpZGF0b3IuYWRkKFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzZWxlY3RvcjogJyNnaWZ0LWNlcnRpZmljYXRlLWZvcm0gaW5wdXRbbmFtZT1cInRvX25hbWVcIl0nLFxuICAgICAgICAgICAgICAgIHZhbGlkYXRlOiAoY2IsIHZhbCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSBwdXJjaGFzZU1vZGVsLnJlY2lwaWVudE5hbWUodmFsKTtcblxuICAgICAgICAgICAgICAgICAgICBjYihyZXN1bHQpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiB0aGlzLmNvbnRleHQudG9OYW1lLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzZWxlY3RvcjogJyNnaWZ0LWNlcnRpZmljYXRlLWZvcm0gaW5wdXRbbmFtZT1cInRvX2VtYWlsXCJdJyxcbiAgICAgICAgICAgICAgICB2YWxpZGF0ZTogKGNiLCB2YWwpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gcHVyY2hhc2VNb2RlbC5yZWNpcGllbnRFbWFpbCh2YWwpO1xuXG4gICAgICAgICAgICAgICAgICAgIGNiKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2U6IHRoaXMuY29udGV4dC50b0VtYWlsLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzZWxlY3RvcjogJyNnaWZ0LWNlcnRpZmljYXRlLWZvcm0gaW5wdXRbbmFtZT1cImZyb21fbmFtZVwiXScsXG4gICAgICAgICAgICAgICAgdmFsaWRhdGU6IChjYiwgdmFsKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IHB1cmNoYXNlTW9kZWwuc2VuZGVyTmFtZSh2YWwpO1xuXG4gICAgICAgICAgICAgICAgICAgIGNiKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2U6IHRoaXMuY29udGV4dC5mcm9tTmFtZSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc2VsZWN0b3I6ICcjZ2lmdC1jZXJ0aWZpY2F0ZS1mb3JtIGlucHV0W25hbWU9XCJmcm9tX2VtYWlsXCJdJyxcbiAgICAgICAgICAgICAgICB2YWxpZGF0ZTogKGNiLCB2YWwpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gcHVyY2hhc2VNb2RlbC5zZW5kZXJFbWFpbCh2YWwpO1xuXG4gICAgICAgICAgICAgICAgICAgIGNiKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2U6IHRoaXMuY29udGV4dC5mcm9tRW1haWwsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHNlbGVjdG9yOiAnI2dpZnQtY2VydGlmaWNhdGUtZm9ybSBpbnB1dFtuYW1lPVwiY2VydGlmaWNhdGVfdGhlbWVcIl06Zmlyc3Qtb2YtdHlwZScsXG4gICAgICAgICAgICAgICAgdHJpZ2dlcmVkQnk6ICcjZ2lmdC1jZXJ0aWZpY2F0ZS1mb3JtIGlucHV0W25hbWU9XCJjZXJ0aWZpY2F0ZV90aGVtZVwiXScsXG4gICAgICAgICAgICAgICAgdmFsaWRhdGU6IChjYikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB2YWwgPSAkcHVyY2hhc2VGb3JtLmZpbmQoJ2lucHV0W25hbWU9XCJjZXJ0aWZpY2F0ZV90aGVtZVwiXTpjaGVja2VkJykudmFsKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgY2IodHlwZW9mICh2YWwpID09PSAnc3RyaW5nJyk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2U6IHRoaXMuY29udGV4dC5jZXJ0VGhlbWUsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHNlbGVjdG9yOiAnI2dpZnQtY2VydGlmaWNhdGUtZm9ybSBpbnB1dFtuYW1lPVwiYWdyZWVcIl0nLFxuICAgICAgICAgICAgICAgIHZhbGlkYXRlOiAoY2IpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdmFsID0gJHB1cmNoYXNlRm9ybS5maW5kKCdpbnB1dFtuYW1lPVwiYWdyZWVcIl0nKS5nZXQoMCkuY2hlY2tlZDtcblxuICAgICAgICAgICAgICAgICAgICBjYih2YWwpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiB0aGlzLmNvbnRleHQuYWdyZWVUb1Rlcm1zLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzZWxlY3RvcjogJyNnaWZ0LWNlcnRpZmljYXRlLWZvcm0gaW5wdXRbbmFtZT1cImFncmVlMlwiXScsXG4gICAgICAgICAgICAgICAgdmFsaWRhdGU6IChjYikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB2YWwgPSAkcHVyY2hhc2VGb3JtLmZpbmQoJ2lucHV0W25hbWU9XCJhZ3JlZTJcIl0nKS5nZXQoMCkuY2hlY2tlZDtcblxuICAgICAgICAgICAgICAgICAgICBjYih2YWwpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiB0aGlzLmNvbnRleHQuYWdyZWVUb1Rlcm1zLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgXSk7XG5cbiAgICAgICAgaWYgKCRjZXJ0QmFsYW5jZUZvcm0ubGVuZ3RoKSB7XG4gICAgICAgICAgICBjb25zdCBiYWxhbmNlVmFsID0gdGhpcy5jaGVja0NlcnRCYWxhbmNlVmFsaWRhdG9yKCRjZXJ0QmFsYW5jZUZvcm0pO1xuXG4gICAgICAgICAgICAkY2VydEJhbGFuY2VGb3JtLm9uKCdzdWJtaXQnLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgYmFsYW5jZVZhbC5wZXJmb3JtQ2hlY2soKTtcblxuICAgICAgICAgICAgICAgIGlmICghYmFsYW5jZVZhbC5hcmVBbGwoJ3ZhbGlkJykpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgJHB1cmNoYXNlRm9ybS5vbignc3VibWl0JywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgcHVyY2hhc2VWYWxpZGF0b3IucGVyZm9ybUNoZWNrKCk7XG5cbiAgICAgICAgICAgIGlmICghcHVyY2hhc2VWYWxpZGF0b3IuYXJlQWxsKCd2YWxpZCcpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoJyNnaWZ0LWNlcnRpZmljYXRlLXByZXZpZXcnKS5jbGljayhldmVudCA9PiB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICBwdXJjaGFzZVZhbGlkYXRvci5wZXJmb3JtQ2hlY2soKTtcblxuICAgICAgICAgICAgaWYgKCFwdXJjaGFzZVZhbGlkYXRvci5hcmVBbGwoJ3ZhbGlkJykpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IG1vZGFsID0gZGVmYXVsdE1vZGFsKCk7XG4gICAgICAgICAgICBjb25zdCBwcmV2aWV3VXJsID0gYCR7JChldmVudC5jdXJyZW50VGFyZ2V0KS5kYXRhKCdwcmV2aWV3VXJsJyl9JiR7JHB1cmNoYXNlRm9ybS5zZXJpYWxpemUoKX1gO1xuXG4gICAgICAgICAgICBtb2RhbC5vcGVuKCk7XG5cbiAgICAgICAgICAgIGFwaS5nZXRQYWdlKHByZXZpZXdVcmwsIHt9LCAoZXJyLCBjb250ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbW9kYWwudXBkYXRlQ29udGVudCh0aGlzLmNvbnRleHQucHJldmlld0Vycm9yKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBtb2RhbC51cGRhdGVDb250ZW50KGNvbnRlbnQsIHsgd3JhcDogdHJ1ZSB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjaGVja0NlcnRCYWxhbmNlVmFsaWRhdG9yKCRiYWxhbmNlRm9ybSkge1xuICAgICAgICBjb25zdCBiYWxhbmNlVmFsaWRhdG9yID0gbm9kKHtcbiAgICAgICAgICAgIHN1Ym1pdDogJGJhbGFuY2VGb3JtLmZpbmQoJ2lucHV0W3R5cGU9XCJzdWJtaXRcIl0nKSxcbiAgICAgICAgICAgIHRhcDogYW5ub3VuY2VJbnB1dEVycm9yTWVzc2FnZSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgYmFsYW5jZVZhbGlkYXRvci5hZGQoe1xuICAgICAgICAgICAgc2VsZWN0b3I6ICRiYWxhbmNlRm9ybS5maW5kKCdpbnB1dFtuYW1lPVwiZ2lmdGNlcnRpZmljYXRlY29kZVwiXScpLFxuICAgICAgICAgICAgdmFsaWRhdGUoY2IsIHZhbCkge1xuICAgICAgICAgICAgICAgIGNiKGNoZWNrSXNHaWZ0Q2VydFZhbGlkKHZhbCkpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yTWVzc2FnZTogdGhpcy52YWxpZGF0aW9uRGljdGlvbmFyeS5pbnZhbGlkX2dpZnRfY2VydGlmaWNhdGUsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBiYWxhbmNlVmFsaWRhdG9yO1xuICAgIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=