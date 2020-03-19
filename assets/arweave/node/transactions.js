"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const error_1 = require("./lib/error");
const transaction_1 = require("./lib/transaction");
const ArweaveUtils = require("./lib/utils");
class Transactions {
    constructor(api, crypto) {
        this.api = api;
        this.crypto = crypto;
    }
    getTransactionAnchor() {
        return this.api.get(`tx_anchor`).then(response => {
            return response.data;
        });
    }
    getPrice(byteSize, targetAddress) {
        let endpoint = targetAddress
            ? `price/${byteSize}/${targetAddress}`
            : `price/${byteSize}`;
        return this.api
            .get(endpoint, {
            transformResponse: [
                /**
                 * We need to specify a response transformer to override
                 * the default JSON.parse behaviour, as this causes
                 * winston to be converted to a number and we want to
                 * return it as a winston string.
                 * @param data
                 */
                function (data) {
                    return data;
                }
            ]
        })
            .then(response => {
            return response.data;
        });
    }
    get(id) {
        return this.api.get(`tx/${id}`).then(response => {
            if (response.status == 200 && response.data && response.data.id == id) {
                return new transaction_1.default(response.data);
            }
            if (response.status == 202) {
                throw new error_1.default("TX_PENDING" /* TX_PENDING */);
            }
            if (response.status == 404) {
                throw new error_1.default("TX_NOT_FOUND" /* TX_NOT_FOUND */);
            }
            if (response.status == 410) {
                throw new error_1.default("TX_FAILED" /* TX_FAILED */);
            }
            throw new error_1.default("TX_INVALID" /* TX_INVALID */);
        });
    }
    fromRaw(attributes) {
        return new transaction_1.default(attributes);
    }
    async search(tagName, tagValue) {
        return this.api
            .post(`arql`, {
            op: "equals",
            expr1: tagName,
            expr2: tagValue
        })
            .then(response => {
            if (!response.data) {
                return [];
            }
            return response.data;
        });
    }
    getStatus(id) {
        return this.api.get(`tx/${id}/status`).then(response => {
            if (response.status == 200) {
                return {
                    status: 200,
                    confirmed: response.data
                };
            }
            return {
                status: response.status,
                confirmed: null
            };
        });
    }
    getData(id, options) {
        return this.api.get(`tx/${id}/data`).then(response => {
            if (response.status === 200) {
                const data = response.data;
                if (options && options.decode == true) {
                    if (options && options.string) {
                        return ArweaveUtils.b64UrlToString(data);
                    }
                    return ArweaveUtils.b64UrlToBuffer(data);
                }
                return data;
            }
            return null;
        });
    }
    async sign(transaction, jwk) {
        let dataToSign = transaction.getSignatureData();
        let rawSignature = await this.crypto.sign(jwk, dataToSign);
        let id = await this.crypto.hash(rawSignature);
        transaction.setSignature({
            signature: ArweaveUtils.bufferTob64Url(rawSignature),
            id: ArweaveUtils.bufferTob64Url(id)
        });
    }
    async verify(transaction) {
        const signaturePayload = transaction.getSignatureData();
        /**
         * The transaction ID should be a SHA-256 hash of the raw signature bytes, so this needs
         * to be recalculated from the signature and checked against the transaction ID.
         */
        const rawSignature = transaction.get("signature", {
            decode: true,
            string: false
        });
        const expectedId = ArweaveUtils.bufferTob64Url(await this.crypto.hash(rawSignature));
        if (transaction.id !== expectedId) {
            throw new Error(`Invalid transaction signature or ID! The transaction ID doesn't match the expected SHA-256 hash of the signature.`);
        }
        /**
         * Now verify the signature is valid and signed by the owner wallet (owner field = originating wallet public key).
         */
        return this.crypto.verify(transaction.owner, signaturePayload, rawSignature);
    }
    post(transaction) {
        return this.api.post(`tx`, transaction).then(response => {
            return response;
        });
    }
}
exports.default = Transactions;
//# sourceMappingURL=transactions.js.map