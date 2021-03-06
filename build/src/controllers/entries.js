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
    targetEntryNotAvailable: { status: 404, message: 'target_entry_not_available' }
};

class entries {
    getById(entryId) {
        return _asyncToGenerator(function* () {
            if (!validator.isMongoId(entryId)) {
                throw new apiServer.protocolException(errors.malformedRequest);
            }

            const entryRecord = yield dataLayer.repositories.entryRepository.getSingleById(entryId);

            if (entryRecord === null) {
                throw new apiServer.protocolException(errors.targetEntryNotAvailable);
            }

            return {
                entry: entryRecord
            };
        })();
    }

    getByProperty(property, value) {
        return _asyncToGenerator(function* () {
            const entryRecords = yield dataLayer.repositories.entryRepository.getByProperty(property, value);

            return {
                entries: entryRecords
            };
        })();
    }

    getByTag(tag) {
        return _asyncToGenerator(function* () {
            const entryRecords = yield dataLayer.repositories.entryRepository.getByTag(tag);

            return {
                entries: entryRecords
            };
        })();
    }

    search(queryText) {
        return _asyncToGenerator(function* () {
            const entryRecords = yield dataLayer.repositories.entryRepository.search(queryText);

            return {
                entries: entryRecords
            };
        })();
    }
}

module.exports = new entries();