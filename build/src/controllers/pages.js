/**
 * leaves
 *
 * @version v0.9.0
 * @link https://leaves.io
 */
'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

const validator = require('validator'),
      uuid = require('node-uuid'),
      apiServer = require('hex-api-server'),
      dataLayer = require('../data/'),
      validation = require('../utils/validation.js');

const errors = {
    malformedRequest: { status: 400, message: 'malformed_request' },
    targetPageNotAvailable: { status: 404, message: 'target_page_not_available' }
};

class pages {
    getById(pageId) {
        return _asyncToGenerator(function* () {
            if (!validator.isMongoId(pageId)) {
                throw new apiServer.protocolException(errors.malformedRequest);
            }

            const pageRecord = yield dataLayer.repositories.pageRepository.getSingleById(pageId);

            if (pageRecord === null) {
                throw new apiServer.protocolException(errors.targetPageNotAvailable);
            }

            let entryRecords;
            if (pageRecord.bindEntries.type === 'property') {
                entryRecords = yield dataLayer.repositories.entryRepository.getByProperty(pageRecord.bindEntries.property, pageRecord.bindEntries.value);
            } else {
                entryRecords = yield dataLayer.repositories.entryRepository.getByTag(pageRecord.bindEntries.tag);
            }

            return {
                page: pageRecord,
                entries: entryRecords
            };
        })();
    }

    getByName(pageName) {
        return _asyncToGenerator(function* () {
            // if (!validator.isMongoId(pageId)) {
            //     throw new apiServer.protocolException(errors.malformedRequest);
            // }

            const pageRecord = yield dataLayer.repositories.pageRepository.getSingleByName(pageName);

            if (pageRecord === null) {
                throw new apiServer.protocolException(errors.targetPageNotAvailable);
            }

            let entryRecords;
            if (pageRecord.bindEntries.type === 'property') {
                entryRecords = yield dataLayer.repositories.entryRepository.getByProperty(pageRecord.bindEntries.property, pageRecord.bindEntries.value);
            } else {
                entryRecords = yield dataLayer.repositories.entryRepository.getByTag(pageRecord.bindEntries.tag);
            }

            return {
                page: pageRecord,
                entries: entryRecords
            };
        })();
    }

    getAll() {
        return _asyncToGenerator(function* () {
            const pageRecords = yield dataLayer.repositories.pageRepository.getAll();

            return {
                pages: pageRecords
            };
        })();
    }

    search(queryText) {
        return _asyncToGenerator(function* () {
            const pageRecords = yield dataLayer.repositories.pageRepository.search(queryText);

            return {
                pages: pageRecords
            };
        })();
    }
}

module.exports = new pages();