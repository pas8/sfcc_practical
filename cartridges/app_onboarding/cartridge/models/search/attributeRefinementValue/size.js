'use strict'

var BaseAttributeValue = module.superModule;

function SizeRefinementValueWrapper(productSearch, refinementDefinition, refinementValue) {
    BaseAttributeValue.call(this, productSearch, refinementDefinition, refinementValue)
    this.hitCount = refinementValue.hitCount;
}

module.exports = SizeRefinementValueWrapper;